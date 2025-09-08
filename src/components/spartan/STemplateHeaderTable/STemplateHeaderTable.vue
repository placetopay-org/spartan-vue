<script setup lang="ts">
import type { TTableWithSearchProps } from './types';

defineProps<TTableWithSearchProps>();
</script>

<template>
    <a
        v-bind="$attrs"
        class="cursor-pointer font-medium hover:text-gray-700 hover:underline"
    >
        <slot />
    </a>
<STemplateHeaderTable>
    <template>
        <SButton>
            <template #icon>
                <MagnifyingGlassIcon />
            </template>
        </SButton>
    </template>
</STemplateHeaderTable>
</template>