import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'
import { store } from '@/store/index.js'
import axios from 'axios'

const app = createApp(App)
app.config.globalProperties.axios = axios.create();


app.use(router)
app.use(store)
app.mount('#app');
