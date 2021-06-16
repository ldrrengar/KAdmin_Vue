import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'
import Router from './router/router'

createApp(App)
    .use(Router)
    .use(ElementPlus)
    .mount('#app')
