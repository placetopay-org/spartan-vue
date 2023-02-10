<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import SButton from '../SButton.vue';
import SFilterAddItemFormMenu from './SFilterAddItemFormMenu.vue';
import SFilterAddItemOperator from './SFilterAddItemOperator.vue';
import { InputByType, OptionsByInputType } from './SFilterSelectorConstant';

const emit = defineEmits([
    'delete',
    'duplicate',
    'cancel',
    'save',
    'update:value',
    'update:operator'
]);

const props = defineProps({
    itemSelector: {
        type: Object,
        required: true,
        validator: (value) => {
            return value.id && value.label && value.type && (!value.operators || Array.isArray(value.operators));
        }
    },
    canDuplicate: {
        type: Boolean,
        default: true,
    },
    value: {
        type: [String, Object, Array, Number, null],
        required: true,
    },
    operator: {
        type: String,
        required: true,
    },
    saveButtonText: {
        type: String,
        required: true,
    },
})

const modelValue = computed({
    get: () => input.value.formatter ? input.value.formatter(props.value) : props.value,
    set: (value) => emit('update:value', value),
})

const modelOperator = computed({
    get: () => props.operator,
    set: (value) => emit('update:operator', value),
});

const input = computed(() => {
    const makeComponentByInputType = createPropertiesToComponent(props.itemSelector);

    const inputComponent = InputByType[props.itemSelector.type]
    const makeComponent = makeComponentByInputType(inputComponent?.default);

    const inputOperatorComponent = inputComponent[props.operator];
    if (inputOperatorComponent) return makeComponent(inputOperatorComponent);

    return makeComponent(inputComponent);
});

const operators = computed(() => {
    let operatorsBySelectorType = OptionsByInputType[props.itemSelector.type]
    if (operatorsBySelectorType) operatorsBySelectorType = operatorsBySelectorType.filter((operator) => operator.value === props.operator);

    return operatorsBySelectorType ?? [];
})

const createPropertiesToComponent = (selectorProperties = {}) => (defaultProperties = {}) => (objectComponent = {}) => ({
    component: objectComponent.component ?? defaultProperties?.component,
    props: {
        ...(objectComponent.props ?? {}),
        ...(defaultProperties?.props ?? {}),
        id: `sFilter-form-item-${selectorProperties.id}`,
        rows: objectComponent.rows ?? defaultProperties.rows ?? selectorProperties.rows ?? undefined,
    },
    formatter: objectComponent.formatter ?? defaultProperties?.formatter ?? undefined,
})

const resetModelValue = () => {
    if (!input.value?.isValid || input.value.isValid(props.value)) return;

    modelValue.value = input.value.formatter?.() ?? ''
};


const { t } = useI18n({
  useScope: 'local',
  messages: {
    en: {
        spartan: {
            cancel: 'Cancel',
        }
    },
    es: {
        spartan: {
            cancel: 'Cancelar',
        }
    },
    it: {
        spartan: {
            cancel: 'Annulla',
        }
    },
    pt: {
        spartan: {
            cancel: 'Cancelar',
        }
    }
  }
});
</script>

<template>
   <div class="flex flex-col max-w-xs gap-4 p-4 bg-white rounded-lg shadow-2xl">
        <div class="flex justify-between">
            <div class="flex items-center gap-3">
                <h4 class="text-base font-normal text-gray-800">{{ itemSelector.label }}</h4>
                <SFilterAddItemOperator :options="operators" v-model="modelOperator" @changed="resetModelValue" />
            </div>

            <SFilterAddItemFormMenu
                :duplicate="canDuplicate"
                @delete="$emit('delete')"
                @duplicate="$emit('duplicate')"
            />
        </div>

        <component
            :is="input.component"
            v-model="modelValue"
            v-bind="input.props"
        />

        <div class="flex gap-3">
            <SButton color="white" class="w-full" @click="$emit('cancel')">{{t('spartan.cancel')}}</SButton>
            <SButton color="primary" class="w-full" @click="$emit('save')">{{ saveButtonText }}</SButton>
        </div>
    </div>
</template>