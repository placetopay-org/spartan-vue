<script setup>
import { computed, ref } from 'vue';
import { useSFilterContext } from './SFilterContext';
import SFilterItemForm from './SFilterItemForm.vue';

const emit = defineEmits(['added']);

const api = useSFilterContext();
const addItemSelected = computed(() => api.findSelectorById(api.addItemByTypeId.value));

const filterValue = ref('');
const operator = ref('eq');

const handleAddFilter = () => {
    api.addFilter({
        label: addItemSelected.value.label,
        value: filterValue.value,
        operator: operator.value
    });
    api.addItemByTypeId.value = null;
    emit('added');
};
</script>

<template>
    <SFilterItemForm
        :label="addItemSelected ? addItemSelected.label : ''"
        :value="filterValue"
        :operator="operator"
        :can-duplicate="false"
        save-button-text="Agregar"
        @update:value="filterValue = $event"
        @update:operator="operator = $event"
        @delete="api.addItemByTypeId.value = null"
        @save="handleAddFilter"
        @cancel="api.addItemByTypeId.value = null"
    />
</template>