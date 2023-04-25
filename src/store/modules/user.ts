import { defineStore } from 'pinia'
import { store } from '@/store'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('app-user', () => {
  const accessToken = ref('')

  const getAccessToken = computed(() => accessToken.value)

  function setToken(token: string) {
    accessToken.value = token
  }

  function resetState() {
    setToken('')
  }

  async function login() {
    try {
      setToken('123')
      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return {
    getAccessToken,
    resetState,
    login
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
