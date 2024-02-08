<script setup lang="ts">
import { computed } from 'vue';
import { SInputDate, type TInputDateProps, type TInputDateEmits } from '../SInputDate';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';

defineEmits<TInputDateEmits>();
const props = defineProps<Partial<TBlockWrapperProps> & TInputDateProps>();

const blockWrapperProps = computed(() => ({
    label: props.label,
    id: props.id,
    errorText: props.errorText,
    helpText: props.helpText,
}));

const InputDateProps = computed<TInputDateProps>(() => {
    // @typescript-eslint/no-unused-vars
    const { label, helpText, errorText, ...rest } = props;
    return { ...rest, error: props.errorText ? Boolean(props.errorText) : props.error };
});
</script>

<template>
    <BlockWrapper wrapper="SInputBlock" v-bind="blockWrapperProps">
        <SInputDate
            class="w-full"
            v-bind="InputDateProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
        />
    </BlockWrapper>
</template>
