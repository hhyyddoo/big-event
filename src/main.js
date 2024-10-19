import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import '@/assets/main.scss'

// 修改 locale 的导入路径
import zhCn from 'element-plus/es/locale/lang/zh-cn';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale: zhCn })  // 使用中文语言包
app.mount('#app')
