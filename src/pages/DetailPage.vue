<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  User,
  GraduationCap,
  Tag,
  BookOpen,
  CheckCircle,
} from 'lucide-vue-next'
import { useBookStore } from '@/stores/book'
import { useCartStore } from '@/stores/cart'
import { useFavoriteStore } from '@/stores/favorite'
import { useUserStore } from '@/stores/user'
import LoginModal from '@/components/LoginModal.vue'

const route = useRoute()
const router = useRouter()
const bookStore = useBookStore()
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const userStore = useUserStore()

const showLoginModal = ref(false)
const addedToCart = ref(false)

const bookId = computed(() => Number(route.params.id))
const book = computed(() => bookStore.getBookById(bookId.value))
const isFav = computed(() => favoriteStore.isFavorite(bookId.value))
const inCart = computed(() => cartStore.isInCart(bookId.value))

function goBack() {
  router.back()
}

function handleFavorite() {
  if (!userStore.isLoggedIn) {
    showLoginModal.value = true
    return
  }
  favoriteStore.toggleFavorite(bookId.value)
}

function handleAddCart() {
  cartStore.addToCart(bookId.value)
  addedToCart.value = true
  setTimeout(() => {
    addedToCart.value = false
  }, 2000)
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <button
      @click="goBack"
      class="flex items-center gap-1.5 text-forest-400 hover:text-forest-500 transition-colors mb-6 group"
    >
      <ArrowLeft :size="18" class="group-hover:-translate-x-0.5 transition-transform" />
      <span class="text-sm font-medium">返回</span>
    </button>

    <div v-if="book" class="bg-white rounded-2xl shadow-sm border border-cream-100 overflow-hidden">
      <div class="grid md:grid-cols-2 gap-0">
        <div class="relative aspect-[4/3] md:aspect-auto bg-cream-100">
          <img
            :src="book.cover"
            :alt="book.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute top-4 left-4 px-3 py-1.5 bg-forest-500 text-white text-sm font-medium rounded-full shadow-sm">
            {{ book.condition }}
          </div>
        </div>

        <div class="p-6 sm:p-8 flex flex-col">
          <div class="mb-4">
            <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-cream-100 text-forest-500 text-xs font-medium rounded-lg mb-3">
              <GraduationCap :size="12" />
              {{ book.college }}
            </span>
            <h1 class="font-serif text-2xl sm:text-3xl font-bold text-forest-600 mb-2 leading-tight">
              {{ book.title }}
            </h1>
            <p class="text-forest-300 flex items-center gap-1.5">
              <User :size="14" />
              {{ book.author }}
            </p>
          </div>

          <div class="flex items-baseline gap-1 mb-6 pb-6 border-b border-cream-100">
            <span class="text-lg text-forest-400">¥</span>
            <span class="text-4xl font-bold text-forest-500">{{ book.price }}</span>
          </div>

          <div class="space-y-3 mb-6">
            <div class="flex items-center gap-2.5">
              <Tag :size="16" class="text-forest-300" />
              <span class="text-sm text-forest-400">成色：</span>
              <span class="text-sm font-medium text-forest-600">{{ book.condition }}</span>
            </div>
            <div class="flex items-center gap-2.5">
              <User :size="16" class="text-forest-300" />
              <span class="text-sm text-forest-400">卖家：</span>
              <span class="text-sm font-medium text-forest-600">{{ book.sellerName }}</span>
            </div>
            <div class="flex items-center gap-2.5">
              <BookOpen :size="16" class="text-forest-300" />
              <span class="text-sm text-forest-400">编号：</span>
              <span class="text-sm font-mono text-forest-500">#{{ String(book.id).padStart(5, '0') }}</span>
            </div>
          </div>

          <div class="mb-6 flex-1">
            <h3 class="text-sm font-semibold text-forest-500 mb-2">书籍描述</h3>
            <p class="text-sm text-forest-400 leading-relaxed">{{ book.description }}</p>
          </div>

          <div class="flex gap-3">
            <button
              @click="handleAddCart"
              :disabled="addedToCart"
              :class="[
                'flex-1 py-3.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2',
                addedToCart
                  ? 'bg-green-500 text-white'
                  : inCart
                    ? 'bg-cream-200 text-forest-500 hover:bg-cream-300'
                    : 'bg-forest-500 text-cream-50 hover:bg-forest-400 shadow-sm hover:shadow',
              ]"
            >
              <CheckCircle v-if="addedToCart" :size="18" />
              <ShoppingCart v-else :size="18" />
              {{ addedToCart ? '已加入购物车' : inCart ? '已在购物车' : '加入购物车' }}
            </button>
            <button
              @click="handleFavorite"
              :class="[
                'w-14 flex-shrink-0 rounded-xl flex items-center justify-center transition-all duration-200 border-2',
                isFav
                  ? 'bg-red-50 border-red-200'
                  : 'bg-cream-50 border-cream-200 hover:bg-cream-100',
              ]"
            >
              <Heart
                :size="22"
                :class="isFav ? 'fill-red-500 stroke-red-500' : 'stroke-forest-500'"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-cream-100"
    >
      <div class="w-20 h-20 rounded-full bg-cream-100 flex items-center justify-center mb-4">
        <BookOpen :size="36" class="text-forest-300" />
      </div>
      <p class="text-forest-400 font-medium mb-1">书籍不存在</p>
      <p class="text-sm text-forest-300 mb-4">可能已被出售或下架</p>
      <button
        @click="router.push('/')"
        class="px-5 py-2 bg-forest-500 text-cream-50 rounded-xl text-sm font-medium hover:bg-forest-400 transition-colors"
      >
        返回首页
      </button>
    </div>

    <LoginModal
      :visible="showLoginModal"
      @close="showLoginModal = false"
    />
  </div>
</template>
