import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { MOCK_USER } from '@/mock/data'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(MOCK_USER)
  const isLoggedIn = ref(true)

  const userId = computed(() => currentUser.value?.id ?? null)
  const nickname = computed(() => currentUser.value?.nickname ?? '')
  const avatar = computed(() => currentUser.value?.avatar ?? '')

  function setLoggedIn(value: boolean) {
    isLoggedIn.value = value
  }

  function logout() {
    isLoggedIn.value = false
  }

  return {
    currentUser,
    isLoggedIn,
    userId,
    nickname,
    avatar,
    setLoggedIn,
    logout,
  }
})
