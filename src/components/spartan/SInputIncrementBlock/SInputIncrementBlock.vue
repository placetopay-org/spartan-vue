<script setup lang="ts">
import { SInputIncrement, type TInputIncrementProps, type TInputIncrementEmits } from '../SInputIncrement';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';
import { extractWrapperProps } from '@/helpers';

defineEmits<TInputIncrementEmits>();
const props = defineProps<Partial<TBlockWrapperProps> & TInputIncrementProps>();
const [blockWrapperProps, inputIncrementProps] = extractWrapperProps<TInputIncrementProps>(props);
</script>

<template>
    <BlockWrapper v-slot="{ id }" wrapper="SInputBlock" v-bind="blockWrapperProps">
        <SInputIncrement
            :id
            class="w-full"
            v-bind="inputIncrementProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
        />
    </BlockWrapper>
</template>
