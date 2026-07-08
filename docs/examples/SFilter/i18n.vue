<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePreview } from '~/composables/usePreview';

// Inline messages for this example. In a real app these live in your locale
// files (or are merged via `vue-i18n` / `@nuxtjs/i18n`).
const { t, locale } = useI18n({
    inheritLocale: true,
    messages: {
        en: {
            statusLabel: 'Status',
            statusActive: 'Active',
            statusInactive: 'Inactive',
            customOp: 'Default value',
        },
        es: {
            statusLabel: 'Estado',
            statusActive: 'Activo',
            statusInactive: 'Inactivo',
            customOp: 'Valor por defecto',
        },
    },
});

// `filters` is a `computed` so that when `locale` changes, every label
// (field labels, choice labels, custom operator labels) re-renders.
const filters = computed(() => ({
    status: {
        type: 'options',
        label: t('statusLabel'),
        choices: [
            { id: 'active', label: t('statusActive') },
            { id: 'inactive', label: t('statusInactive') },
        ],
        operators: ['equal', 'notEqual'],
        customOperators: [{ id: 'auto', label: t('customOp'), inputs: 0, tag: t('customOp') }],
    },
}));

const value = ref({
    status: { operator: 'equal', value: 'active' },
});

usePreview({ component: 'SFilter' });

// Demo helper: toggle the locale so the user can see the labels update live.
const toggleLocale = () => {
    locale.value = locale.value === 'es' ? 'en' : 'es';
};
</script>

<template>
    <div class="flex flex-col gap-4">
        <SFilter v-model="value" :filters="filters" />
        <button
            class="self-start rounded-full border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-white/10"
            @click="toggleLocale"
        >
            Locale: {{ locale }} → toggle
        </button>
    </div>
</template>
