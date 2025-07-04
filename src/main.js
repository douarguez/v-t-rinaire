import { createApp } from 'vue'

// Core setup
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// UI Frameworks
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'

import vuetify from './plugins/vuetify'  // Vuetify 3 plugin
import 'vuetify/styles'                  // Styles Vuetify 3
import '@mdi/font/css/materialdesignicons.css'  // MD Icons CSS

// Icons CoreUI (si nécessaire)
import { iconsSet as icons } from '@/assets/icons'

// Docs components (à garder si tu les utilises)
import DocsComponents from '@/components/DocsComponents'
import DocsExample from '@/components/DocsExample'
import DocsIcons from '@/components/DocsIcons'

// Create Vue app
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(CoreuiVue)
app.use(vuetify)  // Vuetify 3

// Provide CoreUI icons globally
app.provide('icons', icons)

// Register global components CoreUI + Docs
app.component('CIcon', CIcon)
app.component('DocsComponents', DocsComponents)
app.component('DocsExample', DocsExample)
app.component('DocsIcons', DocsIcons)

// Mount app
app.mount('#app')
