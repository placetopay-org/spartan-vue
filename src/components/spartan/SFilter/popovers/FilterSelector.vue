<script setup lang="ts">
import { computed, ref, type Component } from 'vue';
import { SButton } from '@spartan';
import OperatorSelector from './OperatorSelector.vue';
import type { TField, TOption } from '../types';
import { interfaceComponents } from '../constants';
import { translator } from '@/helpers';
import { useContext } from '../api';

const emit = defineEmits<{
    (event: 'close'): void;
}>();

const props = defineProps<{
    field: TField;
}>();

const { t } = translator('filter');
const context = useContext('FieldSelector');
const operatorData = computed(() => context.operatorData[props.field.id]);

const value = ref(props.field.state?.value ?? undefined);

const operator = ref(props.field.state?.operator ? props.field.state.operator : Object.keys(operatorData.value)[0]);

const add = () => {
    context.applyFilter(props.field, {
        operator: operator.value,
        value: value.value,
    });
    emit('close');
};

const disabled = computed(
    () => (!value.value || value.value.length === 0) && operatorData.value[operator.value].interface !== 'none',
);
</script>

<template>
    <div class="flex max-h-96 min-w-[370px] flex-col gap-4 rounded-lg bg-white p-4 shadow-2xl">
        <div class="flex items-center gap-3">
            <span>{{ field.name }}</span>
            <OperatorSelector :operators="Object.keys(operatorData)" v-model="operator" />
        </div>

        <Transition
            mode="out-in"
            enter-active-class="transition duration-200 ease-out"
            leave-active-class="transition duration-150 ease-in"
            enter-from-class="-translate-y-2 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="-translate-y-2 opacity-0"
        >
            <component :is="interfaceComponents[operatorData[operator].interface]" :field="field" v-model="value" />
        </Transition>

        <div class="flex gap-3">
            <SButton class="w-full" variant="secondary" @click="$emit('close')">{{ t('cancelBtn') }}</SButton>
            <SButton
                :class="['w-full', disabled && 'pointer-events-none opacity-50']"
                :disabled="disabled"
                @click="add"
            >
                {{ t('addBtn') }}
            </SButton>
        </div>
    </div>
</template>
