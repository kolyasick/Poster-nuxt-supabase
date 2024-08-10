// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  pages: true,
  modules: [
    "@nuxt/icon",
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vite-pwa/nuxt"
  ],
  supabase: {
    redirect: false
  },
  runtimeConfig: {
    public: {
      bucketUrl: process.env.BUCKET_URL
    }
  },
  plugins: [
    '@/plugins/formatDate.ts'
  ],
  devtools: { enabled: false },
  pwa: {
    manifest: {
      name: "Poster by Kolya",
      short_name: "Poster by Kolya",
      description: "This is a Poster",
      theme_color: "#000000",
      icons: [
        {
          src: "poster-logo.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "poster-logo.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/public/poster-logo.png' }
      ]
    }
  }
})
