<script lang="ts">
/**
 * A template header for tables that includes a title and a search input with button.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/STemplateHeaderTable Github}.
 * @see {@link https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=4809-17871 Figma}.
 */
export default {
    name: 'STemplateHeaderTable',
};
</script>

<script setup lang="ts">
import type { TTemplateHeaderTableProps, TTemplateHeaderTableEmits } from './types';
import { translator } from '@/helpers';
import { ref } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { SInput, SButton } from '@spartan';

const emit = defineEmits<TTemplateHeaderTableEmits>();

defineProps<TTemplateHeaderTableProps>();

const { t } = translator('templateHeaderTable');

const query = ref('');

const search = () => {
    emit('search', query.value);
};
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between gap-4">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ title }}</h1>

            <div class="flex -space-x-px">
                <SInput
                    v-model="query"
                    placeholder="Find your product..."
                    rounded="left"
                    required
                    @keyup.enter="search"
                />
                <SButton rounded="right" :icon="MagnifyingGlassIcon" @click="search">{{ t('search') }}</SButton>
            </div>
        </div>

        <slot name="table" />
    </div>
</template>
