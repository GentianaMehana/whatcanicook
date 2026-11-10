# What Can I Cook?

A React recipe finder that starts with ingredients already in your kitchen. Add or remove pantry items, filter recipes, save favorites, and open a recipe for ingredients and steps.

## Run it

1. Install [Node.js](https://nodejs.org/) if it is not already installed.
2. Open this folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run `npm install` once, then `npm run dev`.
5. Open the local address Vite prints in the terminal (usually `http://localhost:5173`).

## Project map

- `src/main.jsx` starts React and loads the styles.
- `src/App.jsx` contains the recipe data, filtering, pantry, and recipe dialog.
- `src/styles.css` contains the layout, colors, and responsive styles.
- `index.html` is the HTML page Vite loads.

The pantry and saved recipes are stored in this browser's `localStorage`; no account or backend is needed for this version.

## Install on a phone

Deploy the app to an HTTPS address, then open it on your phone. On iPhone, use Safari's **Share → Add to Home Screen**. On Android, use the browser menu and choose **Install app**.

Use **Show me more ideas** to create recipe variations from the ingredients in your kitchen. This version combines a set of cooking styles and pantry ingredients; fully new AI-written recipes would need an AI API connected through a server.
