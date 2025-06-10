<script setup>
import { ref, watch } from 'vue'
import { useEndPoint } from '../composables/useEndPoint'

const props = defineProps({
  modelValue: String
})

const { endPointsKeys, getEndPointByKey, setActive, activeEndPoint } = useEndPoint()
const selected = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  selected.value = val
})

function onChange() {
  setActive(getEndPointByKey(selected.value))
  console.log(`Endpoint changed to: ${activeEndPoint.value.base}`)
  console.log('Selected endpoint:', getEndPointByKey(selected.value))
}
</script>

<template>
  <select
    v-model="selected"
    class="select select-sm select-bordered"
    @change="onChange"
  >
    <option
      v-for="k in endPointsKeys"
      :key="k"
      :value="k"
    >
      {{ getEndPointByKey(k).titulo || k }}
    </option>
  </select>
</template>
