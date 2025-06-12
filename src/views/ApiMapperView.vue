<script setup>
import { useFetchWatch } from '../composables/useFetchWatch'
import { useEndPoint } from '../composables/useEndPoint'
import JsonViewer from '../components/JsonViewer.vue'
import QueryViewer from '@/components/QueryViewer.vue'
import { computed, ref, watch } from 'vue'

const { activeEndPoint } = useEndPoint()
const { data, loading, error } = useFetchWatch(()=>activeEndPoint.value?.base + '/api/view/list')

const urlRef = ref('')

console.log('activeEndPoint', activeEndPoint.value?.base + '/api/view/configServer')


watch(
  () => activeEndPoint.value,
  (nuevo) => {
    if (nuevo && nuevo.base) {
      urlRef.value = nuevo.base + '/api/view/configServer'
    }
  },
  { immediate: true }
)

</script>

<template>
  <div>
    <div class="flex gap-2 mb-2">
      <button class="btn btn-sm btn-outline" @click="">Recargar</button>
    </div>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">{{ error.message }}</div>
    <JsonViewer v-else :json="data" />
  </div>
  <div>
    <QueryViewer :url="urlRef" />
  </div>
</template>
