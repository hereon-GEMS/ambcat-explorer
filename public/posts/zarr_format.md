# Zarr and OME-Zarr
Zarr is a format for the storage of chunked, compressed, N-dimensional arrays. It is designed to be simple, flexible, and scalable, making it suitable for large datasets that do not fit into memory. Zarr supports a variety of compression algorithms and allows for efficient access to subsets of data. It was developed to be compatible with numpy arrays, making it easy to integrate into existing scientific computing workflows.

## Zarr Groups
Zarr supports hierarchical organization of arrays via groups. Groups have a similar API to the Group class from [h5py](https://docs.h5py.org/en/stable/), allowing for nested structures of arrays and metadata. OME-Zarr utilizes this feature to provide pyramidally organized, multi-resolution representations of image data.

## Python Support
Python package [zarr](https://pypi.org/project/zarr/) is the implementation developed and maintained by the core Zarr team. It provides a comprehensive implementation of the Zarr format, including support for both arrays and groups. It offers a simple and intuitive API for creating, reading, and writing Zarr files. The package supports various storage backends, including local file systems, cloud storage (e.g., Amazon S3, Google Cloud Storage), and in-memory storage.

To install it including optional dependencies:

```bash
mamba install -c conda-forge --freeze-installed zarr rich universal_pathlib
```


### OME-Zarr

OME-Zarr is a Zarr format with specific conventions for storing metadata and hierarchical data structures used in biological imaging.

Python package [ome-zarr-py](https://pypi.org/project/ome-zarr/) is the reference implementation of the OME-Zarr specification. It provides tools for reading and writing OME-Zarr files, as well as utilities for working with the hierarchical structure and metadata conventions defined by OME-Zarr.

Interestingly the package itself does not call directly `zarr` package primitives for creating Zarr arrays, but instead depends on `xarray` package and its method `xarray.DataArray.to_zarr()`. This might create issues when dealing with e.g. different implementations of Zarr versions or parsing specific parameters such as compression codecs.


## Inspecting OME-Zarr files using zarr package
OME-Zarr files can be inspected using the `zarr` package. As the arrays are stored in groups, we must use the `zarr.open_group()` instead of `zarr.open_array()`. The `zarr.open_group()` function returns a `zarr.hierarchy.Group` object, which can be used to navigate the hierarchical structure of the OME-Zarr file.

```python
import zarr
# Open the OME-Zarr file
zarr_path = "path/to/your/ome-zarr/file.zarr"
grp = zarr.open_group(zarr_path, mode='r')
# Get basic info
grp.info
# Get grpplete info
grp.info_complete()
# List the contents of the root group ... rich must be installed
print(grp.tree())
```

The `Group.tree()` method on pyramidal OME-Zarr provides information like this:
```bash
/
├── 0 (1729, 2560, 2560) float32
├── 1 (1729, 1280, 1280) float32
├── 2 (1729, 640, 640) float32
├── 3 (1729, 320, 320) float32
└── 4 (1729, 160, 160) float32
```
Here the root group contains 5 arrays (pyramid levels) with their respective shapes and data types. Moreover top level array is named "0" and can be accessed as `grp["0"]`. We can now even use this object to modify underlying data.
```python
import numpy as np
import zarr
# Open the OME-Zarr file
zarr_path = "path/to/your/ome-zarr/file.zarr"
ome = zarr.open_group(zarr_path, mode='r+')
top_level_array = ome["0"]
top_level_array[1000,:,:] = np.zeros((2560,2560), dtype=np.float32)
```
