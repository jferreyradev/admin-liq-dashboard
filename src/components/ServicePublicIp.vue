<script setup>
import BaseTable from './BaseTable.vue'
import LoadingSpinner from './LoadingSpinner.vue'
import { useFetchCache } from '../composables/useFetchCache'
import { ref } from 'vue'
import { DocumentDuplicateIcon } from '@heroicons/vue/24/outline' // <-- Importa el icono

const { data, error, loading, reload, fetch } = useFetchCache(
  'services',
  'https://josrferreyr-apiserverde-79.deno.dev/',
  {},
)

// Estado local para saber cuál IP fue copiada
const copiedValue = ref(null)
function copyToClipboard(cell) {
  navigator.clipboard.writeText(cell)
  copiedValue.value = cell
  setTimeout(() => {
    copiedValue.value = null
  }, 500)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold">Servicios</h2>
      <button class="btn btn-sm btn-outline" @click="reload" :disabled="loading">Actualizar</button>
    </div>
    <LoadingSpinner v-if="loading" />
    <BaseTable
      v-else
      :headers="['Nombre', 'Ip', 'Ultimo cambio']"
      :rows="
        data
          ? data.map((s) => [s.value.name, s.value.ip, new Date(s.value.date).toLocaleString()])
          : []
      "
      :error="error && error.message"
    >
      <template #cell-1="{ cell }">
        <span>{{ cell }}</span>
        <button class="btn btn-xs btn-ghost ml-2" @click="copyToClipboard(cell)">
          <span v-if="copiedValue === cell" class="text-success">Copiado!</span>
          <span v-else>
            <!-- Icono copiar (Heroicons outline) -->
            <DocumentDuplicateIcon class="w-4 h-4" />
          </span>
        </button>
      </template>
    </BaseTable>
  </div>
</template>
