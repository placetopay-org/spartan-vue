<script setup lang="ts">
import { SInputDate, type TInputDateProps, type TInputDateEmits } from '../SInputDate';
import { BlockWrapper, type TBlockWrapperProps } from '@internal';
import { extractWrapperProps } from '@/helpers';
import type { VueDatePickerProps } from '@vuepic/vue-datepicker';

defineEmits<TInputDateEmits>();
const props = defineProps<Partial<TBlockWrapperProps> & TInputDateProps & VueDatePickerProps>();
const [blockWrapperProps, inputDateProps] = extractWrapperProps<TInputDateProps>(props);
</script>

<template>
    <BlockWrapper v-slot="{ id }" wrapper="SInputDateBlock" v-bind="blockWrapperProps" use-dp-uid>
        <SInputDate
            :id
            class="w-full"
            v-bind="inputDateProps"
            @update:model-value="(newValue) => $emit('update:modelValue', newValue)"
        />
    </BlockWrapper>
</template>
