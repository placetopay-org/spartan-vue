<script setup lang="ts">
import { computed, type FunctionalComponent } from 'vue';
import { Switch, SwitchGroup, SwitchLabel, SwitchDescription } from '@headlessui/vue';
import { hasSlotContent } from '@/helpers';

const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
    icon?: boolean | FunctionalComponent;
    iconOff?: FunctionalComponent;
    iconOn?: FunctionalComponent;
    modelValue: boolean;
    passive?: boolean;
    reverse?: boolean;
}>();

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
    <SwitchGroup as="div" :class="['flex items-center gap-3', reverse ? 'flex-row-reverse justify-between' : '']">
        <Switch
            v-model="model"
            :class="[
                model ? 'bg-primary-600' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
            ]"
        >
            <span
                aria-hidden="true"
                :class="[
                    model ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                ]"
            >
                <template v-if="icon || iconOff || iconOn">
                    <span
                        :class="[
                            model ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
                        ]"
                        aria-hidden="true"
                    >
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
                    <span
                        :class="[
                            model ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
                            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
                        ]"
                        aria-hidden="true"
                    >
                        <component :is="iconOn" v-if="iconOff" class="h-3 w-3 text-primary-600" />
                        <template v-if="icon">
                            <svg
                                v-if="typeof icon === 'boolean'"
                                class="h-3 w-3 text-primary-600"
                                fill="currentColor"
                                viewBox="0 0 12 12"
                            >
                                <path
                                    d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                                />
                            </svg>
                            <component :is="icon" v-else class="h-3 w-3 text-primary-600" />
                        </template>
                    </span>
                </template>
            </span>
        </Switch>
        <div v-if="hasSlotContent($slots.default) || hasSlotContent($slots.description)">
            <SwitchLabel
                v-if="hasSlotContent($slots.default)"
                as="span"
                class="flex flex-col text-sm font-medium text-gray-700"
                :passive="passive"
            >
                <slot />
            </SwitchLabel>
            <SwitchDescription
                v-if="hasSlotContent($slots.description)"
                as="span"
                class="text-sm text-gray-500"
                @click="toggle"
            >
                <slot name="description" />
            </SwitchDescription>
        </div>
    </SwitchGroup>
</template>
