<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { SInput, type TInputProps } from '@spartan';
import type { TInputPasswordProps, TInputPasswordEmits, TState, TValidatorKey } from './types';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';
import * as validators from './validators';
import StatusBar from './StatusBar.vue';

const emit = defineEmits<TInputPasswordEmits>();
const props = defineProps<TInputPasswordProps & Partial<TInputProps>>();

const inputProps = computed(() => {
    const { modelValue, rules, ...rest } = props;
    return rest as Partial<TInputProps>;
});

const showPassword = ref(false);

const validationState = computed(() => {
    const modelValue = props.modelValue as string;

    if (!props.rules) return;

    const newState = (Object.keys(props.rules) as TValidatorKey[]).reduce((acc, key) => {
        const value = props.rules![key] as any;
        const isValid = !!modelValue && validators[key](modelValue, value);
        acc[key] = { isValid, value };
        return acc;
    }, {} as TState);

    return newState;
});

const isValid = computed(() => {
    if (!props.modelValue) return;
    return validationState.value ? Object.values(validationState.value).every((val) => val.isValid) : true;
});

watchEffect(() => {
    emit('state', validationState.value);
    emit('isValid', isValid.value);
});
</script>

<template>
    <SInput
        ref="inputRef"
        class="overflow-hidden"
        v-bind="inputProps"
        :type="showPassword ? 'text' : 'password'"
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', String($event))"
    >
        <template #right>
            <button tabindex="-1" type="button" @click.prevent="showPassword = !showPassword">
                <component :is="showPassword ? EyeIcon : EyeSlashIcon" class="h-6 w-6 text-gray-500" />
            </button>

            <StatusBar v-if="meter" :is-valid="isValid" />
        </template>
    </SInput>
</template>
