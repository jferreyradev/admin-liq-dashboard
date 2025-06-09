import { ref } from 'vue'
//import endPoints from '../endPoints.json'

const apiBoletas = ref()
const apiBase = ref()
const apiSp = ref()

const endPoints = {
  desarrollo: {
    titulo: 'Desarrollo',
    boletas: 'https://api-boletas-9jn3t0ca7a3j.deno.dev',
    base: 'https://midliq-api-hdprsd64qb7n.deno.dev',
    sp: 'https://josrferreyr-deno-api-su-79--desarrollo.deno.dev',
  },
  prodConcepcion: {
    titulo: 'Concepción',
    boletas: 'https: //api-boletas.deno.dev',
    base: 'https: //midliq-api.deno.dev',
    sp: 'https: //josrferreyr-deno-api-su-79.deno.dev',
  },
  prodTafiViejo: {
    titulo: 'Tafi Viejo',
    boletas: 'https: //dno-mid-tafiviejo-boletas.deno.dev',
    base: 'https: //dno-mid-tafiviejo.deno.dev',
    sp: 'https: //dno-mid-tafiviejo-boletas.deno.dev',
  },
  publicIp: {
    url: 'https://josrferreyr-apiserverde-79.deno.dev/items',
  },
}

const activeEndPoint = ref()

export function useEndPoints() {
  function setEndPoints(jsonList) {
    endPoints.value = jsonList
  }

  function setActive(ep) {
    activeEndPoint.value = endPoints.value[ep]
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
    endPoints,
  }
}
