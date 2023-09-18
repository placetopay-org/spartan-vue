<script setup lang="ts">
defineProps<{
    label: string;
}>();
</script>

<template>
    <li>
        <div class="bg-gray-100 pl-3">
            <span class="font-semibold text-gray-700">
                {{ label }}
            </span>
        </div>
        <slot />
    </li>
</template>
