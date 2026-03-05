<script setup lang="ts">
defineProps<{
    placeholder: string;
}>();
</script>

<template>
    <div class="flex h-96 w-full flex-col overflow-hidden rounded-lg">
        <!-- banner -->
        <div
            class="bg-inverted text-inverted absolute top-0 right-0 flex translate-x-1/4 translate-y-full rotate-45 items-center gap-2 px-5 py-2 font-bold drop-shadow-lg"
            :style="{
                clipPath: `polygon(
           0% 3%, 10% 0%, 22% 4%, 35% 0%, 48% 3%, 60% 0%, 73% 4%, 86% 0%, 100% 2%,
           98% 12%, 100% 25%, 96% 38%, 100% 52%, 97% 65%, 100% 78%, 96% 92%, 100% 100%,
           88% 97%, 75% 100%, 62% 96%, 48% 100%, 35% 97%, 22% 100%, 10% 96%, 0% 98%,
           3% 88%, 0% 75%, 4% 62%, 0% 48%, 3% 35%, 0% 22%, 4% 10%
         )`,
            }"
        >
            <UColorModeImage
                class="h-5"
                light="/landing/dark/evertec.svg"
                dark="/landing/light/evertec.svg"
                alt="Banner"
            />

            <slot name="banner" />

            <span>💸</span>
        </div>

        <div class="flex-1 overflow-y-auto">
            <div class="flex h-full flex-col items-center justify-center p-4 text-center">
                <div class="bg-muted/10 mb-3 flex size-10 items-center justify-center rounded-full">
                    <UIcon name="i-lucide-sparkles" class="text-muted size-5" />
                </div>
                <p class="text-muted text-sm">
                    <slot />
                </p>
            </div>
        </div>

        <div class="p-3">
            <form class="flex items-center gap-2">
                <UInput
                    :disabled="true"
                    :placeholder
                    size="sm"
                    class="flex-1"
                    :ui="{
                        base: 'bg-elevated',
                    }"
                />
                <div class="flex items-center gap-1">
                    <UButton type="submit" icon="i-lucide-arrow-up" color="primary" size="xs" :disabled="true" />
                </div>
            </form>
        </div>
    </div>
</template>
