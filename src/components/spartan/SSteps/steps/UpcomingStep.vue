<script setup lang="ts">
defineProps<{ step: { href: string; name: string; description: string } }>();
</script>

<template>
    <a :href="step.href" class="group relative flex items-start">
        <span class="flex h-9 items-center" aria-hidden="true">
            <span
                class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400"
            >
                <span class="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
            </span>
        </span>
        <span class="ml-4 flex min-w-0 flex-col">
            <span class="text-xs font-semibold text-gray-400">{{ step.name }}</span>
            <span class="text-sm text-gray-400">{{ step.description }}</span>
        </span>
    </a>
</template>
