<script setup lang="ts">
import { ref, watch } from 'vue';
import { SInput, SInputAmount } from '@spartan';
import type { IInputConfig } from './types';
import { translator } from '@/helpers';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
    modelValue?: string[] | number[];
    config: IInputConfig;
}>();

const { t } = translator('filter');

const value1 = ref(props.modelValue?.[0]);
const value2 = ref(props.modelValue?.[1]);

watch([value1, value2], () => {
    emit('update:modelValue', [value1.value, value2.value]);
});

const updateCurrency = (currency?: string) => {
    props.config.currency = currency as any;
};
</script>

<template>
    <div class="flex gap-4">
        <SInputAmount
            v-if="config.inputType === 'amount'"
            v-model="(value1 as number)"
            :currency="config.currency ?? config.currencies![0]"
            :currencies="config.currencies"
            :type="config.inputType"
            :placeholder="t('inputSelectorPlaceholder')"
            :minor-unit-mode="config.minorUnitMode"
            @update:currency="updateCurrency"
        />
        <SInput
            v-else
            v-model="value1"
            class="w-48"
            :type="config.inputType"
            :placeholder="t('inputSelectorPlaceholder')"
        />

        <SInputAmount
            v-if="config.inputType === 'amount'"
            v-model="(value2 as number)"
            :currency="config.currency ?? config.currencies![0]"
            :currencies="config.currencies"
            :type="config.inputType"
            :placeholder="t('inputSelectorPlaceholder')"
            :minor-unit-mode="config.minorUnitMode"
            @update:currency="updateCurrency"
        />
        <SInput
            v-else
            v-model="value2"
            class="w-48"
            :type="config.inputType"
            :placeholder="t('inputSelectorPlaceholder')"
        />
    </div>
</template>
