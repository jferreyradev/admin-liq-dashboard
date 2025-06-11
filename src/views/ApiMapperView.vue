<script setup>
import { useFetchWatch } from '../composables/useFetchWatch'
import { useEndPoint } from '../composables/useEndPoint'
import JsonViewer from '../components/JsonViewer.vue'

const { activeEndPoint } = useEndPoint()

const { data, loading, error } = useFetchWatch(activeEndPoint.value?.sp + '/sp/list')

const {_data, _loading, _error} = useFetchWatch(activeEndPoint.value?.base + '/api/view/list')

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
</template>
