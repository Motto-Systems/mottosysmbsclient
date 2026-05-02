import { defineConfig } from 'vite';

// Potential problem libraries (CJS, dynamic requires, heavy bundles)
// We'll exclude them from pre-bundling first; narrow later.
const exclude = [
  'jsprintmanager',
  'pdf-lib',
  'html2canvas',
  'qrcode',
  'jspdf',
  'moment',
  '@microsoft/signalr',
  '@zxing/ngx-scanner'
];

// Optionally force inclusion of very standard ESM libs to ensure they are pre-bundled.
const include = [
  'lodash',
  'rxjs'
];

export default defineConfig({
  optimizeDeps: {
    exclude,
    include,
    force: true, // force rebuild of dep optimizer cache each run until resolved
    esbuildOptions: {
      resolveExtensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
      target: 'es2020'
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  // If SSR usage occurs later, specify noExternal for stubborn CJS libs
  // ssr: { noExternal: ['jsprintmanager'] }
});
