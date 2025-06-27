<template>
  <div class="d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="card shadow-sm p-4" style="width: 400px;">
      <h4 class="mb-4 text-center">Login</h4>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" class="form-control mb-3" />
        <input v-model="password" type="password" placeholder="Password" class="form-control mb-3" />
        <button class="btn btn-primary w-100">Sign In</button>
        <div v-if="error" class="text-danger mt-2">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

function handleLogin() {
  if (email.value === 'admin@vet.com' && password.value === '123456') {
    localStorage.setItem('token', 'demo-token')
    router.push('/dashboard')
  } else {
    error.value = 'Invalid credentials'
  }
}
</script>