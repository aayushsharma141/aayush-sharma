# Static Site Generation (SSG) & CDN Deployment Guide

This project is now configured for **Static Site Generation (SSG)** suitable for CDN hosting. All pages are prerendered and each route has its own `index.html` file for seamless CDN distribution.

## Overview

The project uses **Vite** for production bundling and a custom postbuild script that:
1. Builds the React app as a static SPA bundle
2. Creates directory structures for each route (e.g., `/about-us`, `/portfolio/serene-master-suite`)
3. Copies the main `index.html` into each route folder so CDNs serve the correct file for each path

## Routes Prerendered

### Static Routes
- `/` (Home)
- `/about-us` (About)
- `/services` (Services)
- `/gallery` (Gallery)
- `/blog` (Blog)
- `/contact-us` (Contact)

### Dynamic Routes (from `src/data/projects.ts`)
- `/portfolio/serene-master-suite`
- `/portfolio/modern-culinary-space`
- `/portfolio/executive-workspace`

## Build & Deployment

### Local Build
```bash
npm install
npm run build
```

This command will:
1. Run `vite build` to produce optimized bundles in `dist/`
2. Run `postbuild` script (`scripts/copy-indexes.js`) to copy `index.html` to each route folder

### Output Structure
```
dist/
├── index.html (root page)
├── assets/ (CSS, JS, images)
├── about-us/
│   └── index.html
├── services/
│   └── index.html
├── gallery/
│   └── index.html
├── blog/
│   └── index.html
├── contact-us/
│   └── index.html
├── portfolio/
│   ├── serene-master-suite/
│   │   └── index.html
│   ├── modern-culinary-space/
│   │   └── index.html
│   └── executive-workspace/
│       └── index.html
└── ... (images, favicon, robots.txt)
```

## CDN Deployment Options

### Option 1: AWS CloudFront + S3
1. Build the project: `npm run build`
2. Upload entire `dist/` folder to S3 bucket
3. Configure CloudFront distribution pointing to S3 origin
4. Set CloudFront to serve `index.html` as default root object
5. Ensure CloudFront error handling redirects 404s to `/index.html` for client-side routing fallback

### Option 2: Vercel / Netlify
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Platform automatically handles routing for SPA with folder-based `index.html` files

### Option 3: Generic CDN (Cloudflare, Bunny, etc.)
1. Build locally: `npm run build`
2. Upload `dist/` contents to your CDN storage
3. Configure:
   - Cache-Control headers for assets (long-term cache)
   - Short/no-cache for `index.html` files
4. Enable caching on CDN edge locations

## Routing & Client-Side Navigation

Since each route folder contains an `index.html`, browsers will load the correct file. React Router (`react-router-dom`) then takes over on page load to handle client-side navigation:
- Direct URL visits → CDN serves the folder's `index.html`
- Internal links → React Router handles navigation without page reload
- All pages load the same JavaScript bundle and render based on the current route

## Adding New Routes

If you add new routes to your application:

1. **Static routes**: Update `scripts/copy-indexes.js` and add to the `routes` array:
   ```javascript
   const routes = [
     '/',
     '/new-route-here', // Add your new route
     // ... other routes
   ];
   ```

2. **Dynamic routes** (from a data file): The script already extracts project slugs from `src/data/projects.ts`, so simply adding new projects with `slug` fields will automatically prerender those routes.

3. Rebuild: `npm run build`

## Performance Notes

- **Bundle size**: The current JS bundle is ~720 KB (uncompressed), ~215 KB (gzipped). Consider code-splitting large components for better performance.
- **Cache strategy**: 
  - Assets (CSS, JS, images) → Long cache (1 year with content hash)
  - HTML files → Short cache (5-10 minutes)
- **CDN headers recommended**:
  ```
  dist/assets/* → Cache-Control: public, max-age=31536000, immutable
  dist/**/*.html → Cache-Control: public, max-age=600, must-revalidate
  ```

## Troubleshooting

### Issue: New routes not showing up
- Ensure they're added to the `routes` array in `scripts/copy-indexes.js`
- Rebuild: `npm run build`
- Check that the folder structure exists in `dist/`

### Issue: Internal navigation not working
- Ensure your CDN serves the `index.html` for nested paths (e.g., `/about-us/` → `/about-us/index.html`)
- Verify React Router paths in `src/App.tsx`

### Issue: Asset paths broken
- Verify all assets are in `dist/assets/`
- Check that your CDN configuration serves assets from the correct path
- The `@/` alias in imports should resolve to `dist/assets/` after build

## Files Modified for SSG

- [package.json](package.json) — Added `postbuild` script
- [scripts/copy-indexes.js](scripts/copy-indexes.js) — Custom script to create per-route `index.html` files
- [vite.config.ts](vite.config.ts) — Standard Vite config (no special prerender plugin needed)

## Technologies Used

- **Build tool**: Vite 7.3.0
- **Framework**: React 18.3.1 + TypeScript
- **Routing**: react-router-dom 6.30.1
- **UI**: shadcn-ui + Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **Icons**: Lucide React

---

**Happy deploying!** 🚀
