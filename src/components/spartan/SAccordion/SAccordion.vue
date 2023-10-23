<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { ref } from 'vue';

const props = defineProps<{
    class?: string;
}>();

const state = ref(false);

const open = () => (state.value = true);
const close = () => (state.value = false);
const toggle = () => (state.value = !state.value);

defineExpose({
    state,
    open,
    close,
    toggle,
});
</script>

<template>
    <Transition appear name="accordion">
        <div v-show="state" :class="twMerge('w-full overflow-hidden', props.class)">
            <slot />
        </div>
    </Transition>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
    transition: width 0.4s cubic-bezier(0.87, 0, 0.13, 1);
}

.accordion-enter-from,
.accordion-leave-to {
    width: 0;
}
</style>
