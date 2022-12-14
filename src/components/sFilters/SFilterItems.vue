<script setup>
import { computed } from 'vue';
import {useSFilterContext} from './SFilterContext';
import SFilterAddItem from './SFilterAddItem.vue';
import SFilterItem from './SFilterItem.vue';

const api = useSFilterContext();
const filters = computed(() => api.filters);
</script>

<template>
    <ul class="flex gap-3 flex-wrap">
        <li v-for="filter in filters" :key="filter.id">
            <SFilterItem :filter="filter"/>
        </li>
        <li>
            <SFilterAddItem />
        </li>
    </ul>
</template>