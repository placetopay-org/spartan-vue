<script setup lang="ts">
const { component, category, slug } = defineProps<{
    /** Parent component name (e.g. "SModal") */
    component: string;
    /** Route category folder (e.g. "modals", "data-input") */
    category: string;
    /** Route slug (e.g. "modal", "input") */
    slug: string;
}>();

const route = useRoute();
const locale = computed(() => (route.path.startsWith('/es') ? 'es' : 'en'));
const href = computed(() => `/${locale.value}/components/${category}/${slug}#props`);
const label = computed(() => (locale.value === 'es' ? 'Ver' : 'View'));
</script>

<template>
    <div
        class="my-6 flex items-start gap-3 rounded-lg border-l-4 border-blue-500 bg-blue-50 px-4 py-3 dark:border-blue-400 dark:bg-blue-950/50"
    >
        <UIcon name="i-lucide-arrow-up-right" class="mt-0.5 size-5 shrink-0 text-blue-500 dark:text-blue-400" />
        <div class="min-w-0 flex-1">
            <p class="text-sm text-blue-900 dark:text-blue-100">
                <slot />
            </p>
        </div>
        <a
            :href="href"
            class="inline-flex shrink-0 items-center gap-1 rounded-md bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
        >
            {{ label }} {{ component }}
            <UIcon name="i-lucide-external-link" class="size-3" />
        </a>
    </div>
</template>
