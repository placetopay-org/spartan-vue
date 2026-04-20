<script setup lang="ts">
import { ref } from 'vue';

const documentTypes = [
    { code: 'CC', label: 'Cédula de ciudadanía' },
    { code: 'CE', label: 'Cédula de extranjería' },
    { code: 'TI', label: 'Tarjeta de identidad' },
    { code: 'NIT', label: 'NIT' },
    { code: 'PAS', label: 'Pasaporte' },
];

const identification = ref<{ type: string | undefined; number: string }>({
    type: undefined,
    number: '',
});
</script>

<template>
    <div class="w-full max-w-md">
        <SLabel for="document-number">Documento de identidad</SLabel>
        <div class="flex items-stretch">
            <SSelector
                v-model="identification.type"
                :options="documentTypes"
                option-label="code"
                option-value="code"
                placeholder="Tipo"
                rounded="left"
                class="w-24 shrink-0"
            />
            <SInput
                id="document-number"
                v-model="identification.number"
                placeholder="Número"
                rounded="right"
                class="flex-1"
            />
        </div>
    </div>
</template>
