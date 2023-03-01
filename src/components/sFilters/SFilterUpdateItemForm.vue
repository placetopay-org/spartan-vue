<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSFilterContext } from './SFilterContext';
import SFilterItemForm from './SFilterItemForm.vue';

const emit = defineEmits(['close']);
const props = defineProps({
    filter: {
        type: Object,
        required: true,
    },
});

const api = useSFilterContext();

const value = ref(props.filter.value);
const operator = ref(props.filter.operator);

const selectorSelected = computed(() => api.findSelectorByKey(props.filter.key));

const handleUpdateFilter = () => {
    api.updateFilter(props.filter.id, {
        ...props.filter,
        value: value.value,
        operator: operator.value
    });

    emit('close');
};

const handleDuplicateFilter = () => {
    api.duplicateFilter(props.filter.id);
    emit('close');
};

const { t } = useI18n({
  useScope: 'local',
  messages: {
    en: {
        spartan: {
            save: 'Save',
        }
    },
    es: {
        spartan: {
            save: 'Guardar',
        }
    },
    it: {
        spartan: {
            save: 'Salvare',
        }
    },
    pt: {
        spartan: {
            save: 'Salvar',
        }
    },
  },
});
</script>

<template>
    <SFilterItemForm
        v-if="selectorSelected"
        :item-selector="selectorSelected"
        :value="value"
        :operator="operator"
        :save-button-text="t('spartan.save')"
        @update:value="value = $event"
        @update:operator="operator = $event"
        @duplicate="handleDuplicateFilter"
        @delete="api.removeFilter(filter.id)"
        @save="handleUpdateFilter"
        @cancel="$emit('close')"
    />
</template>
