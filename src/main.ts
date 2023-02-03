import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import '@/styles/index.scss'
import App from './App.vue'
import Router from './router/router'
import { axiosPlugin } from './utils/axios'
import { createPinia } from "pinia";
// 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const pinia = createPinia();
const app = createApp(App)
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(Router)
    .use(ElementPlus)
    .use(axiosPlugin)
    .use(pinia)
    .mount('#app')