import esbuild from 'esbuild';
import { promises as fs } from 'fs';
import path from 'path';

// The directory where files will be served from.
const outdir = 'dist';
const PORT = 8000;

// Shared build options for consistency between build and serve.
const buildOptions = {
  entryPoints: ['index.tsx'],
  bundle: true,
  outfile: path.join(outdir, 'index.js'),
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  },
  external: [
    'react',
    'react-dom',
    'react-dom/client',
    'react-dom/*',
    'react/*',
    '@google/genai'
  ],
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts'
  },
  format: 'esm',
  sourcemap: true,
  logLevel: 'info',
};

async function serve() {
  try {
    // 1. Ensure the output directory exists.
    await fs.mkdir(outdir, { recursive: true });

    // 2. Copy static assets, just like in the build script.
    await fs.copyFile('index.html', path.join(outdir, 'index.html'));

    // 3. Use esbuild's serve API
    await esbuild.serve({
      servedir: outdir,
      port: PORT,
    }, buildOptions);

    console.log(`✅ Server is running at http://localhost:${PORT}`);
    console.log('Watching for changes...');

  } catch (error) {
    console.error('❌ Could not start server:', error);
    process.exit(1);
  }
}

// Execute the serve process.
serve();
