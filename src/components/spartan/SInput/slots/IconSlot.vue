<script setup lang="ts">
import type { FunctionalComponent } from 'vue';

defineProps<{ icon: FunctionalComponent }>();
</script>

<template>
    <div class="flex items-center">
        <component :is="icon" v-if="icon" class="h-6 w-6 text-gray-500" />
    </div>
</template>
