<script setup lang="ts">
import { SDropdownItem } from '../SDropdown';
import { useContext } from './api';

const { path } = defineProps<{ path: string }>();
const context = useContext('STabDropdownItem');
</script>

<template>
    <SDropdownItem  :data-item-path="path" @click="() => context.updateTab(path)">
        <slot />
    </SDropdownItem>
</template>
