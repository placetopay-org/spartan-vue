<script setup>
import { ref } from 'vue';
import { PopoverPanel } from '@headlessui/vue';
import { SInput, SInputError } from '../sInputs';
import SButton from '../SButton.vue';
import { useSFilterContext } from './SFilterContext';

const api = useSFilterContext();
const name = ref('');
const messageValidation = ref(null);

const validate = () => {
    if (!name.value) {
        messageValidation.value = 'El nombre del filtro es requerido';
        return false;
    }

    if (api.filters.length === 0) {
        messageValidation.value = 'No hay filtros seleccionados';
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
                    <label class="font-semibold leading-none">Nombre del filtro</label>

                    <div>
                        <SInput v-model="name" :invalid="Boolean(messageValidation)" />
                        <SInputError :message="messageValidation"/>
                    </div>

                    <div class="flex gap-3">
                        <SButton color="white" @click="handleCancel(close)">Cancelar</SButton>
                        <SButton color="primary" @click="handleSaveFilter(close)">Guardar</SButton>
                    </div>
                </PopoverPanel>
            </div>
        </transition>
</template>