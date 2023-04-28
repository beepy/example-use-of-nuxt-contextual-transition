// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['nuxt-contextual-transition'],
  vite: {
    server: {
      fs: {
        strict: false
      }
    }
  },
  app: {
    head: {
      link: [
         { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.3/gh-fork-ribbon.min.css' }
       ],
    },
    baseURL: '/example-use-of-nuxt-contextual-transition/'
  }
})
