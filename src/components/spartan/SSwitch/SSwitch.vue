<script setup lang="ts">
import { computed } from 'vue';
import { Switch, SwitchGroup, SwitchLabel, SwitchDescription } from '@headlessui/vue';
import { hasSlotContent } from '@/helpers';
import {
    switchContainerStyles,
    switchTrackStyles,
    switchKnobStyles,
    switchIconOffStyles,
    switchIconOnStyles,
    switchLabelStyles,
    switchDescriptionStyles,
} from './styles';
import type { TSwitchEmits, TSwitchProps } from './types';

const emit = defineEmits<TSwitchEmits>();
const props = defineProps<TSwitchProps>();

const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    },
});

const toggle = () => {
    if (!props.passive) {
        model.value = !model.value;
    }
};
</script>

<template>
    <SwitchGroup as="div" :class="switchContainerStyles({ reverse })">
        <Switch v-model="model" :class="switchTrackStyles({ active: model })">
            <span aria-hidden="true" :class="switchKnobStyles({ active: model })">
                <template v-if="icon || iconOff || iconOn">
                    <span :class="switchIconOffStyles({ active: model })" aria-hidden="true">
                        <component :is="iconOff" v-if="iconOff" class="h-3 w-3 text-gray-400" />
                        <template v-if="icon">
                            <svg
                                v-if="typeof icon === 'boolean'"
                                class="h-3 w-3 text-gray-400"
                                fill="none"
                                viewBox="0 0 12 12"
                            >
                                <path
                                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            <component :is="icon" v-else class="h-3 w-3 text-gray-400" />
                        </template>
                    </span>
                    <span :class="switchIconOnStyles({ active: model })" aria-hidden="true">
                        <component :is="iconOn" v-if="iconOff" class="h-3 w-3 text-spartan-primary-600 dark:text-gray-400" />
                        <template v-if="icon">
                            <svg
                                v-if="typeof icon === 'boolean'"
                                class="h-3 w-3 text-spartan-primary-600 dark:text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 12 12"
                            >
                                <path
                                    d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                                />
                            </svg>
                            <component :is="icon" v-else class="h-3 w-3 text-spartan-primary-600 dark:text-gray-400" />
                        </template>
                    </span>
                </template>
            </span>
        </Switch>
        <div v-if="hasSlotContent($slots.default) || hasSlotContent($slots.description)">
            <SwitchLabel
                v-if="hasSlotContent($slots.default)"
                as="span"
                :class="switchLabelStyles()"
                :passive
            >
                <slot />
            </SwitchLabel>
            <SwitchDescription
                v-if="hasSlotContent($slots.description)"
                as="span"
                :class="switchDescriptionStyles()"
                @click="toggle"
            >
                <slot name="description" />
            </SwitchDescription>
        </div>
    </SwitchGroup>
</template>
