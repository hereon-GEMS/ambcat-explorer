#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on 8.10.2025
Convert a series of tiff images to zarr format

@author: Vojtěch Kulvait
"""
import os
import shutil
import argparse
from timeit import default_timer as timer
from pathlib import Path
import numpy as np
import zarr
import h5py

parser = argparse.ArgumentParser()
parser.add_argument('inputZarr', type=str, help="Input OME-Zarr file or directory")
parser.add_argument("outputHdfDir", type=str, help="Output HDF5 directory")
parser.add_argument("--export-level", type=str, nargs='+', default=None,
                    help="Export level(s): specify one or more zarr array groups to export (e.g., 0 1 2). By default, all arrays are exported.")
parser.add_argument("--v5i", action='store_true', help="Use VTK HDF5 Image format")
parser.add_argument("--vti", action='store_true', help="Use VTK Image format")
parser.add_argument("--force", action='store_true', help="Overwrite existing output file")
parser.add_argument("--verbose", action='store_true', help="Verbose output")

#ARG = parser.parse_args([])
ARG = parser.parse_args()


def dir_size(path):
    """Return total size of a directory or file in bytes."""
    p = Path(path)
    if p.is_file():
        return p.stat().st_size
    elif p.is_dir():
        return sum(f.stat().st_size for f in p.rglob('*') if f.is_file())
    else:
        return 0

def format_time(seconds):
    """Return time as H:MM:SS string."""
    m, s = divmod(seconds, 60)
    h, m = divmod(m, 60)
    return f"{int(h):02}:{int(m):02}:{s:05.2f}"

# -------------------------------
# Core functionality
# -------------------------------
def writeVTI(ome, groupLevelID, outputVtiFile, *,
                  force=False, verbose=False):
    import vtk
    from vtk.util import numpy_support
    if os.path.exists(outputVtiFile):
        if force:
            os.remove(outputVtiFile)
        else:
            raise IOError(f"File {outputVtiFile} exists, use --force to overwrite")
    level_array = ome[groupLevelID]
    shape = level_array.shape

    level_array = ome[groupLevelID]  # Zarr array (Z, Y, X)
    z_dim, y_dim, x_dim = level_array.shape
    array_np = level_array[:]  # Load full array into memory as a NumPy ndarray
    # --- Step 3: Convert NumPy array to VTK array ---
    # Flatten to 1D, VTK expects Fortran-style ordering
    vtk_data_array = numpy_support.numpy_to_vtk(array_np.ravel())
    
    # --- Step 4: Create VTK image data object ---
    image_data = vtk.vtkImageData()
    image_data.SetDimensions(x_dim, y_dim, z_dim)
    image_data.SetSpacing(1.0, 1.0, 1.0)  # or your actual spacing
    image_data.SetOrigin(0.0, 0.0, 0.0)

    # Attach scalar data
    image_data.GetPointData().SetScalars(vtk_data_array)
    
    # --- Step 5: Write to .vti file ---
    writer = vtk.vtkXMLImageDataWriter()
    writer.SetFileName(outputVtiFile)
    writer.SetInputData(image_data)
    writer.Write()
    if verbose:
        print(f"Finished writing {outputVtiFile}")


def writeVTK(ome, groupLevelID, outputHdfFile, *,
                  force=False, verbose=False):
    import vtkhdf.image as v5i
    if os.path.exists(outputHdfFile):
        if force:
            shutil.rmtree(outputHdfFile)
        else:
            raise IOError(f"File {outputHdfFile} exists, use --force to overwrite")
    level_array = ome[groupLevelID]
    shape = level_array.shape

    level_array = ome[groupLevelID]  # Zarr array (Z, Y, X)
    z_dim, y_dim, x_dim = level_array.shape
    dimensions = (x_dim, y_dim, z_dim)  # VTK expects (X, Y, Z)
    # Define voxel spacing (adjust as needed)
    spacing = (1.0, 1.0, 1.0)  # (dx, dy, dz)
    origin = v5i.origin_of_centered_image(dimensions, spacing, 2)

    # VTK coordinate axes
    x, y, z = v5i.get_point_axes(dimensions, spacing, origin)

    # Allocate HDF file
    dtype = level_array.dtype
    cache_slice_nbytes = dimensions[0] * dimensions[1] * np.dtype(dtype).itemsize

    with h5py.File(outputHdfFile, "w", rdcc_nbytes=cache_slice_nbytes) as f:
        v5i.initialize(f, v5i.dimensions2extent(dimensions),
                       origin=origin, spacing=spacing)
        dset = v5i.create_point_dataset(f, "data", dtype=dtype)

        if verbose:
            print(f"Writing {z_dim} slices to {outputHdfFile}...")

        for k in range(z_dim):
            # Read slice: (Y, X)
            slice_c = level_array[k, :, :]

            # Transpose to (X, Y) and convert to Fortran order
            slice_f = np.array(slice_c.T, order='F')

            # Write slice at position k
            v5i.write_slice(dset, slice_f, k)

            if verbose and (k % 100 == 0 or k == z_dim - 1):
                print(f"  Slice {k + 1}/{z_dim} written")

    if verbose:
        print(f"Finished writing {outputHdfFile}")

def writeITK(ome, groupLevelID, outputHdfFile, *,
                  force=False, verbose=False):
    import itk
    if os.path.exists(outputHdfFile):
        if force:
            os.remove(outputHdfFile)
        else:
            raise IOError(f"File {outputHdfFile} exists, use --force to overwrite")
    level_array = ome[groupLevelID]
    shape = level_array.shape

    level_array = ome[groupLevelID]  # Zarr array (Z, Y, X)
    z_dim, y_dim, x_dim = level_array.shape
    dimensions = (x_dim, y_dim, z_dim)  # VTK expects (X, Y, Z)
    # Step 3: Convert NumPy array (Z, Y, X) to ITK image
    # itk.image_from_array expects (Z, Y, X) and returns an ITK image of dimension 3
    itk_image = itk.image_from_array(level_array, is_vector=False)
    
    # Step 4: (Optional) Set metadata: spacing, origin, direction
    #itk_image.SetSpacing([1.0, 1.0, 1.0])   # or use actual spacing values if available
    #itk_image.SetOrigin([0.0, 0.0, 0.0])    # origin in physical space
    #itk_image.SetDirection(itk.Matrix.D3([1.0]*9))  # Identity matrix (no rotation/shear)
    
    # Step 5: Write ITK image to HDF5 file
    itk.imwrite(itk_image, outputHdfFile)
    if verbose:
        print(f"Finished writing {outputHdfFile}")

if __name__ == '__main__':
    # Step 1: Open OME-Zarr group
    ome = zarr.open_group(ARG.inputZarr, mode='r')
    allkeys = list(ome.array_keys())
    if ARG.export_level is None:
        export_levels = allkeys
    else:
        # Ensure only valid keys are included
        export_levels = []
        for level in ARG.export_level:
            if level not in allkeys:
                raise ValueError(f"Requested export level '{level}' not found in the OME-Zarr store.")
            export_levels.append(level)

    export_levels = sorted(export_levels, key=lambda k: int(k) if k.isdigit() else k)
    export_levels = reversed(export_levels)  # Export from lowest to highest resolution

    print(f"Found {len(allkeys)} array groups in the OME-Zarr store.")
    for level in export_levels:
        if level not in allkeys:
            raise ValueError(f"Requested export level '{level}' not found in the OME-Zarr store.")
        print(f"Exporting level: {level}")
        os.makedirs(ARG.outputHdfDir, exist_ok=True)
        outputHdfFile = os.path.join(ARG.outputHdfDir, f"{level}.hdf5")
        if ARG.v5i:
            writeVTK(ome, level, outputHdfFile, force=ARG.force, verbose=ARG.verbose)
        elif ARG.vti:
            outputVtiFile = os.path.join(ARG.outputHdfDir, f"{level}.vti")
            writeVTI(ome, level, outputVtiFile, force=ARG.force, verbose=ARG.verbose)
        else:
            writeITK(ome, level, outputHdfFile, force=ARG.force, verbose=ARG.verbose)
    print(f"Output written to: {outputHdfFile}")
