import React, { useState } from 'react';

import './global.css'; // Ensure Tailwind and DaisyUI styles are imported

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"about">("about");

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      {/* Navbar */}
      <div className="navbar bg-primary px-6 shadow-lg">
        <div className="flex-1">
          <a
            className="text-white font-extrabold text-4xl drop-shadow-lg select-none"
            href="#"
          >
            AMBCAT Explorer
          </a>
        </div>
        <div className="flex-none gap-2">
          <button
            className="btn btn-sm btn-accent text-xl"
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
          <a
            href="./ambivator/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline btn-ghost text-xl"
          >
            Ambivator
          </a>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto p-6">
        {activeTab === "about" && (
          <>
            <h1 className="text-3xl font-bold mb-4">🧬 AMBCAT Explorer</h1>
            <p className="mb-6 text-lg leading-relaxed">
              <strong>AMBCAT</strong> is an Open Science initiative to digitize and
              explore <strong>3D scans of amber fossils</strong>, providing a window
              into ancient ecosystems through exceptional fossil preservation.
            </p>
            {/* Add more about content here */}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
