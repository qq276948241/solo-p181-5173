import { ref, computed, type Ref, type ComputedRef } from 'vue'
import type { Book } from '@/mock/data'

export type SortKey = 'newest' | 'price-asc' | 'price-desc'

export interface UseBookSortReturn {
  sortKey: Ref<SortKey>
  setSort: (key: SortKey) => void
  sortedBooks: ComputedRef<Book[]>
}

function compareBooks(a: Book, b: Book, key: SortKey): number {
  switch (key) {
    case 'price-asc':
      return a.price - b.price || b.id - a.id
    case 'price-desc':
      return b.price - a.price || b.id - a.id
    case 'newest':
    default:
      return b.id - a.id
  }
}

export function useBookSort(source: () => Book[]): UseBookSortReturn {
  const sortKey = ref<SortKey>('newest') as Ref<SortKey>

  function setSort(key: SortKey) {
    sortKey.value = key
  }

  const sortedBooks = computed(() => {
    const list = [...source()]
    list.sort((a, b) => compareBooks(a, b, sortKey.value))
    return list
  })

  return {
    sortKey,
    setSort,
    sortedBooks,
  }
}
