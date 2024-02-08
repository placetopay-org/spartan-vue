<script setup lang="ts">
import { SCombobox, type TComboboxProps, type TComboboxEmits } from '../SCombobox';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';
import { extractWrapperProps } from '@/helpers';

defineEmits<TComboboxEmits>();
const props = defineProps<Partial<TBlockWrapperProps> & TComboboxProps>();
const [blockWrapperProps, comboboxProps] = extractWrapperProps<TComboboxProps>(props);
</script>

<template>
    <BlockWrapper wrapper="SComboboxBlock" v-bind="blockWrapperProps" v-slot="{ id }">
        <SCombobox
            :id="id"
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
