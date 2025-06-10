<script setup>
import { useFetchCache } from '../composables/useFetchCache'
import { useEndPoint } from '../composables/useEndPoint'
import JsonViewer from '../components/JsonViewer.vue'

const { activeEndPoint } = useEndPoint()

const { data, loading, error, reload } = useFetchCache('json-demo', activeEndPoint.value?.boletas + '/sp/list')

</script>

<template>
  <div>
    <div class="flex gap-2 mb-2">
      <button class="btn btn-sm btn-outline" @click="reload">Recargar</button>
    </div>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">{{ error.message }}</div>
    <JsonViewer v-else :json="data" />
  </div>
</template>
