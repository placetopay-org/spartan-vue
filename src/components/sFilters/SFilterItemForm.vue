<script setup>
import { computed } from 'vue';
import SInput from '../SInput.vue';
import SButton from '../SButton.vue';
import SFilterAddItemFormMenu from './SFilterAddItemFormMenu.vue';
import SFilterAddItemOperator from './SFilterAddItemOperator.vue';

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
})

const modelValue = computed({
    get: () => props.value,
    set: (value) => emit('update:value', value),
})

const modelOperator = computed({
    get: () => props.operator,
    set: (value) => emit('update:operator', value),
});
</script>

<template>
   <div class="max-w-xs flex flex-col gap-4 bg-white p-4 shadow-2xl rounded-lg">
        <div class="flex justify-between">
            <div class="flex items-center gap-3">
                <h4 class="text-base font-normal text-gray-800">{{ label }}</h4>
                <SFilterAddItemOperator v-model="modelOperator" />
            </div>

            <SFilterAddItemFormMenu
                :duplicate="canDuplicate"
                @delete="$emit('delete')"
                @duplicate="$emit('duplicate')"
            />
        </div>

        <SInput
            v-model="modelValue"
            placeholder="Escribe un valor"
        />

        <div class="flex gap-3">
            <SButton color="white" class="w-full" @click="$emit('cancel')">Cancelar</SButton>
            <SButton color="primary" class="w-full" @click="$emit('save')">{{ saveButtonText }}</SButton>
        </div>
    </div>
</template>