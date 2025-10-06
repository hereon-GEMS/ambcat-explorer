import React, { useState } from 'react';
import AppMainTab from './AppMainTab';

import './global.css'; // Ensure Tailwind and DaisyUI styles are imported

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"about">("about");

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      {/* Navbar */}
      <div className="navbar bg-primary px-6 shadow-lg w-full">
        <div className="flex-1">
          <a
            className="text-white font-bold text-4xl drop-shadow-lg select-none"
            href="#"
          >
            AMBCAT Explorer
          </a>
        </div>
        <div className="flex-none gap-2">
          <button
            className="btn btn-sm text-xl"
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
          
         <a
            href="https://github.com/hereon-GEMS/ambcat-explorer"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm text-xl"
          >
            GitHub
          </a>



          <a
            href="./ambivator/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-primary text-xl"
          >
            Ambivator
          </a>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto p-6">
        {activeTab === "about" && (
          <>
            <p className="mb-6 text-lg leading-relaxed">
              <strong>AMBCAT</strong> is an Open Science initiative to digitize and
              explore <strong>3D scans of amber fossils</strong>, providing a window
              into ancient ecosystems through exceptional fossil preservation.
            </p>
			<AppMainTab />
            {/* Add more about content here */}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
