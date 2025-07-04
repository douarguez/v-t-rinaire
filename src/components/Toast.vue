<!-- src/components/Toast.vue -->
<template>
  <v-snackbar v-model="toast.show" :timeout="3000" :color="toast.color" top right>
    {{ toast.message }}
    <template #action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="toast.show = false">
        Fermer
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { useToastStore } from '@/stores/useToastStore'
const toast = useToastStore()
</script>
