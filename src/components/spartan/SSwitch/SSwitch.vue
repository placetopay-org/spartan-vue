<script setup lang="ts">
import { computed } from 'vue';
import { Switch, SwitchGroup, SwitchLabel, SwitchDescription } from '@headlessui/vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
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
    <SwitchGroup as="div" :class="['flex items-center', reverse ? 'flex-row-reverse justify-between' : 'gap-3']">
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
            />
        </Switch>
        <span>
            <SwitchLabel as="span" class="flex flex-col text-sm font-medium text-gray-700" :passive="passive">
                <slot name="label" />
            </SwitchLabel>
            <SwitchDescription as="span" class="text-sm text-gray-500" @click="toggle">
                <slot name="description" />
            </SwitchDescription>
        </span>
    </SwitchGroup>
</template>
