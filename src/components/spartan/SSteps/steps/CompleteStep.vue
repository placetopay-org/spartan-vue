<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/20/solid';

defineProps<{ step: { href: string; name: string; description: string } }>();
</script>

<template>
    <a :href="step.href" class="group relative flex items-start">
        <span class="flex h-9 items-center">
            <span
                class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 group-hover:bg-primary-700"
            >
                <CheckIcon class="h-5 w-5 text-white" aria-hidden="true" />
            </span>
        </span>
        <span class="ml-4 flex min-w-0 flex-col">
            <span class="text-xs font-semibold text-gray-600">{{ step.name }}</span>
            <span class="text-sm text-gray-600">{{ step.description }}</span>
        </span>
    </a>
</template>
