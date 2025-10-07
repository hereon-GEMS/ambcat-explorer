# Bioimaging File Formats

Researchers have long been working with a wide variety of data formats, both proprietary and open, to store and share imaging data. Formats like **DICOM**, **TIFF**, and various raw data types, e.g. the [DEN format](https://kulvait.github.io/KCT_doc/den-format.html), have been used, creating fragmentation in the field.

While some open formats were available, the lack of standardized metadata and a uniform structure for multi-dimensional data left bioimaging researchers facing significant challenges. This fragmented ecosystem of proprietary formats and non-interoperable systems made it increasingly difficult to manage the growing volumes of complex imaging data, particularly in **3D** and **4D** spaces.

## HDF5: The Push for Standardization

The **[HDF Group](https://www.hdfgroup.org/)**, originally emerging as a U.S.-based nonprofit organization, developed **HDF5 (Hierarchical Data Format version 5)** to address these challenges. While HDF5 has global reach and is widely used, its governance and early development were U.S.-centric.

**HDF5** was designed to store and organize large amounts of data, making it particularly well-suited for complex datasets like those found in bioimaging. It supports hierarchical data structures, allowing researchers to store multi-dimensional arrays and associated metadata in a single file. As the demand for cloud-based collaboration grew, it became clear that while HDF5 remains a robust solution, its traditional design wasn't fully optimized for cloud environments, where more flexible, scalable data formats are necessary for efficient access to large datasets.

The **HDF Group** continues to maintain and actively develop the format, adapting it to new requirements and use cases in scientific computing.

## The Emergence of Open Microscopy Environment (OME) Initiative

In **2007**, the **[Open Microscopy Environment (OME)](https://www.openmicroscopy.org/)** initiative was founded, primarily driven by the **University of Dundee** in the **UK**, with strong support from the **European Union**. OME’s goal was to create an open and standardized framework for bioimaging data storage and metadata, ensuring that complex imaging datasets could be organized consistently and shared across different platforms.

The **OME Data Model (ODM)** was developed to provide standardized metadata formats and guidelines for how bioimaging data should be stored, enabling better collaboration and data sharing across the global research community. As a result, OME has been a key driver of open science initiatives, particularly in the EU.

### OME-NGFF

In **2019**, OME began developing the **Next-Generation File Formats (NGFF)** specification, aimed at addressing the limitations of existing formats. NGFF was designed to provide a more **flexible, scalable, and cloud-friendly** approach to bioimaging data storage, building on the strengths of HDF5 while introducing features that optimize large dataset access in cloud environments.

For more on the NGFF initiative, see the [seminal paper](https://pubmed.ncbi.nlm.nih.gov/34845388/).

#### OME-TIFF

**OME-TIFF** is a widely used format for storing multi-dimensional image data, based on the **OME-NGFF** specifications. It builds upon the traditional **TIFF** format and adds support for rich metadata associated with biological and medical images. This format is particularly suited for handling image stacks and multi-dimensional data, providing a reliable and standardized way to store complex image sets.

OME-TIFF datasets also support **HTML range requests-based viewing**, enabling users to load only the necessary portions of the data as needed, which is crucial for efficient data exploration and visualization.

For more details, check the [format specification in OME Data Model](https://ome-model.readthedocs.io/en/latest/).

#### OME-Zarr

**OME-Zarr** is a more recent addition to the OME ecosystem, specifically designed for scalable, cloud-friendly storage. It is based on the **Zarr** format, which uses chunked, compressed storage to manage large datasets efficiently. The hierarchical structure of **OME-Zarr** makes it well-suited for handling large, multi-dimensional datasets, such as tomography or microscopy images.

**OME-Zarr** supports efficient, range-based access, allowing specific regions of a dataset (e.g., parts of a 3D image) to be loaded as needed. This is essential for performance in large-scale bioimaging applications, where managing the full dataset in memory is impractical.

**Zarr** itself is a **Python-rooted format** for **N-dimensional arrays**, initially developed as an advanced alternative to NumPy’s **.npy/.npz** formats. It supports **chunking** and **compression** natively, making it ideal for large datasets that don’t fit into memory. The **OME** community adopted **Zarr** due to its scalability and efficiency in handling large bioimaging datasets.

For more details, read the [seminal paper on OME-Zarr](https://pubmed.ncbi.nlm.nih.gov/37428210/).
