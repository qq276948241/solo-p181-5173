<script setup lang="ts">
import { X, UserCircle } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'

defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const userStore = useUserStore()

function handleLogin() {
  userStore.setLoggedIn(true)
  emit('close')
}
</script>

<template>
  <Transition name="modal">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        class="absolute inset-0 bg-forest-900/50 backdrop-blur-sm"
        @click="emit('close')"
      ></div>

      <div
        class="modal-content relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <button
          @click="emit('close')"
          class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream-100 text-forest-300 transition-colors z-10"
        >
          <X :size="18" />
        </button>

        <div class="p-6">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center">
              <UserCircle :size="40" class="text-forest-500" />
            </div>
          </div>

          <h3 class="text-xl font-serif font-bold text-forest-600 text-center mb-2">
            需要登录
          </h3>
          <p class="text-sm text-forest-300 text-center mb-6 leading-relaxed">
            登录后可以收藏书籍、管理购物车<br />
            当前模拟用户 ID：<span class="font-mono text-forest-500">10086</span>
          </p>

          <div class="space-y-3">
            <button
              @click="handleLogin"
              class="w-full py-3 bg-forest-500 hover:bg-forest-400 text-cream-50 font-medium rounded-xl transition-colors duration-200"
            >
              模拟登录（用户 10086）
            </button>
            <button
              @click="emit('close')"
              class="w-full py-3 bg-cream-100 hover:bg-cream-200 text-forest-500 font-medium rounded-xl transition-colors duration-200"
            >
              稍后再说
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
