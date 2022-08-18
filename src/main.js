import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Axios from './axios/index.js'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style.js'

const app = createApp(App).use(router).use(Varlet)
app.config.globalProperties.$axios = Axios
//finally
app.mount('#app')