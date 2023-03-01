<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSFilterContext } from './SFilterContext';
import SFilterItemForm from './SFilterItemForm.vue';

const emit = defineEmits(['added']);

const api = useSFilterContext();
const addItemSelected = computed(() => api.findSelectorById(api.addItemByTypeId.value));

const filterValue = ref('');
const operator = ref(addItemSelected.value?.operators ? addItemSelected.value?.operators[0] : 'eq');

const handleAddFilter = () => {
    api.addFilter({
        label: addItemSelected.value.label,
        key: addItemSelected.value.key,
        type: addItemSelected.value.type,
        value: filterValue.value,
        operator: operator.value
    });
    api.addItemByTypeId.value = null;
    emit('added');
};


const { t } = useI18n({
  useScope: 'local',
  messages: {
    en: {
        spartan: {
            add: 'Add',
        }
    },
    es: {
        spartan: {
            add: 'Agregar',
        }
    },
    it: {
        spartan: {
            add: 'Aggiungere',
        }
    },
    pt: {
        spartan: {
            add: 'Adicionar',
        }
    },
  },
});
</script>

<template>
    <SFilterItemForm
        :item-selector="addItemSelected"
        :value="filterValue"
        :operator="operator"
        :can-duplicate="false"
        :save-button-text="t('spartan.add')"
        @update:value="filterValue = $event"
        @update:operator="operator = $event"
        @delete="api.addItemByTypeId.value = null"
        @save="handleAddFilter"
        @cancel="api.addItemByTypeId.value = null"
    />
</template>