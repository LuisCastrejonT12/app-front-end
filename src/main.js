import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'


const app = { createApp }.createApp(App)
app.use(VueAxios, axios)

createApp(App).use(store).use(router).mount('#app')
