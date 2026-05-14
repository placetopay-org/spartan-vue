<script setup lang="ts">
import { BlockWrapper, type TBlockWrapperProps } from '@internal';
import { SSelector, type TSelectorProps, type TSelectorEmits } from '../SSelector';
import { extractWrapperProps } from '@/helpers';
import { useSlots } from 'vue';

defineEmits<TSelectorEmits>();
const props = defineProps<Partial<TBlockWrapperProps> & Partial<TSelectorProps>>();
const [blockWrapperProps, selectorProps] = extractWrapperProps<TSelectorProps>(props);
const slots = useSlots();
</script>

<template>
    <BlockWrapper v-slot="{ id }" v-bind="blockWrapperProps">
        <SSelector
            :id
            class="w-full"
            v-bind="selectorProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
            @query="(query) => $emit('query', query)"
        >
            <template v-if="slots.option" #option="{ option }">
                <slot name="option" :option="option" />
            </template>
            <template v-if="slots.trigger" #trigger="{ option, placeholder }">
                <slot name="trigger" :option="option" :placeholder="placeholder" />
            </template>
        </SSelector>
    </BlockWrapper>
</template>
