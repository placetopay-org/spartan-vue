<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    label: string;
}>();

const group = ref<HTMLElement | null>(null);
</script>

<template>
    <li v-show="group && group.children.length - 1" ref="group">
        <div class="bg-gray-100 pl-3">
            <span class="font-semibold text-gray-700">
                {{ label }}
            </span>
        </div>
        <slot />
    </li>
</template>
