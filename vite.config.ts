import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import ViteCompressionPlugin from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()
  ,ViteCompressionPlugin({
    verbose: true,
    disable: false,
    threshold: 10240,
    algorithm: 'gzip',
    ext: '.gz'
  })],
  

})
