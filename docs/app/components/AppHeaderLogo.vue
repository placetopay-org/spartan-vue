<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
  <div class="font-display flex items-center">
    <UColorModeImage
      :light="appConfig.header?.logo?.light || appConfig.header?.logo?.dark"
      :dark="appConfig.header?.logo?.dark || appConfig.header?.logo?.light"
      :alt="appConfig.header?.logo?.alt || appConfig.header?.title"
      class="h-6 w-auto shrink-0"
    />
    <span>
      {{ appConfig.header?.title }}
    </span>
  </div>
</template>
