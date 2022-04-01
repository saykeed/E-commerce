export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SHOPIFY',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {href:"https://fonts.googleapis.com/icon?family=Material+Icons", rel:"stylesheet"},
      {href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css", rel:"stylesheet"}
    ]
  },
 
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/global.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyAOVtJqmJK7Rmpl_3ZcElziV8GPGh2u6Ow",
          authDomain: "shopify-6514a.firebaseapp.com",
          projectId: "shopify-6514a",
          storageBucket: "shopify-6514a.appspot.com",
          messagingSenderId: "766752837527",
          appId: "1:766752837527:web:6e7d824efd03cc2b25bed2",
          measurementId: "G-H7VPX1ZB52"
        },
        services: {
          auth: true,
          storage: true 
        },
        lazy: true
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
