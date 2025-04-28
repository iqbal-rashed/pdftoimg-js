# 📛 PDFtoIMG-JS Contributing Guide

Hi there! 👋 We're thrilled that you're considering contributing to **PDFtoIMG-JS**.  
Before you start, please read through the following guidelines to help keep the project clean, organized, and welcoming:

- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)

---

## ✅ Pull Request Guidelines

- **Branching:**

  - Always create a feature/fix branch from `main` (example: `feature/add-scale-option`, `fix/pdf-load-issue`).
  - Open pull requests against the `main` branch.

- **If adding a new feature:**

  - Please open an issue first to discuss it, unless it's very small.
  - Provide a clear explanation of what the feature does and why it's needed.

- **If fixing a bug:**

  - Explain the bug in the PR description.
  - Provide a test case or reproducible example if possible (e.g., a file in `/example`).

- **Commits:**

  - It's fine to have multiple small commits; GitHub will allow squashing before merging.
  - Write meaningful commit messages:
    - Use the **imperative mood** (e.g., `Fix broken PDF loading` instead of `Fixed broken PDF loading`).
    - Reference related issues: (`Fixes #42`, `Closes #56`).

- **Code Style:**

  - Use the existing ESLint and Prettier rules.
  - Before submitting, run:
    ```bash
    yarn lint
    yarn format
    ```

- **Testing:**
  - Make sure your changes pass existing tests.
  - If needed, add new tests in the `test/` directory.

---

## 🛠 Development Setup

Ensure you have [Node.js](https://nodejs.org/) (preferably LTS) and [Yarn](https://yarnpkg.com) installed globally.

Clone the repository and install dependencies:

```bash
$ git clone https://github.com/iqbal-rashed/pdftoimg-js.git
$ cd pdfToImg-js
$ yarn install
```

---

### Useful Commands

| Command        | Purpose                                                 |
| :------------- | :------------------------------------------------------ |
| `yarn dev`     | Run development mode with hot-reloading.                |
| `yarn build`   | Build production-ready files into `dist/`.              |
| `yarn lint`    | Lint the source code.                                   |
| `yarn format`  | Format source code with Prettier.                       |
| `yarn test`    | Run unit tests with Jest.                               |
| `yarn example` | Run an example script located in `/example/example.ts`. |

---

## 📁 Project Structure

```
/dist            # Built output
/example         # Example usage and sample PDFs
/src
  /browser       # Browser-specific module
  cli.ts         # CLI entrypoint
  constant.ts    # Constants
  index.ts       # Main library entrypoint
  prompts.ts     # CLI prompts
  types.ts       # Shared TypeScript types
  utils.ts       # Utility functions
  validators.ts  # Validators for CLI options
.gitignore
.prettierrc
eslint.config.mjs
LICENSE
package.json
readme.md
tsconfig.json
tsup.config.ts
yarn.lock
```

---

## 🙌 Thank You!

Thanks again for your interest and efforts to improve **PDFtoIMG-JS**!  
Every contribution, no matter how small, helps make the project better for everyone 🚀

If you have any questions, feel free to open an [issue](https://github.com/iqbal-rashed/pdftoimg-js/issues) or [discussion](https://github.com/pdftoimg-js/discussions).

---

# 📜 License

MIT
