<script setup>
import { computed, ref, nextTick, watch } from 'vue'
import { useFetchCache } from '../composables/useFetchCache'
import { useEndPoint } from '../composables/useEndPoint'
const { getEndPointByKey, apiBase } = useEndPoint()

const search = ref('')
const searchInput = ref(null)
const preRef = ref(null)
const { data, loading, error, reload } = useFetchCache(
  'json-demo',
  apiBase.value +'/api/view/list'
)

const formattedJson = computed(() => {
  if (!data.value) return ''
  let jsonStr = JSON.stringify(data.value, null, 2)
  if (search.value) {
    // Escapa caracteres especiales para RegExp
    const escaped = search.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(escaped, 'gi')
    // Resalta coincidencias usando <mark>
    jsonStr = jsonStr.replace(regex, match => `<mark>${match}</mark>`)
  }
  return jsonStr
})

// Hace scroll al primer resultado encontrado
watch([formattedJson, search], async () => {
  await nextTick()
  if (preRef.value && search.value) {
    const mark = preRef.value.querySelector('mark')
    if (mark) {
      mark.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
})

// Selecciona el texto solo cuando el usuario presiona Enter
function selectInput() {
  nextTick(() => {
    if (searchInput.value) searchInput.value.select()
  })
}
</script>

<template>
  <div>
    <div class="flex items-center gap-2 mb-2">
      <input
        ref="searchInput"
        v-model="search"
        type="text"
        placeholder="Buscar palabra..."
        class="input input-sm input-bordered"
        @keyup.enter="selectInput"
      />
      <button class="btn btn-sm btn-outline" @click="reload">Recargar</button>
    </div>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error" class="text-red-600">Error: {{ error.message }}</div>
    <pre
      ref="preRef"
      v-else
      class="p-4 rounded overflow-auto text-xs"
      v-html="formattedJson"
      style="max-height: 60vh;"
    ></pre>
  </div>
</template>

<style scoped>
mark {
  background: #ffe066;
  color: #222;
  padding: 0 2px;
  border-radius: 2px;
}
</style>
