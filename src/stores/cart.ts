import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface CartItem {
  bookId: number
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const totalCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  )

  const bookIds = computed(() => items.value.map((i) => i.bookId))

  function addToCart(bookId: number) {
    const existing = items.value.find((i) => i.bookId === bookId)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ bookId, quantity: 1 })
    }
  }

  function removeFromCart(bookId: number) {
    const index = items.value.findIndex((i) => i.bookId === bookId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  function isInCart(bookId: number): boolean {
    return items.value.some((i) => i.bookId === bookId)
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    totalCount,
    bookIds,
    addToCart,
    removeFromCart,
    isInCart,
    clearCart,
  }
})
