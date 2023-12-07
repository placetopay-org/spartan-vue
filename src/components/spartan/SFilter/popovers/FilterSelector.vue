<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { SButton, SPopover } from '@spartan';
import { InputSelector, TwoInputSelector, OptionsSelector } from '../selectors';
import OperatorSelector from './OperatorSelector.vue';
import { Oper, FieldType, type Field, type Option } from '../types';
import { translator } from '@/helpers';

const emit = defineEmits<{
    (event: 'add', value: { field: Field; state: Field['state'] }): void;
    (event: 'cancel'): void;
}>();

const props = defineProps<{
    field: Field;
}>();

const conditionMap = {
    [FieldType.BOOLEAN]: {
        [Oper.EX]: null,
        [Oper.NEX]: null,
        [Oper.EQ]: OptionsSelector,
    },
    [FieldType.STRING]: {
        [Oper.EX]: null,
        [Oper.NEX]: null,
        [Oper.EQ]: InputSelector,
        [Oper.NEQ]: InputSelector,
        [Oper.CONTAINS]: InputSelector,
        [Oper.STARTSWITH]: InputSelector,
        [Oper.ENDSWITH]: InputSelector,
    },
    [FieldType.NUMBER]: {
        [Oper.EX]: null,
        [Oper.NEX]: null,
        [Oper.EQ]: InputSelector,
        [Oper.NEQ]: InputSelector,
        [Oper.GT]: InputSelector,
        [Oper.GTE]: InputSelector,
        [Oper.LT]: InputSelector,
        [Oper.LTE]: InputSelector,
        [Oper.BETWEEN]: TwoInputSelector,
        [Oper.NBETWEEN]: TwoInputSelector,
    },
    [FieldType.DATE]: {
        [Oper.EX]: null,
        [Oper.NEX]: null,
        [Oper.EQ]: InputSelector,
        [Oper.NEQ]: InputSelector,
        [Oper.GT]: InputSelector,
        [Oper.GTE]: InputSelector,
        [Oper.LT]: InputSelector,
        [Oper.LTE]: InputSelector,
        [Oper.BETWEEN]: TwoInputSelector,
        [Oper.NBETWEEN]: TwoInputSelector,
    },
    [FieldType.ENUM]: {
        [Oper.EX]: null,
        [Oper.NEX]: null,
        [Oper.EQ]: OptionsSelector,
        [Oper.NEQ]: OptionsSelector,
    },
};

const { t } = translator('filter');
const value = ref();
const operatorGroup = conditionMap[props.field.type];
// const operators = Object.keys(operatorGroup) as Oper[];
const operators = computed<Option[] | undefined>(() => {
    if (props.field.type === 'string')
        return [
            { label: t('operatorEquals'), value: Oper.EQ },
            { label: t('operatorNotEquals'), value: Oper.NEQ },
            { label: t('operatorContains'), value: Oper.CONTAINS },
            { label: t('operatorStartsWith'), value: Oper.STARTSWITH },
            { label: t('operatorEndsWith'), value: Oper.ENDSWITH },
        ];
});

const activeOperator = ref(operators.value?.[0]);

const filterInterface = computed(() => {
    let component;
    let componentProps;

    if (props.field.type === 'boolean') {
        component = OptionsSelector;
        componentProps = {
            options: [
                {
                    label: props.field.config?.true ?? t('yes'),
                    value: true,
                },
                {
                    label: props.field.config?.false ?? t('no'),
                    value: false,
                },
            ],
        };
    }

    return { component, componentProps };
});

// const selectOperator = (selection: Oper, closeCallback: () => void) => {
//     if (
//         selection === Oper.BETWEEN ||
//         selection === Oper.NBETWEEN ||
//         activeOperator.value === Oper.BETWEEN ||
//         activeOperator.value === Oper.NBETWEEN
//     ) {
//         value.value = undefined;
//     }
//     activeOperator.value = selection;
//     closeCallback();
// };

const add = () => {
    emit('add', {
        field: props.field,
        state: value.value,
    });
};

const disabled = computed(() => {
    // if (activeOperator.value) {
    //     if (activeOperator.value === Oper.EX || activeOperator.value === Oper.NEX || props.field.type === 'boolean')
    //     return false;
    // }
    

    const isValid = (value: string | number | boolean | null | undefined) => {
        if (value === 0 || value === false) return true;
        return Boolean(value && String(value).trim());
    };

    if (Array.isArray(value.value)) {
        if (value.value.length === 0) return true;
        return !value.value.every((item) => isValid(item));
    }
    return !isValid(value.value);
});

onMounted(() => {
    if (props.field.state !== undefined) value.value = props.field.state;
});
</script>

<template>
    <div class="flex max-h-96 min-w-[370px] flex-col gap-4 rounded-lg bg-white p-4 shadow-2xl">
        <div class="flex items-center gap-3">
            <span>{{ field.name }}</span>
            <OperatorSelector v-if="activeOperator" :operators="operators" v-model="activeOperator" />
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
            <component :is="filterInterface.component" v-if="filterInterface" v-model="value" v-bind="filterInterface.componentProps" />
        </Transition>

        <div class="flex gap-3">
            <SButton class="w-full" variant="secondary" @click="$emit('cancel')">{{ t('cancelBtn') }}</SButton>
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
