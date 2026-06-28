<script setup lang="ts">
import { ref, computed } from 'vue'
import { BookOpen } from 'lucide-vue-next'
import { useBookStore } from '@/stores/book'
import BookCard from '@/components/BookCard.vue'
import FilterSidebar, { type SortKey } from '@/components/FilterSidebar.vue'
import LoginModal from '@/components/LoginModal.vue'

const bookStore = useBookStore()
const showLoginModal = ref(false)
const sortKey = ref<SortKey>('newest')

const filteredBooks = computed(() => bookStore.filteredBooks)

const displayBooks = computed(() => {
  const list = [...filteredBooks.value]
  switch (sortKey.value) {
    case 'price-asc':
      list.sort((a, b) => a.price - b.price || b.id - a.id)
      break
    case 'price-desc':
      list.sort((a, b) => b.price - a.price || b.id - a.id)
      break
    case 'newest':
    default:
      list.sort((a, b) => b.id - a.id)
  }
  return list
})

function onRequireLogin() {
  showLoginModal.value = true
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 rounded-xl bg-forest-500 flex items-center justify-center">
          <BookOpen :size="22" class="text-cream-50" />
        </div>
        <div>
          <h1 class="font-serif text-2xl font-bold text-forest-600">发现好书</h1>
          <p class="text-sm text-forest-300">共找到 <span class="font-semibold text-forest-500">{{ displayBooks.length }}</span> 本在售书籍</p>
        </div>
      </div>
    </div>

    <div class="flex gap-6">
      <div class="hidden lg:block w-64 flex-shrink-0">
        <FilterSidebar v-model:sort="sortKey" />
      </div>

      <div class="flex-1 min-w-0">
        <TransitionGroup name="fade-list" tag="div" class="masonry columns-1 sm:columns-2 xl:columns-3 2xl:columns-4">
          <BookCard
            v-for="book in displayBooks"
            :key="book.id"
            :book="book"
            @require-login="onRequireLogin"
          />
        </TransitionGroup>

        <div
          v-if="displayBooks.length === 0"
          class="flex flex-col items-center justify-center py-20"
        >
          <div class="w-20 h-20 rounded-full bg-cream-100 flex items-center justify-center mb-4">
            <BookOpen :size="36" class="text-forest-300" />
          </div>
          <p class="text-forest-400 font-medium mb-1">暂无符合条件的书籍</p>
          <p class="text-sm text-forest-300">试试调整筛选条件吧</p>
        </div>
      </div>
    </div>

    <LoginModal
      :visible="showLoginModal"
      @close="showLoginModal = false"
    />
  </div>
</template>
