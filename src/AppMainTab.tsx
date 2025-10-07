// src/components/AppMainTab.tsx
import React, { useState } from "react";

interface AppMainTabProps {
  foldable?: boolean;
  defaultOpen?: boolean;
}

const AppMainTab: React.FC<AppMainTabProps> = ({
  foldable = false,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const shouldShow = !foldable || isOpen;

  return (
    <div>
      {foldable && (
        <button
          className="btn btn-sm btn-outline mb-4 flex items-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "➖ Hide Ambivator Info" : "➕ Show Ambivator Info"}
        </button>
      )}

      {shouldShow && (
        <div className="space-y-6">
          <div>
            <div className="bg-base-100 p-6 rounded-lg shadow-md space-y-4">
              <p>
                The {" "}
                <a
                  href="https://www.npmjs.com/package/http-server"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary"
                >
                  npm package <strong>http-server</strong>
                </a>{" "}
                is a simple, zero-configuration command-line static file server.
              </p>

              <div className="alert alert-info">
                <span className="font-semibold">✅ Installation:</span>
              </div>
              <pre className="bg-base-200 p-4 rounded-md overflow-auto text-sm">
                <code>pnpm install -g http-server</code>
              </pre>

              <div className="alert alert-info">
                <span className="font-semibold">✅ Usage:</span>
              </div>
              <pre className="bg-base-200 p-4 rounded-md overflow-auto text-sm">
                <code>http-server ./path/to/your/files</code>
              </pre>

              <div className="alert alert-success">
                <span className="font-semibold">
                  ✅ Features relevant to scientific viewing:
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Supports HTTP Range requests</strong> — required for
                  partial reads.
                </li>
                <li>
                  Enables streaming large files (e.g. <code>.tiff</code>,{" "}
                  <code>.nii</code>, <code>.mp4</code>).
                </li>
                <li>
                  Used by <code>@hms-dbmi/viv</code> in{" "}
                  <strong>Avivator</strong> / Ambivator for tiled 3D imaging.
                </li>
              </ul>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppMainTab;
