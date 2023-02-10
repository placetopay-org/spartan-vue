<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { PopoverPanel } from '@headlessui/vue';
import { SInput, SInputError } from '../sInputs';
import SButton from '../SButton.vue';
import { useSFilterContext } from './SFilterContext';

const api = useSFilterContext();
const name = ref('');
const messageValidation = ref(null);

const validate = () => {
    if (!name.value) {
        messageValidation.value = 'spartan.filterNameIsRequired';
        return false;
    }

    if (api.filters.length === 0) {
        messageValidation.value = 'spartan.noFiltersSelected';
        return false;
    }

    messageValidation.value = null;
    return true;
}

const handleSaveFilter = (close) => {
    if (!validate()) return;

    api.saveFilters(name.value);
    name.value = '';
    close();
};

const handleCancel = (close) => {
    name.value = '';
    close();
};
{}
const { t } = useI18n({
  useScope: 'local',
  messages: {
    en: {
        spartan: {
            filterNameIsRequired: 'Filter name is required',
            noFiltersSelected: 'No filters selected',
            filterName: 'Filter name',
            cancel: 'Cancel',
            save: 'Save',
        }
    },
    es: {
        spartan: {
            filterNameIsRequired: 'El nombre del filtro es requerido',
            noFiltersSelected: 'No hay filtros seleccionados',
            filterName: 'Nombre del filtro',
            cancel: 'Cancelar',
            save: 'Guardar',
        }
    },
    it: {
        spartan: {
            filterNameIsRequired: 'Il nome del filtro è obbligatorio',
            noFiltersSelected: 'Nessun filtro selezionato',
            filterName: 'Nome del filtro',
            cancel: 'Annulla',
            save: 'Salva',
        }
    },
    pt: {
        spartan: {
            filterNameIsRequired: 'O nome do filtro é obrigatório',
            noFiltersSelected: 'Nenhum filtro selecionado',
            filterName: 'Nome do filtro',
            cancel: 'Cancelar',
            save: 'Salvar',
        }
    },
  },
});
</script>

<template>
    <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <div>
                <PopoverPanel v-slot="{close}" class="absolute right-0 flex flex-col max-w-xs gap-4 p-4 mt-2 overflow-hidden origin-bottom-right bg-white rounded-lg shadow-lg md:max-w-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <label class="font-semibold leading-none">{{ t('spartan.filterName') }}</label>

                    <div>
                        <SInput v-model="name" :invalid="Boolean(messageValidation)" />
                        <SInputError v-if="messageValidation" :message="t(messageValidation)"/>
                    </div>

                    <div class="flex gap-3">
                        <SButton color="white" @click="handleCancel(close)">{{t('spartan.cancel')}}</SButton>
                        <SButton color="primary" @click="handleSaveFilter(close)">{{t('spartan.save')}}</SButton>
                    </div>
                </PopoverPanel>
            </div>
        </transition>
</template>