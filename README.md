# AMBCAT Explorer

**AMBCAT Explorer** is the visualization component of the AMBCAT project, focused on high-resolution digital scans of amber fossils.

Amber fossils provide a unique window into ancient ecosystems, offering insights into extinct organisms through remarkable preservation of both external and internal structures. Fossilised specimens are preserved 3-dimensionally, allowing detailed studies of surface features like hairs, scales, and flower structures, as well as rare preservation of internal soft tissues.

AMBCAT aims to centralize and make accessible over 1,500 amber fossil scans to foster collaboration among researchers and advance scientific research globally.

## Goals
- Enable interdisciplinary research using fossil data for climate, ecosystem, biodiversity, evolutionary, and phylogenetic studies.
- Promote public engagement by making paleoscience accessible through exhibitions, educational content, and media.
- Strengthen international collaboration to avoid duplicate scanning and optimize fossil sample usage.

## Format Considerations
We recognize the potential of open, scalable formats such as OME-TIFF and OME-Zarr and the whole [OME Data Model](https://ome-model.readthedocs.io/en/stable/index.html) for storing high-resolution tomography data. These formats support efficient compression, chunked access, and hierarchical storage structures, making them well-suited for large volumetric datasets commonly used in fossil imaging.

However, the OME Next-Generation File Formats (NGFF) ecosystem is still evolving, and its organic development has introduced challenges regarding stability, interoperability, and support across different tools and platforms. For more information, see [ome-ngff-tools](https://ome.github.io/ome-ngff-tools/).

As part of the development, different viewers will be tested, and conversion scripts will be provided to support workflows that translate traditional image stacks (e.g. series of TIFF images or proprietary formats such as DEN) into OME-Zarr or similar hierarchical representations. A key focus will be on evaluating the scalability, performance, and usability of these approaches in real research and public outreach scenarios.

We acknowledge the long-term development and impact of Kitware in the field of scientific visualization — particularly through tools like ParaView  and the Visualization Toolkit (VTK). These open-source projects have set foundational standards for interactive and high-performance 3D visualization.

In recent years, Kitware has expanded into web-based visualization through initiatives like trame
, vtk.js
, and related modern tooling, enabling scalable 3D data exploration in browser environments.

As part of the AMBCAT Explorer effort, we aim to evaluate convergence paths between emerging formats such as OME-Zarr and well-established visualization ecosystems like VTK and ParaView. This includes investigating compatibility, performance, and accessibility — with a long-term goal of integrating fossil tomography data into robust, extensible visualization pipelines backed by mature tooling.

## ⚙️ Architecture Overview: React + Vite + TypeScript

The **AMBCAT Explorer** is a modular React application bootstrapped using [Vite](https://vitejs.dev) with **TypeScript** support for strong typing and maintainability.

### 💡 Why this stack?

- **React**: Component-based UI ideal for modular data viewers and tools (e.g., Avivator, VTK.js).
- **Vite**: Fast modern dev server and build tool, using ES modules in development and Rollup for production.
- **TypeScript**: Provides static typing, safer refactoring, and better tooling support.
- **pnpm**: Fast, disk-efficient package manager with strict version control and workspace support.

### 🛠️ Project created with:

```bash
pnpm create vite ambcat-explorer --template react-ts
```
## Development

Start the development server, enabling network access with `--host` to allow access from other devices on the same network:

```bash
pnpm dev --host
```

Build the production-ready static site:

```bash
pnpm build
```

## Acknowledgments and Funding

This project is part of the **AMBCAT Digital Amber Catalogue** (`AMBCAT_Digital_Amber_Catalogue`), funded by the [Oscars project](https://oscars-project.eu/projects/ambcat-digital-amber-catalogue), which is supported by the Horizon Europe program.

The Helmholtz-Zentrum Hereon (HEREON) is the receiving institution responsible for AMBCAT within this funding scheme.

## License
This project is licensed under the [GNU General Public License v3.0 (GPL-3.0)](https://opensource.org/licenses/GPL-3.0).
