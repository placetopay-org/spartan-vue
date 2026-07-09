<script lang="ts">
/**
 * A multi-step progress indicator with support for simple and circle-with-text variants.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SSteps Github}.
 */
export default {
    name: 'SSteps',
};
</script>

<script setup lang="ts">
import { reactive } from 'vue';
import SStepsItem from './SStepsItem.vue';
import type { TStepsProps } from './types';
import { createContext } from './api';
import { stepsStyles } from './styles';

const { variant = 'circlesWithText', steps = [] } = defineProps<TStepsProps>();

createContext(
    reactive({
        get variant() {
            return variant;
        },
        get steps() {
            return steps;
        },
    }),
);
</script>

<template>
    <nav aria-label="Progress">
        <ol :class="stepsStyles({ variant })">
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
