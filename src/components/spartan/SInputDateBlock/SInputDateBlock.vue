<script setup lang="ts">
import { SInputDate, type TInputDateProps, type TInputDateEmits } from '../SInputDate';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';
import { extractWrapperProps } from '@/helpers';

defineEmits<TInputDateEmits>();
const props = defineProps<Partial<TBlockWrapperProps> & TInputDateProps>();
const [blockWrapperProps, inputDateProps] = extractWrapperProps<TInputDateProps>(props);
</script>

<template>
    <BlockWrapper wrapper="SInputDateBlock" v-bind="blockWrapperProps" v-slot="{ id }" useDpUid>
        <SInputDate
            :id="id"
            class="w-full"
            v-bind="inputDateProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
        />
    </BlockWrapper>
</template>
