<script setup>
import LoadingSpinner from './LoadingSpinner.vue'
import { useFetchCache } from '../composables/useFetchCache'
import { ref, computed } from 'vue'
import { useEndPoints } from '../composables/useEndPoint'

const ep = ref(null)

const { data, error, loading, reload } = useFetchCache('endpoints', url.value)

const url = ref(null)

const { endPoints } = useEndPoints()

function handleCheck() {
  for (const endpoint of endPoints) {
    if (endpoint.base) {
      url.value = endpoint.base
      console.log('Base URL:', url.value)
    }
    if (endpoint.boletas) {
      //endpoint.boletas = endpoint.boletas
    }
    if (endpoint.spEp) {
      //endpoint.sp = endpoint.sp
    }
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold">Endpoints</h2>
      <button class="btn btn-sm btn-outline" @click="handleCheck" :disabled="loading">
        Revisar
      </button>
    </div>
    <LoadingSpinner v-if="loading" />
    <ul v-else class="space-y-4">
      <li
        v-for="ep in endPoints"
        :key="ep.url"
        class="bg-base-100 rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <div class="font-semibold text-base">{{ ep.titulo }}</div>
          <div class="text-xs text-base-content/60 break-all">Base: {{ ep.base }}</div>
          <div class="text-xs text-base-content/60 break-all">Boletas: {{ ep.boletas }}</div>
          <div class="text-xs text-base-content/60 break-all">SP: {{ ep.sp }}</div>
        </div>
        <div class="mt-2 md:mt-0 flex flex-wrap gap-2">
          <span v-if="ep.baseEp" class="badge badge-outline">Base: {{ ep.baseEp }}</span>
          <span v-if="ep.boletasEp" class="badge badge-outline">Boletas: {{ ep.boletasEp }}</span>
          <span v-if="ep.spEp" class="badge badge-outline">SP: {{ ep.spEp }}</span>
        </div>
      </li>
      <li v-if="!endPoints || endPoints.length === 0" class="text-center text-base-content/60">
        No hay endpoints disponibles.
      </li>
    </ul>
    <div v-if="error" class="text-error mt-4">{{ error.message }}</div>
  </div>
</template>
