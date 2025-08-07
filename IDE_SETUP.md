# IDE Setup

This project can be developed with any editor, but the repository includes
recommendations for [Visual Studio Code](https://code.visualstudio.com/).

## Extensions
The `.vscode/extensions.json` file recommends useful extensions:

- **Prettier** – code formatter.
- **ESLint** – linting for JavaScript/TypeScript.
- **Intellicode** – AI-assisted code completion.
- **GitLens** – Git history and insights.

VS Code prompts to install these when the workspace is opened.

## Settings
The `.vscode/settings.json` file enables format-on-save and configures ESLint to
look for configurations in both `frontend` and `backend` directories.

## Node version
The project targets Node 18+.  Using a version manager such as
[nvm](https://github.com/nvm-sh/nvm) is recommended:

```bash
nvm install 18
nvm use 18
```

## Formatting and linting
If you install the recommended extensions, files will be formatted automatically
on save.  Lint errors will show in the editor and in the Problems panel.

## Debugging
Both the frontend and backend can be debugged from VS Code:

1. Use **Run and Debug → create a launch.json file**.
2. For the backend, select *Node.js* and set the program to `backend/app.js`.
3. For the frontend, select *Vite* or *npm* and run the `dev` script.

