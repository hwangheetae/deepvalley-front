import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'DeepValley',
        short_name: 'DeepValley',
        start_url: '/',
        display: 'standalone',
        background_color: '#FFFFFF',
        theme_color: '#00450B',
        icons: [
          {
            src: './src/assets/pwa_icons/maskable_icon_x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: './src/assets/pwa_icons/maskable_icon_x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: './src/assets/pwa_icons/maskable_icon_x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: './src/assets/pwa_icons/maskable_icon_x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: './src/assets/pwa_icons/screenshot.png',
            sizes: '1009x562',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Application',
          },
          {
            src: './src/assets/pwa_icons/screenshot_mobile.png',
            sizes: '430x931',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Application',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
        runtimeCaching: [
          {
            urlPattern: /\/$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|ico)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
            },
          },
          {
            urlPattern: /\/api\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'offline.html',
      },
    }),
  ],
  server: {
    port: 3000,
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
