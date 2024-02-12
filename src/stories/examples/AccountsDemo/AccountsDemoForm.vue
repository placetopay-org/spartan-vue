<script setup lang="ts">
import { ref } from 'vue';
import { SPlacetopayLogo, STab, STabItem, SInputBlock, SButton } from '../../../';
import 'https://rsms.me/inter/inter.css';

const tab = ref('Ingresar');
</script>

<template>
    <form class="mx-auto flex h-full w-[512px] flex-col items-center justify-center bg-blue-200 px-16">
        <SPlacetopayLogo class="mb-8" />

        <STab v-model="tab" underline-full class="mb-6 w-full">
            <STabItem>Ingresar</STabItem>
            <STabItem>Soy nuevo</STabItem>
        </STab>

        <div class="flex w-full flex-col gap-6">
            <SInputBlock label="Correo electrónico" placeholder="tuemail@ejemplo.com" />
            <SInputBlock label="Contraseña" />

            <a class="text-center text-xs font-medium text-gray-400">¿Olvidaste tu contraseña?</a>
            <SButton class="w-full">Ingresar</SButton>

            <p class="text-xs text-gray-400 font-normal">
                Al continuar acepto las políticas aplicables para el tratamiento de mis datos personales según la
                jurisdicción local del responsable y de <strong class="text-gray-500 font-semibold">Evertec PlacetoPay</strong> en su calidad de encargado.
            </p>
        </div>
    </form>
</template>

<style scoped>
form {
  font-family: 'Inter', sans-serif;
  font-feature-settings: 'liga' 1, 'calt' 1; /* fix for Chrome */
}
</style>
