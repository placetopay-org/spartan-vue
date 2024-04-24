<script setup lang="ts">
import SStepsItem from './SStepsItem.vue';
import type { TStepsProps } from './types';
import { containerStyles } from './styles';

defineProps<TStepsProps>();
</script>

<template>
    <nav aria-label="Progress">
        <ol role="list" :class="containerStyles({ variant })">
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
