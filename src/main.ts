import { createApp } from 'vue'
import VueFeather from 'vue-feather'
import 'vveb3/styles/index.css'
import './setup/wagmi'
import App from './App.vue'

const app = createApp(App)

app.component('Icon', VueFeather)

app.mount('#app')
