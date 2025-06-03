<script setup lang="ts">
import { BlockWrapper, type TBlockWrapperProps } from '@internal';
import { SSelect, type TSelectProps, type TSelectEmits } from '../SSelect';
import { extractWrapperProps } from '@/helpers';

defineEmits<TSelectEmits>();
const props = defineProps<Partial<TBlockWrapperProps> & Partial<TSelectProps>>();
const [blockWrapperProps, selectProps] = extractWrapperProps<Partial<TSelectProps>>(props);
</script>

<template>
    <BlockWrapper v-slot="{ id }" v-bind="blockWrapperProps">
        <SSelect
            :id
            class="w-full"
            v-bind="selectProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
        >
            <slot />
        </SSelect>
    </BlockWrapper>
</template>
