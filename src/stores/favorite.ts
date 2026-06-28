import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { MOCK_FAVORITE_IDS } from '@/mock/data'

export const useFavoriteStore = defineStore('favorite', () => {
  const favoriteBookIds = ref<number[]>([...MOCK_FAVORITE_IDS])

  const count = computed(() => favoriteBookIds.value.length)

  function isFavorite(bookId: number): boolean {
    return favoriteBookIds.value.includes(bookId)
  }

  function toggleFavorite(bookId: number): boolean {
    const index = favoriteBookIds.value.indexOf(bookId)
    if (index === -1) {
      favoriteBookIds.value.push(bookId)
      return true
    } else {
      favoriteBookIds.value.splice(index, 1)
      return false
    }
  }

  function addFavorite(bookId: number) {
    if (!isFavorite(bookId)) {
      favoriteBookIds.value.push(bookId)
    }
  }

  function removeFavorite(bookId: number) {
    const index = favoriteBookIds.value.indexOf(bookId)
    if (index !== -1) {
      favoriteBookIds.value.splice(index, 1)
    }
  }

  return {
    favoriteBookIds,
    count,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
  }
})
