<script setup lang="ts">
import { ref } from 'vue';
import { SPlacetopayLogo, STab, STabItem, SInputBlock, SButton } from '../../../';

const tab = ref('Ingresar');
</script>

<template>
    <form class="flex h-full w-[512px] flex-col items-center justify-center bg-white px-16">
        <SPlacetopayLogo class="mb-8" :height="32" />

        <STab v-model="tab" full class="mb-6 w-full">
            <STabItem>Ingresar</STabItem>
            <STabItem>Soy nuevo</STabItem>
        </STab>

        <div class="flex w-full flex-col gap-6">
            <SInputBlock label="Correo electrónico" placeholder="tuemail@ejemplo.com" />
            <SInputBlock label="Contraseña" type="password" />

            <a class="text-center text-xs font-medium text-gray-400">¿Olvidaste tu contraseña?</a>
            <SButton class="w-full">Ingresar</SButton>

            <p class="text-xs font-normal text-gray-400">
                Al continuar acepto las políticas aplicables para el tratamiento de mis datos personales según la
                jurisdicción local del responsable y de
                <strong class="font-semibold text-gray-500">Evertec PlacetoPay</strong> en su calidad de encargado.
            </p>
        </div>
    </form>
</template>
