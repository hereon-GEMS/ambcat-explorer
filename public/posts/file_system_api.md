FastAPI is a high-performance Python framework ideal for exposing structured metadata and files for applications like Amber catalogues or beamline datasets. It works well with both web-based GUIs (React) and programmatic clients.


## Key Capabilities

- **Asynchronous & high-performance**: handles concurrent requests and large files efficiently.
- **Flexible routing**: nested REST endpoints for datasets, samples, stacks, files.
- **File streaming**: supports HTTP Range requests for partial downloads (critical for large files or Zarr chunks).
- **Metadata & validation**: Pydantic models for structured JSON responses.
- **Security & access control**: enforces per-user permissions, hides raw filesystem paths.
- **Extensible**: integrates with Redis, databases, Slurm, S3/MinIO.

## Example API Endpoints

```text
GET /amber/datasets
GET /amber/datasets/{dataset_id}/samples
GET /samples/{sample_id}/stacks
GET /files/{file_id}/download  # supports Range
GET /zarr/{zarr_id}/dir?path=...
GET /zarr/{zarr_id}/file?path=...
```

## Integration with React GUI and NGINX server

- FastAPI serves as the backend API for data access.
- FastAPI can be extended to handle server side processing tasks.
- NGINX serves the React frontend.
- NGINX reverse proxies API requests to FastAPI.
- React GUI consumes FastAPI endpoints for dynamic data display.

System Architecture Diagram:
```text
[React Viewer] ↔ (HTTP fetch) ↔ [FastAPI API] ↔ [Filesystem / Zarr / S3 / Job Queue]
          ↑
       NGINX (static + proxy)
```

## Summary
FastAPI is highly suitable for:
- Controlled filesystem access with user permissions.
- Partial HTTP range requests for large files.
- Interacting with HPC resources, S3 storage, and job queues.
