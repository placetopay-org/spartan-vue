<script setup>
import { ref } from 'vue';
import { PopoverPanel } from '@headlessui/vue';
import SInput from '../SInput.vue';
import SInputError from '../SInputError.vue';
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
                <PopoverPanel v-slot="{close}" class="p-4 absolute overflow-hidden flex flex-col gap-4 right-0 mt-2 max-w-xs md:max-w-md origin-bottom-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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