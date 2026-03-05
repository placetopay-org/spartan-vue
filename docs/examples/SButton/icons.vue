<script setup lang="ts">
import { CommandSquareIcon as Icon } from '@placetopay/iconsax-vue/outline';
</script>

<template>
    <div class="flex items-center gap-4">
        <SButton :icon="Icon">Left icon</SButton>
        <SButton :right-icon="Icon">Right icon</SButton>
        <SButton :left-icon="Icon" :right-icon="Icon">Both icons</SButton>
    </div>
</template>
