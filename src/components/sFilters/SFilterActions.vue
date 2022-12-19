<script setup>
import SBadge from '../SBadge.vue';
import { useSFilterContext } from './SFilterContext';

const api = useSFilterContext();
</script>

<template>
    <div class="flex flex-row gap-1">
        <SBadge as="button" size="lg" color="primary" class="bg-primary-500 px-6 text-white" @click="api.applyFilters">Aplicar filtros</SBadge>
        <SBadge as="button" size="lg" class="px-6 border border-gray-300" color="white" @click="api.removeFilters">Borrar filtros</SBadge>
    </div>
</template>