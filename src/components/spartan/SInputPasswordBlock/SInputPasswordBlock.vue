<script setup lang="ts">
import { SInputPassword, type TInputPasswordProps, type TInputPasswordEmits, type TInputProps } from '@spartan';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';
import { extractWrapperProps } from '@/helpers';

defineEmits<TInputPasswordEmits & { (event: 'focus', value?: any): void; (event: 'blur', value?: any): void }>();
const props = defineProps<Partial<TBlockWrapperProps> & TInputPasswordProps & Partial<TInputProps>>();
const [blockWrapperProps, inputPasswordProps] = extractWrapperProps<TInputPasswordProps & Partial<TInputProps>>(props);
</script>

<template>
    <BlockWrapper v-slot="{ id }" wrapper="SInputPasswordBlock" v-bind="blockWrapperProps">
        <SInputPassword
            :id="id"
            class="w-full"
            v-bind="inputPasswordProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
            @state="$emit('state', $event)"
            @is-valid="$emit('isValid', $event)"
            @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)"
        />
    </BlockWrapper>
</template>
