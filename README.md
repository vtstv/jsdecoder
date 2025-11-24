# JavaScript Code Decoder

A modern React TypeScript application for decoding and encoding JavaScript eval-packed code.

## Features

- **Decode** eval-packed JavaScript code
- Built with **React + TypeScript + Vite**

## Quick Start

### Development

```bash
npm install
npm run dev
```

### Build for Production

```bash
npm run build
```

The compiled static files will be in the `dist/` folder, ready for deployment to any static hosting service.

### Preview Build

```bash
npm run preview
```

## Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages:

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Select "GitHub Actions" as the source

2. **Automatic Deployment**:
   - Push to the `main` branch
   - GitHub Actions will automatically build and deploy to Pages

3. **Manual Deployment** (alternative):
   ```bash
   npm run build
   # Commit and push the dist/ folder to a gh-pages branch
   ```

The built files in `dist/` can also be deployed to:
- Netlify
- Vercel
- Any static file hosting

## Copyright

© 2025 Murr | [GitHub: vtstv](https://github.com/vtstv)
