<script setup>
import { ref } from 'vue'
import { useFetchWatch } from '../composables/useFetchWatch.js'

const props = defineProps({
  url: { type: String, required: true }
})

const urlRef = ref(props.url)
const { data, error, loading, reload } = useFetchWatch(() => props.url)

</script>

<template>
  <div>
    <div class="flex items-center gap-2 mb-2">
      <input readonly v-model="urlRef" class="input input-sm input-bordered flex-1" />
    </div>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error" class="text-error">Error: {{ error.message }}</div>
    <pre v-else class="bg-base-200 p-2 rounded text-xs overflow-auto" style="max-height: 40vh;">
{{ JSON.stringify(data, null, 2) }}
    </pre>
  </div>
</template>
