<script setup lang="ts">
import { SInputPassword, type TInputPasswordProps, type TInputPasswordEmits } from '@spartan';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';
import { extractWrapperProps } from '@/helpers';

defineEmits<TInputPasswordEmits>();
const props = defineProps<Partial<TBlockWrapperProps> & Partial<TInputPasswordProps>>();
const [blockWrapperProps, inputProps] = extractWrapperProps<Partial<TInputPasswordProps>>(props);
</script>

<template>
    <BlockWrapper wrapper="SInputPasswordBlock" v-bind="blockWrapperProps" v-slot="{ id }">
        <SInputPassword
            :id="id"
            class="w-full"
            v-bind="inputProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
        />
    </BlockWrapper>
</template>
