import { createApp } from 'vue'

// 🛠 Core setup
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// 🎨 UI Framework
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'

// 📚 Composants de documentation
import DocsComponents from '@/components/DocsComponents'
import DocsExample from '@/components/DocsExample'
import DocsIcons from '@/components/DocsIcons'

// 🔧 Init de l'app
const app = createApp(App)

// ⚙️ Plugins
app.use(createPinia())
app.use(router)
app.use(CoreuiVue)
app.provide('icons', icons)

// 🧩 Composants globaux
app.component('CIcon', CIcon)
app.component('DocsComponents', DocsComponents)
app.component('DocsExample', DocsExample)
app.component('DocsIcons', DocsIcons)

// 🚀 Mount
app.mount('#app')
