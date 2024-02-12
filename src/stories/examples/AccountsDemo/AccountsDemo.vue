<script setup lang="ts">
import { ref } from 'vue';
import { SPlacetopayLogo, STab, STabItem } from '../../../';

const tab = ref('login');
</script>

<template>
    <main class="flex bg-blue-500 h-full w-full">
        <img class="w-full h-full" src="./bento-grid.png" alt="bento grid">
        
        <section class="px-16 flex flex-col justify-center items-center w-1/3">
            <SPlacetopayLogo />

            <STab v-model="tab">
                <STabItem>Ingresar</STabItem>
                <STabItem>Soy nuevo</STabItem>
            </STab>
        </section>
    </main>
</template>
