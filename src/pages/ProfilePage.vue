<script setup lang="ts">
import { ref, computed } from 'vue'
import { BookOpen, Heart, Upload, UserCircle } from 'lucide-vue-next'
import { useBookStore } from '@/stores/book'
import { useFavoriteStore } from '@/stores/favorite'
import { useUserStore } from '@/stores/user'
import BookCard from '@/components/BookCard.vue'
import LoginModal from '@/components/LoginModal.vue'

const bookStore = useBookStore()
const favoriteStore = useFavoriteStore()
const userStore = useUserStore()

const showLoginModal = ref(false)
const activeTab = ref<'published' | 'favorites'>('published')

const myPublishedBooks = computed(() =>
  bookStore.getBooksBySeller(userStore.userId ?? 0),
)

const myFavoriteBooks = computed(() =>
  bookStore.books.filter((b) => favoriteStore.favoriteBookIds.includes(b.id)),
)

const currentBooks = computed(() =>
  activeTab.value === 'published' ? myPublishedBooks.value : myFavoriteBooks.value,
)

const tabs = [
  { key: 'published' as const, label: '我发布的', icon: Upload, count: computed(() => myPublishedBooks.value.length) },
  { key: 'favorites' as const, label: '我收藏的', icon: Heart, count: computed(() => myFavoriteBooks.value.length) },
]

function onRequireLogin() {
  showLoginModal.value = true
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="bg-white rounded-2xl shadow-sm border border-cream-100 p-6 sm:p-8 mb-6">
      <div class="flex items-center gap-4 sm:gap-6">
        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-cream-200 bg-cream-100 flex-shrink-0">
          <img
            v-if="userStore.avatar"
            :src="userStore.avatar"
            :alt="userStore.nickname"
            class="w-full h-full object-cover"
          />
          <UserCircle v-else :size="48" class="w-full h-full text-forest-300 p-2" />
        </div>
        <div class="flex-1 min-w-0">
          <h1 class="font-serif text-xl sm:text-2xl font-bold text-forest-600 mb-1">
            {{ userStore.nickname || '未登录用户' }}
          </h1>
          <p class="text-sm text-forest-300 font-mono mb-2">
            ID: {{ userStore.userId ?? '—' }}
          </p>
          <div class="flex flex-wrap gap-4 text-sm">
            <div class="flex items-center gap-1.5">
              <Upload :size="14" class="text-forest-400" />
              <span class="text-forest-400">发布</span>
              <span class="font-semibold text-forest-600">{{ myPublishedBooks.length }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <Heart :size="14" class="text-forest-400" />
              <span class="text-forest-400">收藏</span>
              <span class="font-semibold text-forest-600">{{ myFavoriteBooks.length }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-cream-100 overflow-hidden">
      <div class="flex border-b border-cream-100 px-2">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all duration-200 -mb-px',
            activeTab === tab.key
              ? 'border-forest-500 text-forest-500'
              : 'border-transparent text-forest-300 hover:text-forest-500',
          ]"
        >
          <component :is="tab.icon" :size="16" />
          {{ tab.label }}
          <span
            :class="[
              'px-2 py-0.5 rounded-full text-xs font-semibold',
              activeTab === tab.key
                ? 'bg-forest-500 text-cream-50'
                : 'bg-cream-100 text-forest-400',
            ]"
          >
            {{ tab.count.value }}
          </span>
        </button>
      </div>

      <div class="p-4 sm:p-6">
        <Transition name="fade" mode="out-in">
          <div :key="activeTab">
            <TransitionGroup
              v-if="currentBooks.length > 0"
              name="fade-list"
              tag="div"
              class="masonry columns-1 sm:columns-2 lg:columns-3 xl:columns-4"
            >
              <BookCard
                v-for="book in currentBooks"
                :key="book.id"
                :book="book"
                @require-login="onRequireLogin"
              />
            </TransitionGroup>

            <div
              v-else
              class="flex flex-col items-center justify-center py-16"
            >
              <div class="w-20 h-20 rounded-full bg-cream-100 flex items-center justify-center mb-4">
                <component
                  :is="activeTab === 'published' ? Upload : Heart"
                  :size="36"
                  class="text-forest-300"
                />
              </div>
              <p class="text-forest-400 font-medium mb-1">
                {{ activeTab === 'published' ? '还没有发布书籍' : '还没有收藏书籍' }}
              </p>
              <p class="text-sm text-forest-300">
                {{ activeTab === 'published' ? '发布你的第一本闲置书吧' : '去首页逛逛，发现感兴趣的书' }}
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <LoginModal
      :visible="showLoginModal"
      @close="showLoginModal = false"
    />
  </div>
</template>
