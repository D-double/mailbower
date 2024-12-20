import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: 'react', // указывает на глобальную переменную React
      'react-dom': 'react-dom' // указывает на глобальную переменную ReactDOM
    }
  },
  build: {
    lib: {
      entry: 'src/main.jsx',
      name: 'MyReactComponents',
      fileName: (format) => `my-react-components.${format}.js`,
      formats: ['umd'], // Используем только UMD для простоты
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
