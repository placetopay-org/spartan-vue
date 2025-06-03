<script setup lang="ts">
import { SInputOtp, type TInputOtpProps, type TInputOtpEmits } from '../SInputOtp';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';
import { extractWrapperProps } from '@/helpers';

defineEmits<TInputOtpEmits>();
const props = defineProps<TBlockWrapperProps & TInputOtpProps>();
const [blockWrapperProps, inputProps] = extractWrapperProps<TInputOtpProps>(props);
</script>

<template>
    <BlockWrapper v-slot="{ id }" v-bind="blockWrapperProps">
        <SInputOtp
            :id
            class="w-full"
            v-bind="inputProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
        >
            <slot />
        </SInputOtp>
    </BlockWrapper>
</template>
