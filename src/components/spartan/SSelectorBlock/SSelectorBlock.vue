<script setup lang="ts">
import { BlockWrapper, type TBlockWrapperProps } from '@internal';
import { SSelector, type TSelectorProps, type TSelectorEmits } from '../SSelector';
import { extractWrapperProps } from '@/helpers';

defineEmits<TSelectorEmits>();
const props = defineProps<Partial<TBlockWrapperProps> & Partial<TSelectorProps>>();
const [blockWrapperProps, selectorProps] = extractWrapperProps<TSelectorProps>(props);
</script>

<template>
    <BlockWrapper wrapper="SSelectorBlock" v-bind="blockWrapperProps" v-slot="{ id }">
        <SSelector
            class="w-full"
            v-bind="selectorProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
            @query="(query) => $emit('query', query)"
        >
            <template #option>
                <slot name="options" />
            </template>
        </SSelector>
    </BlockWrapper>
</template>
