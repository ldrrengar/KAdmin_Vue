import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import './style/index.scss'
import App from './App.vue'
import Router from './router/router'
import { axiosPlugin } from './utils/axios'

createApp(App)
    .use(Router)
    .use(ElementPlus)
    .use(axiosPlugin)
    .mount('#app')
