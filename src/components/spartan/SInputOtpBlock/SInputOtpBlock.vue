<script setup lang="ts">
import { SInputOTP, type TInputOTPProps, type TInputOTPEmits } from '../SInputOTP';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';
import { extractWrapperProps } from '@/helpers';

defineEmits<TInputOTPEmits>();
const props = defineProps<TBlockWrapperProps & TInputOTPProps>();
const [blockWrapperProps, inputProps] = extractWrapperProps<TInputOTPProps>(props);
</script>

<template>
    <BlockWrapper v-slot="{ id }" wrapper="SInputOtpBlock" v-bind="blockWrapperProps">
        <SInputOTP
            :id
            class="w-full"
            v-bind="inputProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
        >
            <slot />
        </SInputOTP>
    </BlockWrapper>
</template>
