<script setup>
import { onBeforeMount } from 'vue'
import { useColorModes } from '@coreui/vue'
import { useThemeStore } from '@/stores/theme.js'
import Toast from '@/components/Toast.vue'
import { VApp } from 'vuetify/components'

const { isColorModeSet, setColorMode } = useColorModes(
  'coreui-free-vue-admin-template-theme',
)
const currentTheme = useThemeStore()

onBeforeMount(() => {
  const urlParams = new URLSearchParams(window.location.href.split('?')[1])
  let theme = urlParams.get('theme')

  if (theme !== null && theme.match(/^[A-Za-z0-9\s]+/)) {
    theme = theme.match(/^[A-Za-z0-9\s]+/)[0]
  }

  if (theme) {
    setColorMode(theme)
    return
  }

  if (isColorModeSet()) {
    return
  }

  setColorMode(currentTheme.theme)
})
</script>

<template>
  <v-app>
    <router-view />
    <toast/>
  </v-app>
</template>

<style lang="scss">
@use 'styles/style';
@use 'styles/examples';
</style>
