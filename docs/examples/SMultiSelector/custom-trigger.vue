<script setup lang="ts">
import { ref } from 'vue';
import { GlobalIcon } from '@placetopay/iconsax-vue/bold';
import { usePreview } from '~/composables/usePreview';

const selected = ref<number[]>([]);
const options = [
    { id: 1, name: 'Colombia', flag: '🇨🇴' },
    { id: 2, name: 'México', flag: '🇲🇽' },
    { id: 3, name: 'Chile', flag: '🇨🇱' },
    { id: 4, name: 'Perú', flag: '🇵🇪' },
];

usePreview({ component: 'SMultiSelector' });
</script>

<template>
    <SMultiSelector
        v-model="selected"
        :options="options"
        option-label="name"
        option-value="id"
        placeholder="Select countries"
    >
        <template #trigger="{ options: selectedOptions, placeholder }">
            <span v-if="selectedOptions.length" class="flex items-center gap-2 overflow-hidden text-nowrap">
                <span
                    v-for="option in selectedOptions"
                    :key="option.id"
                    aria-hidden="true"
                    class="text-base leading-none"
                >
                    {{ option.flag }}
                </span>
                <span class="truncate">
                    {{ selectedOptions.map((option) => option.name).join(', ') }}
                </span>
            </span>
            <span v-else class="flex items-center gap-2 text-nowrap text-gray-400">
                <GlobalIcon class="h-4 w-4" />
                {{ placeholder }}
            </span>
        </template>
        <template #option="{ option }">
            <span class="flex items-center gap-2">
                <span aria-hidden="true">{{ option?.flag }}</span>
                <span>{{ option?.name }}</span>
            </span>
        </template>
    </SMultiSelector>
</template>
