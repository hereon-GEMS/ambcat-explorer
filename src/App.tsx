import React, { useState } from "react";
import AppMainTab from "./AppMainTab";
import Collapsible from "./Collapsible";
import PostViewer from "./PostViewer";

import "./global.css"; // Tailwind + DaisyUI styles

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"about">("about");

  return (
    <div className="flex flex-col min-h-screen bg-base-200 text-base-content">
      {/* Navbar with custom burnt-orange background */}
      <div
        className="navbar px-6 shadow-lg w-full"
        style={{ backgroundColor: "#cf6443" }}
      >
        <div className="flex-1">
          <a
            className="flex items-center gap-3 text-white font-bold text-4xl drop-shadow-lg select-none"
            href="#"
          >
            <img
              src="./icon_color.png"
              alt="AMBCAT Logo"
              className="h-10 w-10"
            />
            AMBCAT Explorer
          </a>
        </div>
        <div className="flex gap-2">
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
      <main className="flex-grow container mx-auto p-6">
        <p className="mb-6 text-lg leading-relaxed">
          <strong>AMBCAT</strong> is an Open Science initiative to digitize and
          explore <strong>3D scans of amber fossils</strong>, providing a window
          into ancient ecosystems through exceptional fossil preservation.
        </p>
        {/*        {activeTab === "about" && (
          <>
            <AppMainTab foldable={true} defaultOpen={false} />
          </>
        )}*/}
        <Collapsible title="About" defaultOpen={false}>
          <PostViewer path="/ambcat-explorer/posts/about.md" />
        </Collapsible>
        <Collapsible title="Bioimaging File Formats" defaultOpen={false}>
          <PostViewer path="/ambcat-explorer/posts/file_formats.md" />
        </Collapsible>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">Dev Notes</h1>
          <Collapsible title="Node.js pnpm and Vite" defaultOpen={false}>
            <PostViewer path="/ambcat-explorer/posts/tooling-basics.md" />
          </Collapsible>
        </div>
        <Collapsible title="Viv based viewers" defaultOpen={false}>
            <PostViewer path="/ambcat-explorer/posts/viv_based_viewers.md" />
        </Collapsible>

        <Collapsible title="http-server" defaultOpen={false}>
          <AppMainTab foldable={false} defaultOpen={false} />
        </Collapsible>
      </main>

      {/* Footer */}
      <footer className="footer footer-center p-6 bg-base-300 text-base-content">
        <div>
          <p>
            This project is part of the{" "}
            <strong>AMBCAT Digital Amber Catalogue</strong>.
          </p>
          <p>&copy; {new Date().getFullYear()} Helmholtz-Zentrum Hereon GmbH</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
