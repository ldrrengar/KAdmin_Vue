import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import '@/styles/index.scss'
import App from './App.vue'
import Router from './router/router'
import { axiosPlugin } from './utils/axios'
import { createPinia } from "pinia";
const pinia = createPinia();
const app = createApp(App)
app.use(Router)
    .use(ElementPlus)
    .use(axiosPlugin)
    .use(pinia)
    .mount('#app')