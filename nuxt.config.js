module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Intentional Evangelistic Connections',
    meta: [
      { hid: 'description', name: 'description', content: 'Share your efforts about how you are intentionally making evangelistic connections.' },
      { name: 'robots', content: 'noindex,nofollow' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    noscript: [
      { innerHTML: 'This website requires JavaScript.' }
    ]
  },
  css: [
    // CSS file in the project
    '@/assets/css/main.css'
  ],
  /*
  ** Use more Vue plugins.
  */
  plugins: [
    '~/plugins/vue-timeago'
  ],
  /*
  ** Add PWA capabilities
  */
  modules: [
    '@nuxtjs/pwa'
  ],
  /*
  ** Add Firebase Authorization to middleware.
  */
  router: {
    middleware: 'auth'
  },
  /*
  ** Mode set to Single Page App when generating static pages.
  */
  mode: 'spa',
  /*
  ** Disable the progress bar
  */
  loading: false,
  /*
  ** Customize app manifest
  */
  manifest: {
    name: 'Intentional Evangelistic Connections',
    theme_color: '#000000'
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'vue-timeago',
      'firebase/app',
      'firebase/auth',
      'firebase/database',
      'bad-words'
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
