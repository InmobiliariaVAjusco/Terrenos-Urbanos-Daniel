import esbuild from 'esbuild';
import { promises as fs } from 'fs';
import path from 'path';

// The directory where the final build files will be placed.
const outdir = 'dist';

async function build() {
  try {
    // 1. Clean up and ensure the output directory exists.
    await fs.rm(outdir, { recursive: true, force: true });
    await fs.mkdir(outdir, { recursive: true });

    // 2. Copy static assets (like index.html) to the output directory.
    await fs.copyFile('index.html', path.join(outdir, 'index.html'));
    
    // 3. Run esbuild to bundle the application's TypeScript code.
    await esbuild.build({
      entryPoints: ['index.tsx'],
      bundle: true,
      outfile: path.join(outdir, 'index.js'),
      define: {
        // Injects the API key from environment variables into the build.
        'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
      },
      external: [
        // These packages are loaded via the importmap in index.html,
        // so esbuild should not bundle them.
        'react',
        'react-dom',
        'react-dom/client',
        'react-dom/*',
        'react/*',
        '@google/genai',
      ],
      loader: { '.tsx': 'tsx', '.ts': 'ts' },
      format: 'esm',
      minify: true, // Minify the code for production
      sourcemap: false, // No sourcemaps for production
      logLevel: 'info',
    });

    console.log(`✅ Build successful. Output in ./${outdir}`);

  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Execute the build process.
build();
