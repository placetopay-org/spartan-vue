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
            <h1 class="text-2xl font-bold text-gray-900">{{ title }}</h1>

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
