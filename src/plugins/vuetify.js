// src/plugins/vuetify.js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

// Import tous les composants et directives de Vuetify
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Icônes Material Design
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
