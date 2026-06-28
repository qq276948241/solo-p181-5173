<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { BookOpen, ShoppingCart, User, Home } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()

const cartCount = computed(() => cartStore.totalCount)
const userAvatar = computed(() => userStore.avatar)

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/profile', label: '个人中心', icon: User },
]

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <nav class="sticky top-0 z-40 bg-cream-200/95 backdrop-blur-md border-b border-cream-300/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div
          @click="router.push('/')"
          class="flex items-center gap-2.5 cursor-pointer group"
        >
          <div class="w-9 h-9 rounded-xl bg-forest-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <BookOpen :size="20" class="text-cream-50" />
          </div>
          <span class="font-serif text-xl font-bold text-forest-600 group-hover:text-forest-500 transition-colors">
            书市校园
          </span>
        </div>

        <div class="flex items-center gap-1 sm:gap-2">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
              isActive(item.path)
                ? 'bg-forest-500 text-cream-50 shadow-sm'
                : 'text-forest-500 hover:bg-cream-100',
            ]"
          >
            <component :is="item.icon" :size="18" />
            <span class="hidden sm:inline">{{ item.label }}</span>
          </router-link>

          <div class="relative mx-1 sm:mx-2">
            <button
              class="relative w-10 h-10 flex items-center justify-center rounded-xl text-forest-500 hover:bg-cream-100 transition-colors"
            >
              <ShoppingCart :size="20" />
              <Transition name="fade">
                <span
                  v-if="cartCount > 0"
                  class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold shadow-sm"
                >
                  {{ cartCount > 99 ? '99+' : cartCount }}
                </span>
              </Transition>
            </button>
          </div>

          <div class="w-px h-7 bg-cream-300 mx-1"></div>

          <button
            @click="router.push('/profile')"
            class="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl hover:bg-cream-100 transition-colors"
          >
            <div class="w-8 h-8 rounded-full overflow-hidden border-2 border-cream-300 bg-cream-100">
              <img
                v-if="userAvatar"
                :src="userAvatar"
                alt="用户头像"
                class="w-full h-full object-cover"
              />
              <User v-else :size="16" class="w-full h-full text-forest-400 p-1" />
            </div>
            <span class="hidden sm:inline text-sm font-medium text-forest-500">
              {{ userStore.nickname || '未登录' }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
