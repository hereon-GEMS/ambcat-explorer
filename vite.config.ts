import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path'
import os from 'os'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  base: "/ambcat-explorer/",
  plugins: [react()],
    server: {
    https: {
      key: fs.readFileSync(path.resolve(os.homedir(), 'server_keys/server-key.pem')),
      cert: fs.readFileSync(path.resolve(os.homedir(), 'server_keys/server-cert-AMBCAT.pem')),
    },
    host: true,
    port: 5173, // or your preferred port
  },
});
