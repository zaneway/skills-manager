# Skills Manager - Web UI

A modern web interface for managing agent skills, built to work with the [vercel-labs/skills](https://github.com/vercel-labs/skills) CLI.

## Features

- **List Skills** - View all installed skills with their details
- **Rankings** - Discover popular skills from the community
- **Add Skills** - Install skills from GitHub, npm, or local paths
- **Find Skills** - Search for skills in the registry
- **Check Updates** - Check for available skill updates
- **Update Skills** - Update all skills to latest versions
- **Create Skill** - Create a new SKILL.md template
- **Remove Skills** - Remove installed skills

## Supported Agents

This UI supports managing skills for various coding agents:
- OpenClaw, Claude Code, Codex, Cursor, OpenCode
- Windsurf, Roo Code, Continue, Cline
- And many more...

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Lucide React Icons
- i18next (Internationalization)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Commands

### Development

```bash
# Start development server (default http://localhost:5173)
npm run dev
```

### Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint
```

## Usage

### Running the Application

1. **Development Mode**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 in your browser

2. **Production Build**
   ```bash
   npm run build
   ```
   The output will be in the `dist/` directory

3. **Preview Production Build**
   ```bash
   npm run preview
   ```

### Stopping the Server

- Press `Ctrl + C` (or `Cmd + C` on macOS) in the terminal to stop the development server

### Internationalization

The application supports **English** and **Chinese** languages.

- Click the 🌐 button in the sidebar to switch languages
- Language preference is saved automatically

## Project Structure

```
skills-manager/
├── src/
│   ├── components/     # UI components
│   ├── i18n/          # Internationalization
│   ├── lib/           # Utilities
│   ├── App.tsx        # Main application
│   └── main.tsx       # Entry point
├── public/            # Static assets
├── dist/              # Production build output
└── package.json       # Dependencies
```

## Note

This is a UI demonstration. In production, you would connect this UI to actually execute the `npx skills` commands via a backend service or by exposing the CLI through an API.

For more details about the skills CLI, visit: https://skills.sh/
