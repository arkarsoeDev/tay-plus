import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'; // Import VitePWA

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically update service worker when new version is available
      injectRegister: 'auto',    // Inject the service worker registration code automatically

      // Configure your manifest file
      manifest: {
        name: 'Fliks', // Your app's full name
        short_name: 'Fliks',        // Short name for home screen
        description: 'A description of my PWA',
        theme_color: '#ffffff',     // Theme color (e.g., for address bar)
        background_color: '#ffffff',// Background color for splash screen
        display: 'standalone',      // Display mode: 'standalone' for app-like experience
        scope: '/',                 // Scope of the PWA (usually root)
        start_url: '/',             // Start URL when launched from home screen
        icons: [
          {
            src: 'iptv-favicon.png', // Path to your PWA icon
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'iptv-favicon.png', // Path to your PWA icon
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'iptv-favicon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable', // For Android adaptive icons
          },
        ],
      },
      // Optional: Configure Workbox (if you need custom caching strategies)
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'], // Files to precache
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.toString().includes('/web/'),
            handler: 'NetworkOnly', // Go directly to the network for these files
          },
          // ... your other runtimeCaching rules if any
        ],
        // runtimeCaching: [
        //   {
        //     urlPattern: ({ url }) => url.origin === 'https://your-api-url.com', // Example for API caching
        //     handler: 'StaleWhileRevalidate',
        //     options: {
        //       cacheName: 'api-cache',
        //       cacheableResponse: {
        //         statuses: [0, 200],
        //       },
        //     },
        //   },
        // ],
      },
      // Optional: Development settings (don't use in production)
      devOptions: {
        enabled: true, // Set to true to enable PWA features in development
        type: 'module',
        navigateFallback: 'index.html',
      },
    }),
  ],
  base: "/",
  build: {
    outDir: "dist",
  },

});
