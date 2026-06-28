<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Heart, ShoppingCart } from 'lucide-vue-next'
import { useFavoriteStore } from '@/stores/favorite'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import type { Book } from '@/mock/data'

const props = defineProps<{
  book: Book
  showFavorite?: boolean
}>()

const emit = defineEmits<{
  (e: 'requireLogin'): void
}>()

const router = useRouter()
const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()
const userStore = useUserStore()

const isFav = computed(() => favoriteStore.isFavorite(props.book.id))
const inCart = computed(() => cartStore.isInCart(props.book.id))

function goDetail() {
  router.push(`/book/${props.book.id}`)
}

function handleFavorite(e: MouseEvent) {
  e.stopPropagation()
  if (!userStore.isLoggedIn) {
    emit('requireLogin')
    return
  }
  favoriteStore.toggleFavorite(props.book.id)
}

function handleAddCart(e: MouseEvent) {
  e.stopPropagation()
  cartStore.addToCart(props.book.id)
}
</script>

<template>
  <div
    @click="goDetail"
    class="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-cream-100 hover:-translate-y-1"
  >
    <div class="relative overflow-hidden aspect-[4/3] bg-cream-100">
      <img
        :src="book.cover"
        :alt="book.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div class="absolute top-2 left-2 px-2.5 py-1 bg-forest-500 text-white text-xs font-medium rounded-full">
        {{ book.condition }}
      </div>
      <div
        v-if="showFavorite !== false"
        @click="handleFavorite"
        class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
      >
        <Heart
          :size="16"
          :class="isFav ? 'fill-red-500 stroke-red-500' : 'stroke-forest-500'"
          class="transition-colors"
        />
      </div>
    </div>

    <div class="p-3.5">
      <h3
        class="font-serif text-base font-semibold text-forest-600 line-clamp-1 mb-1 group-hover:text-forest-500 transition-colors"
      >
        {{ book.title }}
      </h3>
      <p class="text-xs text-forest-300 mb-2 line-clamp-1">{{ book.author }}</p>

      <div class="flex items-center justify-between">
        <div class="flex items-baseline gap-0.5">
          <span class="text-xs text-forest-400">¥</span>
          <span class="text-lg font-bold text-forest-500">{{ book.price }}</span>
        </div>
        <button
          @click="handleAddCart"
          :class="[
            'w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200',
            inCart
              ? 'bg-cream-200 text-forest-500'
              : 'bg-forest-500 text-cream-50 hover:bg-forest-400',
          ]"
        >
          <ShoppingCart :size="16" />
        </button>
      </div>

      <div class="mt-2.5 pt-2.5 border-t border-cream-100 flex items-center justify-between">
        <span class="text-xs text-forest-300 bg-cream-50 px-2 py-0.5 rounded">
          {{ book.college }}
        </span>
        <span class="text-xs text-forest-300">{{ book.sellerName }}</span>
      </div>
    </div>
  </div>
</template>
