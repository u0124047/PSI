const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/PSI/'
  }
} : {}
export default {
  target: 'static',
  routerBase,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'PSI',
    htmlAttrs: {
      lang: 'en'
    },
    bodyAttrs: {
      class: 'bg-lighter'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect',href:'https://fonts.googleapis.com'},
      { rel: 'preconnect',href:'https://fonts.gstatic.com'},
      { rel: 'stylesheet',href:'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap'}
    ],
    script: [
			{ src: "https://unpkg.com/xlsx/dist/shim.min.js" },
			{ src: "https://unpkg.com/xlsx/dist/xlsx.full.min.js" }
		]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
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
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
