<script setup lang="ts">
import { computed, inject, onMounted, ref, watch } from 'vue';
import { SDropdownItem } from '../SDropdown';
import { useContext } from './api';
import type { TDropdownContextKey, TTabDropdownItemProps } from './types';

const { path, regex } = defineProps<TTabDropdownItemProps>();
const context = useContext('STabDropdownItem');

const el = ref<HTMLElement>();
const vPath = ref(path || '');
const vRegex = computed(() => regex || new RegExp(`^${vPath.value}$`));
const dropdown = inject<TDropdownContextKey>('dropdown');

onMounted(() => {
    const elInnerText = el.value?.innerText;
    if (!vPath.value && elInnerText) vPath.value = elInnerText;
});

watch(
    dropdown!,
    (value) => {
        if (value) context.addDropdown(value, vRegex.value);
    },
    { immediate: true },
);
</script>

<template>
    <div ref="el">
        <SDropdownItem :data-item-path="vPath" @click="() => context.updateModelValue(vPath)">
            <slot />
        </SDropdownItem>
    </div>
</template>
