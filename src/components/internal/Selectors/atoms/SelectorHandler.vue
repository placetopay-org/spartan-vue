<script setup lang="ts">
import { type ShallowRef } from 'vue';
import { SBadge } from '@spartan';
import { translator } from '@/helpers';
import { AddIcon } from '@placetopay/iconsax-vue/linear';

defineEmits<{
    (e: 'add'): void;
}>();

const { t } = translator('selector');
</script>

<template>
    <div class="border-t border-gray-950/5 p-2.5 overflow-auto">
        <button @click="$emit('add')">
            <SBadge as="button" pt:content="flex gap-1 items-center" pill>
                <AddIcon class="h-4 w-4 text-gray-400" />
                <span>{{ t('add') }}</span>
            </SBadge>
        </button>
    </div>
</template>
