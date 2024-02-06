<script setup lang="ts">
import CompleteStep from './steps/CompleteStep.vue';
import CurrentStep from './steps/CurrentStep.vue';
import UpcomingStep from './steps/UpcomingStep.vue';
import type { TStepsProps } from './types';

defineProps<TStepsProps>();
</script>

<template>
    <nav aria-label="Progress">
        <ol role="list" class="overflow-hidden">
            <li
                v-for="(step, stepIdx) in steps"
                :key="step.name"
                :class="[stepIdx !== steps.length - 1 ? 'pb-10' : '', 'relative']"
            >
                <template v-if="step.status === 'complete'">
                    <div
                        v-if="stepIdx !== steps.length - 1"
                        class="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-primary-500"
                        aria-hidden="true"
                    />
                    <CompleteStep :step="step" />
                </template>

                <template v-else-if="step.status === 'current'">
                    <div
                        v-if="stepIdx !== steps.length - 1"
                        class="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                        aria-hidden="true"
                    />
                    <CurrentStep :step="step" />
                </template>

                <template v-else>
                    <div
                        v-if="stepIdx !== steps.length - 1"
                        class="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                        aria-hidden="true"
                    />
                    <UpcomingStep :step="step" />
                </template>
            </li>
        </ol>
    </nav>
</template>
