import { createSSRApp } from 'vue'
import { createWebHistory } from 'vue-router'
import createRouter from './router/index'
import App from './App.vue'
import store from './store'
import 'bulma'

const app = createSSRApp(App)
const router = createRouter(createWebHistory())
app.use(router)
app.use(store)

router.isReady().then(() => {
    app.mount('#app')
})