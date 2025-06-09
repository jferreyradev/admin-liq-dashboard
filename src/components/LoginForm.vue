<script setup>
import { ref } from 'vue'
import { useAuthUser } from '../composables/useAuthUser'

const emit = defineEmits(['login'])
const username = ref('')
const password = ref('')
const error = ref(false)
const { setUser } = useAuthUser()

function handleLogin() {
  // Demo: usuario: admin, contraseña: admin
  if (username.value === 'admin' && password.value === 'admin') {
    setUser(username.value)
    emit('login', username.value)
    error.value = false
  } else {
    error.value = true
  }
}
</script>

<template>
  <form class="card w-96 shadow-xl" @submit.prevent="handleLogin">
    <div class="card-body items-center text-center">
      <h2 class="card-title">Iniciar sesión</h2>
      <input
        v-model="username"
        type="text"
        placeholder="Usuario"
        class="input input-bordered w-full mt-4"
        autocomplete="username"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
        class="input input-bordered w-full mt-4"
        autocomplete="current-password"
      />
      <button class="btn btn-primary w-full mt-4" type="submit">Entrar</button>
      <div v-if="error" class="text-error mt-2 text-sm">Usuario o contraseña incorrectos</div>
    </div>
  </form>
</template>
