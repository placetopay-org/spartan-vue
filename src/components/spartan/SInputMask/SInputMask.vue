<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { SInput, type TInputProps } from '../SInput';
import type { TInputMaskProps, TInputMaskEmits } from './types';
import IMask from 'imask';

const emit = defineEmits<TInputMaskEmits>();

const props = defineProps<Partial<TInputProps> & TInputMaskProps>();

const inputProps = computed<Partial<TInputProps>>(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { mask, ...rest } = props;

    return { ...rest };
});

const $input = ref<typeof SInput>();
const maskOptions = computed(() => ({ mask: props.mask }));

onMounted(() => {
    // @ts-expect-error - inputElement property exists at runtime
    const mask = IMask($input.value.inputElement!, maskOptions.value);
    mask.on('accept', () => emit('update:modelValue', mask.value));
    mask.on('complete', () => emit('complete'));

    watch(maskOptions, (value) => {
        mask.updateOptions(value);
    });
});
</script>

<template>
    <SInput v-bind="inputProps" ref="$input">
        <template #left><slot name="left" /></template>
        <template #right><slot name="right" /></template>
    </SInput>
</template>
