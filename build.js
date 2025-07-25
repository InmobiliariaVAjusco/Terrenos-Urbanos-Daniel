
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

    // 3. Run esbuild to bundle and transpile TypeScript/React code.
    const result = await esbuild.build({
      entryPoints: ['index.tsx'],
      bundle: true,
      outfile: path.join(outdir, 'index.js'),
      // Define dependencies that are loaded via the importmap in index.html as external.
      // This tells esbuild not to bundle them.
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
      format: 'esm', // Output ES Module format.
      minify: true, // Minify the code for production.
      sourcemap: true, // Generate sourcemaps for easier debugging.
      logLevel: 'info', // Provide build information.
    });
    
    if (result.errors.length > 0) {
        console.error("Build finished with errors.");
        process.exit(1);
    } else {
        console.log('✅ Build successful! Your app is ready in the "dist" folder.');
    }

  } catch (error) {
    console.error('❌ Build failed with an exception:', error);
    process.exit(1);
  }
}

// Execute the build process.
build();
