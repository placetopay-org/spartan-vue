<script setup lang="ts">
import { SDropdownItem } from '../SDropdown';
import { useContext } from './api';
import type { TTabDropdownItemProps } from './types';

const { path } = defineProps<TTabDropdownItemProps>();
const context = useContext('STabDropdownItem');
</script>

<template>
    <SDropdownItem :data-item-path="path" @click="() => context.updateTab(path)">
        <slot />
    </SDropdownItem>
</template>
