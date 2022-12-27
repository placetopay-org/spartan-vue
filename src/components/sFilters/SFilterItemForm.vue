<script setup>
import { computed } from 'vue';
import SButton from '../SButton.vue';
import SFilterAddItemFormMenu from './SFilterAddItemFormMenu.vue';
import SFilterAddItemOperator from './SFilterAddItemOperator.vue';
import { InputByType } from './SFilterSelectorConstant';

const emit = defineEmits([
    'delete',
    'duplicate',
    'cancel',
    'save',
    'update:value',
    'update:operator'
]);

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    canDuplicate: {
        type: Boolean,
        default: true,
    },
    value: {
        type: [String, Object, Array],
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
    inputType: {
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
    const inputComponent = InputByType[props.inputType]
    const makeComponent = createPropertiesToComponent(inputComponent?.default);

    const inputOperatorComponent = inputComponent[props.operator];
    if (inputOperatorComponent) return makeComponent(inputOperatorComponent);

    return makeComponent(inputComponent);
});

const createPropertiesToComponent = (defaultProperties = {}) => (objectComponent = {}) => ({
    component: objectComponent.component ?? defaultProperties?.component,
    props: {...(objectComponent.props ?? {}), ...(defaultProperties?.props ?? {})},
    formatter: objectComponent.formatter ?? defaultProperties?.formatter ?? undefined,
})

const resetModelValue = () => modelValue.value = input.formatter?.() ?? '';
</script>

<template>
   <div class="flex flex-col max-w-xs gap-4 p-4 bg-white rounded-lg shadow-2xl">
        <div class="flex justify-between">
            <div class="flex items-center gap-3">
                <h4 class="text-base font-normal text-gray-800">{{ label }}</h4>
                <SFilterAddItemOperator :type="inputType" v-model="modelOperator" @changed="resetModelValue" />
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
            <SButton color="white" class="w-full" @click="$emit('cancel')">Cancelar</SButton>
            <SButton color="primary" class="w-full" @click="$emit('save')">{{ saveButtonText }}</SButton>
        </div>
    </div>
</template>