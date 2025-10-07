## Node.js and nvm

**Node.js** is a JavaScript runtime environment that enables the execution of JavaScript code **outside of a web browser**, on a local machine or server.

Historically, JavaScript was limited to running within browsers. With the introduction of Node.js, the language was extended to support access to system resources such as the local filesystem, networking interfaces, and command-line utilities.

The installation of Node.js is required for the use of most modern front-end development tools, as these tools are implemented in JavaScript and executed through the Node.js runtime.

### Node Version Manager (nvm)

**nvm** (Node Version Manager) is a command-line utility that allows multiple versions of Node.js to be installed and managed concurrently within the same environment.

Through nvm, different Node.js versions can be selected or switched as needed for compatibility with various projects. This approach avoids global system-wide installations and prevents conflicts between applications that rely on different Node.js versions.

Typical usage includes:

```bash
# Install the latest Long-Term Support (LTS) version
nvm install --lts

# Install a specific Node.js version
nvm install 20

# Switch to a particular version
nvm use 20

#Use lts version
nvm use --lts

# Display currently installed Node.js versions
nvm ls

# Display the current active Node.js version
node -v
```

If the output does not reflect the version expected from nvm, it usually indicates that the system's default Node.js installation is taking precedence. To resolve this, ensure that nvm is properly set up in your shell configuration file (e.g., `.bashrc`, `.zshrc`).

## npm

**npm** (Node Package Manager) is the default package manager for Node.js. It facilitates the installation, management, and sharing of JavaScript packages and libraries. It is installed automatically with Node.js.

## pnpm

**pnpm** is a fast, disk space-efficient package manager for JavaScript and TypeScript projects. It serves as an alternative to npm and Yarn, focusing on performance and efficient dependency management.

To install pnpm, run the following command:

```bash
npm install -g pnpm
```

To run development server

```bash
pnpm dev --host
```

To push to github pages

```bash
pnpm run deploy
```

To pretty-print all files in the current directory and its subdirectories, use the following command:

```bash
pnpm prettier --write .
```

## Vite

**Vite** is a modern build tool and development server that provides a fast and efficient workflow for front-end development. It leverages native ES modules in the browser to enable instant server start and lightning-fast hot module replacement (HMR).
