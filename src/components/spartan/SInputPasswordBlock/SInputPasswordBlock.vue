<script setup lang="ts">
import { SInputPassword, type TInputPasswordProps, type TInputPasswordEmits, type TInputProps } from '@spartan';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';
import { extractWrapperProps } from '@/helpers';

defineEmits<TInputPasswordEmits>();
const props = defineProps<Partial<TBlockWrapperProps> & TInputPasswordProps & Partial<TInputProps>>();
const [blockWrapperProps, inputPasswordProps] = extractWrapperProps<TInputPasswordProps & Partial<TInputProps>>(props);
</script>

<template>
    <BlockWrapper wrapper="SInputPasswordBlock" v-bind="blockWrapperProps" v-slot="{ id }">
        <SInputPassword
            :id="id"
            class="w-full"
            v-bind="inputPasswordProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
            @state="$emit('state', $event)"
            @isValid="$emit('isValid', $event)"
            @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)"
        />
    </BlockWrapper>
</template>
