import React, { useState } from 'react';
import AppMainTab from './AppMainTab';
import Collapsible from './Collapsible';

import './global.css'; // Tailwind + DaisyUI styles

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"about">("about");

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      {/* Navbar with custom burnt-orange background */}
      <div className="navbar px-6 shadow-lg w-full" style={{ backgroundColor: '#cf6443' }}>
        <div className="flex-1">
          <a
            className="flex items-center gap-3 text-white font-bold text-4xl drop-shadow-lg select-none"
            href="#"
          >
            <img src="./icon_color.png" alt="AMBCAT Logo" className="h-10 w-10" />
            AMBCAT Explorer
          </a>
        </div>
        <div className="flex-none gap-2">
          <button
            className="btn btn-sm text-xl bg-[#aa61bb] text-white border-none hover:opacity-90"
            onClick={() => setActiveTab("about")}
          >
            About
          </button>

          <a
            href="https://github.com/hereon-GEMS/ambcat-explorer"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm text-xl bg-[#7ca84c] text-white border-none hover:opacity-90"
          >
            GitHub
          </a>

          <a
            href="./ambivator/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm text-xl bg-white text-[#cf6443] border border-[#cf6443] hover:bg-[#cf6443] hover:text-white transition"
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
			<AppMainTab foldable={true} defaultOpen={false} />
          </>
        )}
      <Collapsible title="About" defaultOpen={false}>
			<AppMainTab foldable={false} defaultOpen={false} />
      </Collapsible>
      </main>


    </div>
  );
};

export default App;

