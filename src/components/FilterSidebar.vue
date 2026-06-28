<script setup lang="ts">
import { computed } from 'vue'
import { RotateCcw, GraduationCap, Banknote } from 'lucide-vue-next'
import { useBookStore } from '@/stores/book'

const bookStore = useBookStore()

const selectedColleges = computed(() => bookStore.selectedColleges)
const priceRange = computed(() => bookStore.priceRange)
const maxPrice = computed(() => bookStore.maxPrice)

function toggleCollege(college: string) {
  bookStore.toggleCollege(college)
}

function onMinPriceChange(e: Event) {
  const target = e.target as HTMLInputElement
  const minVal = Math.min(Number(target.value), priceRange.value[1])
  bookStore.setPriceRange([minVal, priceRange.value[1]])
}

function onMaxPriceChange(e: Event) {
  const target = e.target as HTMLInputElement
  const maxVal = Math.max(Number(target.value), priceRange.value[0])
  bookStore.setPriceRange([priceRange.value[0], maxVal])
}

function clearAll() {
  bookStore.clearFilters()
}
</script>

<template>
  <aside class="bg-white rounded-2xl p-5 shadow-sm border border-cream-100 h-fit sticky top-24">
    <div class="flex items-center justify-between mb-5">
      <h2 class="font-serif text-lg font-bold text-forest-600">筛选</h2>
      <button
        @click="clearAll"
        class="flex items-center gap-1 text-xs text-forest-300 hover:text-forest-500 transition-colors"
      >
        <RotateCcw :size="12" />
        重置
      </button>
    </div>

    <div class="mb-6">
      <div class="flex items-center gap-2 mb-3">
        <GraduationCap :size="16" class="text-forest-500" />
        <h3 class="text-sm font-semibold text-forest-500">学院</h3>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="college in bookStore.colleges"
          :key="college"
          @click="toggleCollege(college)"
          :class="[
            'px-3 py-1.5 text-xs rounded-full transition-all duration-200',
            selectedColleges.includes(college)
              ? 'bg-forest-500 text-cream-50 shadow-sm'
              : 'bg-cream-50 text-forest-400 hover:bg-cream-100 hover:text-forest-500',
          ]"
        >
          {{ college }}
        </button>
      </div>
    </div>

    <div>
      <div class="flex items-center gap-2 mb-3">
        <Banknote :size="16" class="text-forest-500" />
        <h3 class="text-sm font-semibold text-forest-500">价格区间</h3>
      </div>

      <div class="px-1">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-medium text-forest-500">¥{{ priceRange[0] }}</span>
          <span class="text-xs text-forest-300">—</span>
          <span class="text-sm font-medium text-forest-500">¥{{ priceRange[1] }}</span>
        </div>

        <div class="space-y-3">
          <div>
            <label class="text-xs text-forest-300 mb-1 block">最低价</label>
            <input
              type="range"
              :min="0"
              :max="maxPrice"
              :value="priceRange[0]"
              @input="onMinPriceChange"
              class="w-full h-2 bg-cream-100 rounded-lg appearance-none cursor-pointer accent-forest-500"
            />
          </div>
          <div>
            <label class="text-xs text-forest-300 mb-1 block">最高价</label>
            <input
              type="range"
              :min="0"
              :max="maxPrice"
              :value="priceRange[1]"
              @input="onMaxPriceChange"
              class="w-full h-2 bg-cream-100 rounded-lg appearance-none cursor-pointer accent-forest-500"
            />
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
