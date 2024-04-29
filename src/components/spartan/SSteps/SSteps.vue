<script setup lang="ts">
import SStepsItem from './SStepsItem.vue';
import type { TStepsProps } from './types';
import { createContext } from './api';

const props = withDefaults(defineProps<TStepsProps>(), {
    variant: 'circlesWithText',
    steps: () => [],
});

createContext(props);

const containerStyle = {
    simple: 'space-y-4 md:flex md:space-x-8 md:space-y-0',
    circlesWithText: 'overflow-hidden',
}
</script>

<template>
    <nav aria-label="Progress">
        <ol role="list" :class="containerStyle[variant]">
            <slot />
            <SStepsItem
                v-for="(step, stepIdx) in steps"
                :key="step.name"
                :status="step.status"
                :href="step.href"
                :name="step.name"
                :description="step.description"
                :last="stepIdx === steps.length - 1"
            />
        </ol>
    </nav>
</template>
