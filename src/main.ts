import './shared/assets/main.css'

import { createApp } from 'vue'
import { Quasar } from 'quasar'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

import App from './app/App.vue'

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {}
})

myApp.mount('#app')
