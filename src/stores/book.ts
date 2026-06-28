import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { MOCK_BOOKS, COLLEGES, type Book } from '@/mock/data'

export const useBookStore = defineStore('book', () => {
  const books = ref<Book[]>(MOCK_BOOKS)
  const colleges = ref<string[]>(COLLEGES)
  const selectedColleges = ref<string[]>([])
  const priceRange = ref<[number, number]>([0, 100])

  const filteredBooks = computed(() => {
    return books.value.filter((book) => {
      const collegeMatch =
        selectedColleges.value.length === 0 ||
        selectedColleges.value.includes(book.college)
      const priceMatch =
        book.price >= priceRange.value[0] && book.price <= priceRange.value[1]
      return collegeMatch && priceMatch
    })
  })

  const maxPrice = computed(() => Math.max(...books.value.map((b) => b.price), 100))

  function getBookById(id: number): Book | undefined {
    return books.value.find((b) => b.id === id)
  }

  function toggleCollege(college: string) {
    const index = selectedColleges.value.indexOf(college)
    if (index === -1) {
      selectedColleges.value.push(college)
    } else {
      selectedColleges.value.splice(index, 1)
    }
  }

  function setPriceRange(range: [number, number]) {
    priceRange.value = range
  }

  function clearFilters() {
    selectedColleges.value = []
    priceRange.value = [0, maxPrice.value]
  }

  function getBooksBySeller(sellerId: number): Book[] {
    return books.value.filter((b) => b.sellerId === sellerId)
  }

  return {
    books,
    colleges,
    selectedColleges,
    priceRange,
    filteredBooks,
    maxPrice,
    getBookById,
    toggleCollege,
    setPriceRange,
    clearFilters,
    getBooksBySeller,
  }
})
