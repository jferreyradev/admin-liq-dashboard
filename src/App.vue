<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { HomeIcon, InformationCircleIcon, Bars3Icon } from '@heroicons/vue/24/outline'
import LoginForm from './components/LoginForm.vue'
import { useAuthUser } from './composables/useAuthUser'
import { useFetchCache } from './composables/useFetchCache'

const isAuthenticated = ref(false)
const showSidebar = ref(false)
const isDesktop = ref(window.innerWidth >= 1024)
const { user, clearUser } = useAuthUser()
const { clearAll } = useFetchCache()

function handleLogin() {
  isAuthenticated.value = true
}

function logout() {
  isAuthenticated.value = false
  clearUser()
  showSidebar.value = false
  clearAll() // Limpiar caché al cerrar sesión
}

function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}

// Detecta tamaño de pantalla para mostrar/ocultar sidebar
function handleResize() {
  isDesktop.value = window.innerWidth >= 1024
  if (isDesktop.value) showSidebar.value = false
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div v-if="!isAuthenticated" class="flex items-center justify-center min-h-screen">
    <LoginForm @login="handleLogin" />
  </div>
  <div v-else class="min-h-screen flex flex-col">
    <!-- Barra de navegación -->
    <header class="navbar h-16 flex-shrink-0">
      <button class="btn btn-ghost lg:hidden" @click="toggleSidebar" aria-label="Abrir menú">
        <Bars3Icon class="w-6 h-6" />
      </button>
      <div class="flex-1 flex items-center gap-2 px-4">
        <HomeIcon class="w-6 h-6" />
        <span class="font-bold hidden sm:inline">Panel principal</span>
      </div>
      <div class="flex-none px-4">
        <span class="text-sm mr-4 hidden sm:inline">{{ user }}</span>
        <button class="btn btn-sm btn-primary" @click="logout">Salir</button>
      </div>
    </header>
    <div class="flex flex-1 min-h-0">
      <!-- Sidebar -->
      <aside
        class="fixed inset-y-0 left-0 z-30 w-32 bg-base-100 border-r flex flex-col py-4 transform transition-transform duration-200 -translate-x-full lg:translate-x-0 lg:static lg:flex"
        :class="{ 'translate-x-0': showSidebar, '-translate-x-full': !showSidebar && !isDesktop }"
      >
        <nav class="flex flex-col gap-2 px-4">
          <RouterLink class="btn btn-ghost justify-start" to="/" @click="showSidebar = false">
            <HomeIcon class="w-5 h-5 mr-2" />Inicio
          </RouterLink>
          <RouterLink
            class="btn btn-ghost justify-start"
            to="/services"
            @click="showSidebar = false"
          >
            <InformationCircleIcon class="w-5 h-5 mr-2" />Servicios
          </RouterLink>
          <RouterLink class="btn btn-ghost justify-start" to="/about" @click="showSidebar = false">
            <InformationCircleIcon class="w-5 h-5 mr-2" />Acerca
          </RouterLink>
        </nav>
      </aside>
      <!-- Overlay para mobile -->
      <div
        v-if="showSidebar && !isDesktop"
        class="fixed inset-0 bg-opacity-40 z-20 lg:hidden"
        @click="showSidebar = false"
      ></div>
      <!-- Contenido principal -->
      <main class="flex-1 p-8 overflow-auto">
        <div class="prose max-w-none">
          <RouterView />
        </div>
      </main>
    </div>
    <!-- Pie de página -->
    <footer class="footer footer-center p-4 h-14 flex-shrink-0">
      <div>
        <p>© {{ new Date().getFullYear() }} Dashboard Vue + DaisyUI</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* No necesitas media queries personalizados, Tailwind lo hace */
</style>
