// src/App.tsx

import './App.css';

function App() {
  return (
    <main className="container">
      <h1>🧬 AMBCAT Explorer</h1>
      <p>
        <strong>AMBCAT</strong> is an Open Science initiative to digitize and explore <strong>3D scans of amber fossils</strong>,
        providing a window into ancient ecosystems through exceptional fossil preservation.
      </p>

      <section>
        <h2>🎯 Project Goals</h2>
        <ul>
          <li>📦 Centralize and archive amber fossil scans</li>
          <li>🔬 Enable global scientific collaboration</li>
          <li>🌍 Promote open access and public education</li>
          <li>🧠 Avoid redundant scanning through shared data</li>
        </ul>
      </section>

      <section>
        <h2>🧪 Scientific Domains</h2>
        <p>Earth sciences, Life sciences, Photon/neutron-based imaging</p>
      </section>

      <section>
        <h2>👥 Project Partners</h2>
        <p>
          DESY, Hereon, LIB, ZFMK, MfN, OUMNH, CSIC, SMF, FSU, LMU — and more.
        </p>
      </section>

      <section>
        <h2>🚧 Challenges</h2>
        <p>
          Fossils are sometimes obscured by opaque amber. Imaging efforts are scattered, causing duplication and wasted resources.
        </p>
      </section>

      <section>
        <h2>🚀 The AMBCAT Platform</h2>
        <ul>
          <li>🗂 Metadata-rich catalogue of fossil scans</li>
          <li>🖼 Access to μCT 3D image data</li>
          <li>🌐 Browser-based visualization tools</li>
        </ul>
      </section>

      <section>
        <h2>🌍 Impact</h2>
        <p>
          AMBCAT enables interdisciplinary fossil research and connects science with public outreach through exhibitions, education, and open data.
        </p>
      </section>

      <footer>
        <hr />
        <p style={{ fontSize: '0.9rem' }}>
          Developed with <a href="https://vitejs.dev" target="_blank">Vite</a> and <a href="https://reactjs.org" target="_blank">React</a>.
        </p>
      </footer>
    </main>
  );
}

export default App;
