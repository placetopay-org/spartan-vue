<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog } from '@headlessui/vue';
import { twMerge } from 'tailwind-merge';
import { onUnmounted, ref } from 'vue';

defineEmits<{
    (event: 'close'): void;
}>();

const props = defineProps<{
    show: boolean;
    class?: string;
    backdropClass?: string;
    breakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
}>();

const mediaShow = ref(true);

// Guard `window` so a breakpoint-aware modal can render on the server (Nuxt/SSR)
// instead of throwing; the query is evaluated again on the client during setup.
if (props.breakpoint && typeof window !== 'undefined') {
    const widths = {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1536,
    };

    const minWidth = typeof props.breakpoint === 'number' ? props.breakpoint : widths[props.breakpoint];
    const mediaQuery = window.matchMedia(`(min-width: ${minWidth}px)`);
    const onMediaChange = (e: MediaQueryListEvent) => (mediaShow.value = !e.matches);
    mediaQuery.addEventListener('change', onMediaChange);
    onUnmounted(() => mediaQuery.removeEventListener('change', onMediaChange));
    mediaShow.value = !mediaQuery.matches;
}
</script>

<template>
    <TransitionRoot v-if="mediaShow" appear :show="show">
        <Dialog as="div" :class="twMerge('relative z-50', $props.class)" @close="$emit('close')">
            <!-- Backdrop -->
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div :class="twMerge('fixed inset-0 bg-black/30', backdropClass)" aria-hidden="true" />
            </TransitionChild>
            <slot />
        </Dialog>
    </TransitionRoot>
</template>
