## ESLint

**ESLint** is a static code analysis tool for identifying and fixing problematic patterns found in JavaScript code. It helps maintain code quality and consistency by enforcing coding standards and best practices.

Install ESLint as a development dependency using pnpm:

```bash
pnpm add -D eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react-x eslint-plugin-react-dom typescript-eslint
```

Then is suggested to extend `eslint.config.js` with the following configuration for TypeScript and React support:

```ts
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import reactX from 'eslint-plugin-react'
import reactDom from 'eslint-plugin-react-dom'


export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // JavaScript (JS) and TypeScript configurations
      js.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked, // Typescript type-checked rules
      tseslint.configs.stylisticTypeChecked, // Typescript stylistic type-checked rules

      // Enable lint rules for React
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      reactDom.configs.recommended,

      // ReactX plugin is causing issues, disable for now
      // reactX.configs['recommended-typescript'],
    
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

## Prettier

Now add scripts to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.ts,.jsx,.tsx",
    "format": "prettier --write ."
  }
}
```

To run ESLint or Prettier, use the following commands:


```bash
pnpm run lint
pnpm run format
```
