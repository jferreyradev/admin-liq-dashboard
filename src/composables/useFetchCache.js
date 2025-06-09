import { ref } from 'vue'

const cacheMap = ref(new Map())

export const useFetchCache = (key, url, options) => {
  const clear = () => cacheMap.value.delete(key)
  const clearAll = () => cacheMap.value.clear()
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function myFetch() {
    loading.value = true
    try {
      console.log('cache data', cacheMap.value.get(key))

      if (cacheMap.value.size > 0) {
        data.value = cacheMap.value.get(key)
      } else {
        console.log('fetch to: ', url)
        const resp = await fetch(url, { ...options })
        data.value = await resp.json()
        cacheMap.value.set(key, data.value)
      }
    } catch (err) {
      error.value = err
    } finally {
      console.log(data.value)
      loading.value = false
    }
  }

  async function refresh() {
    try {
      loading.value = true
      clear()
      console.log('fetch to: ', url)
      const resp = await fetch(url, { ...options })
      data.value = await resp.json()
      cacheMap.value.set(key, data.value)
    } catch (err) {
      error.value = err
    } finally {
      console.log(data.value)
      loading.value = false
    }
  }
  myFetch()

  return { data, loading, error, clearAll, clearKey: clear, reload: refresh, fetch: myFetch }
}
