<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { SInput, SInputAmount } from '@spartan';
import type { TField } from '../types';
import { translator } from '@/helpers';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
    modelValue?: string[] | number[];
    field: TField;
}>();

const { t } = translator('filter');

const value1 = ref(props.modelValue?.[0]);
const value2 = ref(props.modelValue?.[1]);

watch([value1, value2], () => {
    emit('update:modelValue', [value1.value, value2.value]);
});

const updateCurrency = (currency?: string) => {
    props.field.interfaces.twoInputs!.currency = currency as any;
};

const interfaceData = computed(() => props.field.interfaces.twoInputs!);
</script>

<template>
    <div class="flex gap-4">
        <SInputAmount
            v-if="interfaceData.type === 'amount'"
            v-model="(value1 as number)"
            :currency="interfaceData.currency ?? interfaceData.currencies![0]"
            :currencies="interfaceData.currencies"
            :type="interfaceData.type"
            :placeholder="t('inputSelectorPlaceholder')"
            :minor-unit-mode="interfaceData.minorUnitMode"
            @update:currency="updateCurrency"
        />
        <SInput
            v-else
            v-model="value1"
            class="w-48"
            :type="interfaceData.type"
            :placeholder="t('inputSelectorPlaceholder')"
        />

        <SInputAmount
            v-if="interfaceData.type === 'amount'"
            v-model="(value2 as number)"
            :currency="interfaceData.currency ?? interfaceData.currencies![0]"
            :currencies="interfaceData.currencies"
            :type="interfaceData.type"
            :placeholder="t('inputSelectorPlaceholder')"
            :minor-unit-mode="interfaceData.minorUnitMode"
            @update:currency="updateCurrency"
        />
        <SInput
            v-else
            v-model="value2"
            class="w-48"
            :type="interfaceData.type"
            :placeholder="t('inputSelectorPlaceholder')"
        />
    </div>
</template>
