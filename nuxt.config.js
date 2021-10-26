const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/PSI/'
  }
} : {}
export default {
  target: 'static',
  router: {
    base: '/PSI/'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '展虹日記帳',
    htmlAttrs: {
      lang: 'en'
    },
    bodyAttrs: {
      class: 'bg-lighter'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: '展虹有限公司｜日記帳', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' },
      { rel: 'preconnect',href:'https://fonts.googleapis.com'},
      { rel: 'preconnect',href:'https://fonts.gstatic.com'},
      { rel: 'stylesheet',href:'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap'}
    ],
    plugins: [
      //'~/plugins/firebase'
    ],
    script: [
			{ src: "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.1/xlsx.full.min.js" },
			{ src: "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.1/shim.min.js" }
		]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/fireauth.js'
  ],
  services: [
    '~/services/fireinit.js'
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

  },

  vendor: [
    'firebase'
  ]
}
