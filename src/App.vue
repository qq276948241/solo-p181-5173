<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-cream-50">
    <NavBar />
    <main class="pb-16">
      <router-view />
    </main>
  </div>
</template>
