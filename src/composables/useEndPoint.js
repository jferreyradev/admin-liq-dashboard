import { ref, computed } from 'vue'
//import endPoints from '../endPoints.json'

const apiBoletas = ref()
const apiBase = ref()
const apiSp = ref()

const publicIp = ref({url: 'https://josrferreyr-apiserverde-79.deno.dev/items'})

const endPoints = ref({
  desarrollo: {
    titulo: 'Desarrollo',
    boletas: 'https://api-boletas-9jn3t0ca7a3j.deno.dev',
    base: 'https://midliq-api-hdprsd64qb7n.deno.dev',
    sp: 'https://josrferreyr-deno-api-su-79--desarrollo.deno.dev',
  },
  prodConcepcion: {
    titulo: 'Concepción',
    boletas: 'https://api-boletas.deno.dev',
    base: 'https://midliq-api.deno.dev',
    sp: 'https://josrferreyr-deno-api-su-79.deno.dev',
  },
  prodTafiViejo: {
    titulo: 'Tafi Viejo',
    boletas: 'https://dno-mid-tafiviejo-boletas.deno.dev',
    base: 'https://dno-mid-tafiviejo.deno.dev',
    sp: 'https://dno-mid-tafiviejo-boletas.deno.dev',
  },
  prodBurruyacu: {
    titulo: 'Burruyacu',
    boletas: 'https://dno-mid-burruyacu-boletas.deno.dev',
    base: 'https://dno-mid-burruyacu.deno.dev',
    sp: 'https://dno-mid-burruyacu-boletas.deno.dev'
  },
})

const activeEndPoint = ref()

export function useEndPoints() {

  const endPointsKeys = computed(() => Object.keys(endPoints.value))
  const endPointsValues = computed(() => Object.values(endPoints.value))

  function getEndPointByKey(key) {
    return endPoints.value[key]
  }

  function setEndPoints(jsonList) {
    endPoints.value = jsonList
  }

  function setActive(ep) {
    activeEndPoint.value = ep
    if (!activeEndPoint.value) {
      console.warn('No default endpoint found')
      return
    }

    apiBase.value = ep.base
    apiBoletas.value = ep.boletas
    apiSp.value = ep.sp
  }
  return {
    apiBase,
    apiBoletas,
    apiSp,
    setActive,
    setEndPoints,
    activeEndPoint,
    endPointsValues,
    endPointsKeys,
    getEndPointByKey
  }
}
