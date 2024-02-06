<script setup lang="ts">
import { computed } from 'vue';
import { SCombobox, type TComboboxProps, type TComboboxEmits } from '../SCombobox';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';

defineEmits<TComboboxEmits>();

const props = defineProps<Partial<TBlockWrapperProps> & TComboboxProps>();

const blockWrapperProps = computed(() => ({
    label: props.label,
    id: props.id,
    errorText: props.errorText,
    helpText: props.helpText,
}));

const comboboxProps = computed<TComboboxProps>(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { label, helpText, errorText, ...rest } = props;
    return { ...rest, error: props.errorText ? Boolean(props.errorText) : props.error };
});
</script>

<template>
    <BlockWrapper wrapper="SComboboxBlock" v-bind="blockWrapperProps">
        <SCombobox
            class="w-full"
            v-bind="comboboxProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
            @query="$emit('query', $event)"
        >
            <slot />
            <template #button><slot name="button" /></template>
        </SCombobox>
    </BlockWrapper>
</template>
