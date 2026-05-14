<script setup lang="ts">
import { ref } from 'vue';
import { GlobalIcon } from '@placetopay/iconsax-vue/bold';
import { usePreview } from '~/composables/usePreview';

const selected = ref<number>();
const options = [
    { id: 1, name: 'Colombia', flag: '🇨🇴' },
    { id: 2, name: 'México', flag: '🇲🇽' },
    { id: 3, name: 'Chile', flag: '🇨🇱' },
    { id: 4, name: 'Perú', flag: '🇵🇪' },
];

usePreview({ component: 'SSelector' });
</script>

<template>
    <SSelector
        v-model="selected"
        :options="options"
        option-label="name"
        option-value="id"
        placeholder="Select a country"
    >
        <template #trigger="{ option, placeholder }">
            <span v-if="option" class="flex items-center gap-2 text-nowrap">
                <span aria-hidden="true">{{ option.flag }}</span>
                <span>{{ option.name }}</span>
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
    </SSelector>
</template>
