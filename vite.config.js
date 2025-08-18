import { defineConfig } from 'vite';

export default defineConfig({
  root: "src",
  build: {
    outDir: './static',  // Output directory
    rollupOptions: {
      input: {
        main: 'src/main.js',        // JavaScript entry file
        style: 'src/style.scss',    // Sass entry file
      },
      output: {
        entryFileNames: 'js/[name].js',   // Output JavaScript file name
        assetFileNames: 'css/[name].[ext]', // Output CSS file name
      },
    },
  },
});