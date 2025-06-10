<script setup>
import LoadingSpinner from './LoadingSpinner.vue'
import { ref, watch } from 'vue'
import { useEndPoint } from '../composables/useEndPoint'
import { useFetchWatch } from '../composables/useFetchWatch.js'
import { CheckCircleIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'

const urlval = ref()
const { data, error, loading } = useFetchWatch(() => urlval.value)
const { setActive, endPointsKeys, getEndPointByKey } = useEndPoint()

const testing = ref({}) // Estado de prueba por endpoint
const tested = ref({}) // Estado de éxito por endpoint

async function testConn(k) {
  testing.value[k] = true
  tested.value[k] = false
  urlval.value = getEndPointByKey(k).base + '/api/view/configServer'
  setActive(getEndPointByKey(k))
  try {
    // Espera a que loading sea false (cuando useFetchWatch termina)
    await new Promise((resolve) => {
      const stop = watch(loading, (val) => {
        if (!val) {
          stop()
          resolve()
        }
      })
    })
    if (!error.value) {
      tested.value[k] = true
    }
  } finally {
    testing.value[k] = false
    setTimeout(() => {
      tested.value[k] = false
    }, 2000) // Oculta el check después de 2s
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

    <ul class="space-y-4">
      <li
        v-for="k of endPointsKeys"
        :key="k"
        class="bg-base-100 rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <div class="font-semibold text-base">
            {{ getEndPointByKey(k).titulo }}
            <button class="btn btn-xs btn-outline" @click="testConn(k)">
              Probar
              <div v-if="testing[k]" class="loader-icon">
                <ArrowPathIcon class="animate-spin h-5 w-5" />
              </div>
              <div v-if="tested[k]" class="text-success"><CheckCircleIcon class="h-5 w-5" /></div>
            </button>
          </div>

          <div class="text-xs text-base-content/60 break-all">
            Base: {{ getEndPointByKey(k).base }}
          </div>
          <div class="text-xs text-base-content/60 break-all">
            Boletas: {{ getEndPointByKey(k).boletas }}
          </div>
          <div class="text-xs text-base-content/60 break-all">SP: {{ getEndPointByKey(k).sp }}</div>
        </div>
        <div class="mt-2 md:mt-0 flex flex-wrap gap-2">
          <span v-if="getEndPointByKey(k).baseEp" class="badge badge-outline"
            >Base: {{ getEndPointByKey(k).baseEp }}</span
          >
          <span v-if="getEndPointByKey(k).boletasEp" class="badge badge-outline"
            >Boletas: {{ getEndPointByKey(k).boletasEp }}</span
          >
          <span v-if="getEndPointByKey(k).spEp" class="badge badge-outline"
            >SP: {{ getEndPointByKey(k).spEp }}</span
          >
        </div>
      </li>
    </ul>
    <div v-if="error" class="text-error mt-4">{{ error.message }}</div>
    <div v-if="data" class="text-success mt-4">Conexión exitosa a: {{ data }}</div>
  </div>
</template>

<style>
.loader-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
}
</style>
