<script setup lang="ts">
import { STextArea, type TTextAreaProps } from '../STextArea';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';
import { extractWrapperProps } from '@/helpers';

const props = defineProps<Partial<TBlockWrapperProps> & TTextAreaProps>();
const [blockWrapperProps, textAreaProps] = extractWrapperProps<TTextAreaProps>(props);
</script>

<template>
    <BlockWrapper v-slot="{ id }" wrapper="SInputBlock" v-bind="blockWrapperProps">
        <STextArea
            :id="id"
            class="w-full"
            v-bind="textAreaProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
        />
    </BlockWrapper>
</template>
