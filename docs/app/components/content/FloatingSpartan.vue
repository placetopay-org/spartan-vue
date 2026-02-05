<script setup lang="ts">
const colorMode = useColorMode();

const assets = {
  light: '/landing/light/spartan.svg',
  dark: '/landing/dark/spartan.svg',
};

const src = computed(() => {
  return colorMode.value === 'light' ? assets.light : assets.dark;
});
</script>

<template>
  <div class="flex-1 flex items-center justify-center">
    <NuxtImg :src class="h-42 floating-logo" alt="Spartan Colored Logo" />
  </div>
</template>

<style>
.floating-logo {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.group:hover .floating-logo {
  transform: translateY(-20px);
}
</style>
