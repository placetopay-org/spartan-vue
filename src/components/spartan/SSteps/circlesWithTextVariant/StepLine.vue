<script setup lang="ts">
defineProps<{
    last: boolean;
    isComplete: boolean;
}>();
</script>

<template>
    <div
        v-if="!last"
        :class="[
            'absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5',
            isComplete ? 'bg-spartan-primary-500' : 'bg-gray-300',
        ]"
        aria-hidden="true"
    />
</template>
