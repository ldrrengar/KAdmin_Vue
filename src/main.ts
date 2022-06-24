import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/index.scss'
import App from './App.vue'
import Router from './router/router'
import { axiosPlugin } from './utils/axios'
// 图标全部引入
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)

// 将所有的图标都引入进来
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    // app.component(key, component)
// }

app.use(Router)
    .use(ElementPlus)
    .use(axiosPlugin)
    .mount('#app')