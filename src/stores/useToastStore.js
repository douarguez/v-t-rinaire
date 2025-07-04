// src/stores/useToastStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const show = ref(false)
  const message = ref('')
  const color = ref('success') // success, error, info, warning, ...

  function showToast(msg, type = 'success', duration = 3000) {
    message.value = msg
    color.value = type
    show.value = true

    setTimeout(() => {
      show.value = false
    }, duration)
  }

  return { show, message, color, showToast }
})
