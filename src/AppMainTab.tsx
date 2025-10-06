// src/components/AppMainTab.tsx
import React, { useState } from 'react';

interface AppMainTabProps {
  foldable?: boolean;
  defaultOpen?: boolean;
}

const AppMainTab: React.FC<AppMainTabProps> = ({ foldable = false, defaultOpen = false }) => {
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
      <h2 className="text-2xl font-bold mb-4">Ambivator</h2>
      <p className="mb-4">
        <strong>Ambivator</strong> is forked from <a 
          href="https://github.com/hms-dbmi/viv" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-primary underline"
        >
          Avivator (Viv)
        </a>.
      </p>
<div className="mb-6">
  <iframe
    className="w-full aspect-video rounded-lg shadow-md"
    src="https://www.youtube.com/embed/_GES8BTzyWc"
    title="YouTube video introduction"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>
      <p>
        Visit the original source code on{' '}
        <a 
          href="https://github.com/hms-dbmi/viv" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-primary underline"
        >
          GitHub
        </a> to learn more.
      </p>

    <div className="bg-base-100 p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-primary">What is <code>http-server</code>?</h2>

      <p>
        The <code>http-server</code> shown in the video is likely the{' '}
        <a
          href="https://www.npmjs.com/package/http-server"
          target="_blank"
          rel="noopener noreferrer"
          className="link link-primary"
        >
          npm package <strong>http-server</strong>
        </a> — a simple, zero-configuration command-line static file server.
      </p>

      <div className="alert alert-info">
        <span className="font-semibold">✅ Installation:</span>
      </div>
      <pre className="bg-base-200 p-4 rounded-md overflow-auto text-sm">
        <code>npm install -g http-server</code>
      </pre>

      <div className="alert alert-info">
        <span className="font-semibold">✅ Usage:</span>
      </div>
      <pre className="bg-base-200 p-4 rounded-md overflow-auto text-sm">
        <code>http-server ./path/to/your/files</code>
      </pre>

      <div className="alert alert-success">
        <span className="font-semibold">✅ Features relevant to scientific viewing:</span>
      </div>
      <ul className="list-disc list-inside space-y-1">
        <li><strong>Supports HTTP Range requests</strong> — required for partial reads.</li>
        <li>Enables streaming large files (e.g. <code>.tiff</code>, <code>.nii</code>, <code>.mp4</code>).</li>
        <li>Used by <code>@hms-dbmi/viv</code> in <strong>Avivator</strong> / Ambivator for tiled 3D imaging.</li>
      </ul>

      <div className="alert alert-warning">
        <span className="font-semibold">🧠 TL;DR:</span>
      </div>
      <p>
        If the video shows someone streaming 3D/large data using a local server, they are almost certainly using the{' '}
        <code>http-server</code> npm tool. It's compatible with <code>viv</code> and supports all necessary features.
      </p>
    </div>

    </div>


        </div>
      )}
    </div>
  );
};


export default AppMainTab;

