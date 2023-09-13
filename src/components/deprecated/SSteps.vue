<template>
    <nav aria-label="Progress">
        <ol role="list" class="overflow-hidden">
            <li
                v-for="(step, stepIdx) in steps"
                :key="step.name"
                :class="[stepIdx !== steps.length - 1 ? 'pb-10' : '', 'relative']"
            >
                <template v-if="step.status === 'completed'">
                    <div
                        v-if="stepIdx !== steps.length - 1"
                        class="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-primary-500"
                        aria-hidden="true"
                    />
                    <a :href="step.href" class="group relative flex items-start">
                        <span class="flex h-9 items-center">
                            <span
                                class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 group-hover:bg-primary-700"
                            >
                                <CheckIcon class="h-5 w-5 text-white" aria-hidden="true" />
                            </span>
                        </span>
                        <span class="ml-4 flex min-w-0 flex-col">
                            <span class="text-xs font-semibold text-gray-400">{{ step.name }}</span>
                            <span class="text-sm text-gray-400">{{ step.description }}</span>
                        </span>
                    </a>
                </template>

                <template v-else-if="step.status === 'current'">
                    <div
                        v-if="stepIdx !== steps.length - 1"
                        class="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                        aria-hidden="true"
                    />
                    <a :href="step.href" class="group relative flex items-start" aria-current="step">
                        <span class="flex h-9 items-center" aria-hidden="true">
                            <span
                                class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary-500 bg-white"
                            >
                                <span class="h-2.5 w-2.5 rounded-full bg-primary-500" />
                            </span>
                        </span>
                        <span class="ml-4 flex min-w-0 flex-col">
                            <span class="text-xs font-semibold text-primary-500">{{ step.name }}</span>
                            <span class="text-sm text-gray-900">{{ step.description }}</span>
                        </span>
                    </a>
                </template>

                <template v-else>
                    <div
                        v-if="stepIdx !== steps.length - 1"
                        class="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                        aria-hidden="true"
                    />
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
            </li>
        </ol>
    </nav>
</template>

<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/20/solid';

defineProps<{
    steps: Array<{
        name: string;
        href: string;
        description: string;
        status: 'completed' | 'current' | 'upcoming';
    }>;
}>();
</script>
