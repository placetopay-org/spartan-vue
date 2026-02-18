<script setup lang="ts">
import VChart from 'vue-echarts';
import { ref, computed, onMounted, nextTick } from 'vue';
import { components } from '~/data/componentStatus';
import type { ComponentStatusData } from '~/data/componentStatus';
import TypescriptIcon from '~/assets/svg/typescript.svg';
import FigmaIcon from '~/assets/svg/figma.svg';

const copiedName = ref<string | null>(null);

function getComponentSummary(comp: ComponentStatusData): string {
    const check = (v: boolean) => (v ? '✔️' : '❌');
    return [
        `${check(comp.typescript)} Compatible con typescript`,
        `${check(comp.darkMode)} Compatible con dark mode`,
        `${check(comp.responsive)} Diseño responsive`,
        `${check(comp.tests > 0)} Tests`,
        `${check(comp.tests >= 80)} Coverage >= 80%`,
        `${check(comp.docs === 'complete')} Documentación`,
        `${check(!!comp.figmaLink)} Figma Link`,
        `${check(!comp.improvements.en)} Actualizado (sin mejoras pendientes)`,
    ].join('\n');
}

async function copySummary(comp: ComponentStatusData) {
    const text = getComponentSummary(comp);
    await navigator.clipboard.writeText(text);
    copiedName.value = comp.name;
    setTimeout(() => {
        if (copiedName.value === comp.name) copiedName.value = null;
    }, 2000);
}

const ready = ref(false);
onMounted(() => {
    nextTick(() => {
        requestAnimationFrame(() => {
            ready.value = true;
        });
    });
});

const route = useRoute();
const isEs = computed(() => route.path.startsWith('/es'));

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');

const textColor = computed(() => (isDark.value ? '#e5e7eb' : '#374151'));
const subtextColor = computed(() => (isDark.value ? '#9ca3af' : '#6b7280'));
const bgColor = computed(() => 'transparent');
const splitLineColor = computed(() => (isDark.value ? '#374151' : '#e5e7eb'));

// Component data organized by category
const categories = computed(() =>
    isEs.value
        ? {
              dataInput: 'Entrada de datos',
              selectors: 'Selectores',
              display: 'Visualización',
              modals: 'Modales',
              structure: 'Estructura',
              utilities: 'Utilidades',
              typography: 'Tipografía',
          }
        : {
              dataInput: 'Data Input',
              selectors: 'Selectors',
              display: 'Display',
              modals: 'Modals',
              structure: 'Structure',
              utilities: 'Utilities',
              typography: 'Typography',
          },
);

// Summary calculations
const totalComponents = components.length;
const tsCount = components.filter((c) => c.typescript).length;
const darkModeCount = components.filter((c) => c.darkMode).length;
const responsiveCount = components.filter((c) => c.responsive).length;
const testsHighCount = components.filter((c) => c.tests >= 80).length;
const testsMidCount = components.filter((c) => c.tests > 0 && c.tests < 80).length;
const testsNoneCount = components.filter((c) => c.tests === 0).length;
const figmaCount = components.filter((c) => !!c.figmaLink).length;
const docsCompleteCount = components.filter((c) => c.docs === 'complete').length;
const docsPartialCount = components.filter((c) => c.docs === 'partial').length;
const docsMinimalCount = components.filter((c) => c.docs === 'minimal').length;

const tsPercent = Math.round((tsCount / totalComponents) * 100);
const darkModePercent = Math.round((darkModeCount / totalComponents) * 100);
const responsivePercent = Math.round((responsiveCount / totalComponents) * 100);
const avgTests = Math.round(components.reduce((sum, c) => sum + c.tests, 0) / totalComponents);
const figmaPercent = Math.round((figmaCount / totalComponents) * 100);

// Weighted docs: complete=100%, partial=50%, minimal=0%
function docsWeight(doc: string) {
    return doc === 'complete' ? 100 : doc === 'partial' ? 50 : 0;
}
const docsPercent = Math.round(components.reduce((sum, c) => sum + docsWeight(c.docs), 0) / totalComponents);

// Per-category stats
function categoryStats(catKey: string) {
    const catComponents = components.filter((c) => c.category === catKey);
    const total = catComponents.length;
    return {
        total,
        ts: Math.round((catComponents.filter((c) => c.typescript).length / total) * 100),
        dark: Math.round((catComponents.filter((c) => c.darkMode).length / total) * 100),
        responsive: Math.round((catComponents.filter((c) => c.responsive).length / total) * 100),
        tests: Math.round(catComponents.reduce((s, c) => s + c.tests, 0) / total),
        figma: Math.round((catComponents.filter((c) => !!c.figmaLink).length / total) * 100),
        docs: Math.round(catComponents.reduce((s, c) => s + docsWeight(c.docs), 0) / total),
    };
}

const catKeys = ['dataInput', 'selectors', 'display', 'modals', 'structure', 'utilities', 'typography'];

const categorySlugMap: Record<string, string> = {
    dataInput: 'data-input',
    selectors: 'selectors',
    display: 'display',
    modals: 'modals',
    structure: 'structure',
    utilities: 'utilities',
    typography: 'typography',
};

// ---- Chart Options ----

// 1. Radar chart: overall feature coverage
const radarOption = computed(() => ({
    backgroundColor: bgColor.value,
    title: {
        text: isEs.value ? 'Cobertura General' : 'Overall Coverage',
        left: 'center',
        top: 10,
        textStyle: { color: textColor.value, fontSize: 16, fontWeight: 600 },
    },
    tooltip: {
        trigger: 'item',
        backgroundColor: isDark.value ? '#1f2937' : '#ffffff',
        borderColor: isDark.value ? '#374151' : '#e5e7eb',
        textStyle: { color: textColor.value },
    },
    radar: {
        indicator: [
            { name: 'TypeScript', max: 100 },
            { name: 'Dark Mode', max: 100 },
            { name: 'Responsive', max: 100 },
            { name: 'Tests', max: 100 },
            { name: 'Figma', max: 100 },
            { name: isEs.value ? 'Documentación' : 'Documentation', max: 100 },
        ],
        shape: 'polygon',
        splitNumber: 5,
        axisName: {
            color: textColor.value,
            fontSize: 12,
            fontWeight: 500,
        },
        splitArea: {
            areaStyle: {
                color: isDark.value
                    ? ['rgba(99,102,241,0.05)', 'rgba(99,102,241,0.1)', 'rgba(99,102,241,0.05)', 'rgba(99,102,241,0.1)']
                    : ['rgba(99,102,241,0.02)', 'rgba(99,102,241,0.06)', 'rgba(99,102,241,0.02)', 'rgba(99,102,241,0.06)'],
            },
        },
        splitLine: { lineStyle: { color: splitLineColor.value } },
        axisLine: { lineStyle: { color: splitLineColor.value } },
    },
    series: [
        {
            type: 'radar',
            data: [
                {
                    value: [tsPercent, darkModePercent, responsivePercent, avgTests, figmaPercent, docsPercent],
                    name: isEs.value ? 'Estado Actual' : 'Current Status',
                    areaStyle: {
                        color: isDark.value ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)',
                    },
                    lineStyle: { color: '#6366f1', width: 2 },
                    itemStyle: { color: '#6366f1' },
                },
                {
                    value: [100, 100, 100, 100, 100, 100],
                    name: isEs.value ? 'Objetivo' : 'Target',
                    areaStyle: {
                        color: isDark.value ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.05)',
                    },
                    lineStyle: { color: '#10b981', width: 1, type: 'dashed' },
                    itemStyle: { color: '#10b981' },
                },
            ],
        },
    ],
}));

// 2. Bar chart: per-category breakdown
const barOption = computed(() => {
    const catLabels = catKeys.map((k) => categories.value[k as keyof typeof categories.value]);
    const stats = catKeys.map((k) => categoryStats(k));

    return {
        backgroundColor: bgColor.value,
        title: {
            text: isEs.value ? 'Progreso por Categoría' : 'Progress by Category',
            left: 'center',
            top: 10,
            textStyle: { color: textColor.value, fontSize: 16, fontWeight: 600 },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            backgroundColor: isDark.value ? '#1f2937' : '#ffffff',
            borderColor: isDark.value ? '#374151' : '#e5e7eb',
            textStyle: { color: textColor.value },
        },
        legend: {
            bottom: 0,
            textStyle: { color: subtextColor.value, fontSize: 11 },
            itemWidth: 12,
            itemHeight: 12,
            itemGap: 16,
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            top: '18%',
        },
        xAxis: {
            type: 'category',
            data: catLabels,
            axisLabel: { color: subtextColor.value, fontSize: 11, interval: 0, rotate: 20 },
            axisLine: { lineStyle: { color: splitLineColor.value } },
            axisTick: { show: false },
        },
        yAxis: {
            type: 'value',
            max: 100,
            axisLabel: { color: subtextColor.value, formatter: '{value}%' },
            splitLine: { lineStyle: { color: splitLineColor.value, type: 'dashed' } },
        },
        series: [
            {
                name: 'TypeScript',
                type: 'bar',
                data: stats.map((s) => s.ts),
                itemStyle: { color: '#3178c6', borderRadius: [3, 3, 0, 0] },
                barGap: '10%',
            },
            {
                name: 'Dark Mode',
                type: 'bar',
                data: stats.map((s) => s.dark),
                itemStyle: { color: '#8b5cf6', borderRadius: [3, 3, 0, 0] },
            },
            {
                name: 'Responsive',
                type: 'bar',
                data: stats.map((s) => s.responsive),
                itemStyle: { color: '#06b6d4', borderRadius: [3, 3, 0, 0] },
            },
            {
                name: 'Tests',
                type: 'bar',
                data: stats.map((s) => s.tests),
                itemStyle: { color: '#f59e0b', borderRadius: [3, 3, 0, 0] },
            },
            {
                name: 'Figma',
                type: 'bar',
                data: stats.map((s) => s.figma),
                itemStyle: { color: '#a259ff', borderRadius: [3, 3, 0, 0] },
            },
            {
                name: isEs.value ? 'Docs' : 'Docs',
                type: 'bar',
                data: stats.map((s) => s.docs),
                itemStyle: { color: '#10b981', borderRadius: [3, 3, 0, 0] },
            },
        ],
    };
});

// 3. Gauge charts: overall progress for each dimension
function makeGauge(title: string, value: number, color: string) {
    return computed(() => ({
        backgroundColor: bgColor.value,
        series: [
            {
                type: 'gauge',
                startAngle: 220,
                endAngle: -40,
                min: 0,
                max: 100,
                radius: '85%',
                progress: {
                    show: true,
                    width: 10,
                    roundCap: true,
                    itemStyle: { color },
                },
                pointer: { show: false },
                axisLine: {
                    lineStyle: {
                        width: 10,
                        color: [[1, isDark.value ? '#374151' : '#e5e7eb']],
                    },
                },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                title: {
                    offsetCenter: [0, '65%'],
                    fontSize: 10,
                    fontWeight: 500,
                    color: textColor.value,
                },
                detail: {
                    offsetCenter: [0, '15%'],
                    fontSize: 18,
                    fontWeight: 700,
                    color,
                    formatter: '{value}%',
                },
                data: [{ value, name: title }],
            },
        ],
    }));
}

const gaugeTs = makeGauge('TypeScript', tsPercent, '#3178c6');
const gaugeDark = makeGauge('Dark Mode', darkModePercent, '#8b5cf6');
const gaugeResponsive = makeGauge('Responsive', responsivePercent, '#06b6d4');
const gaugeTests = makeGauge('Tests', avgTests, '#f59e0b');
const gaugeFigma = makeGauge('Figma', figmaPercent, '#a259ff');
const gaugeDocs = makeGauge(isEs.value ? 'Docs' : 'Docs', docsPercent, '#10b981');

// Summary stats for the cards
const summaryStats = computed(() => [
    {
        label: 'TypeScript',
        value: tsPercent,
        count: `${tsCount}/${totalComponents}`,
        color: 'text-[#3178c6]',
        bg: 'bg-[#3178c6]/10',
        border: 'border-[#3178c6]/20',
    },
    {
        label: 'Dark Mode',
        value: darkModePercent,
        count: `${darkModeCount}/${totalComponents}`,
        color: 'text-violet-500',
        bg: 'bg-violet-500/10',
        border: 'border-violet-500/20',
    },
    {
        label: 'Responsive',
        value: responsivePercent,
        count: `${responsiveCount}/${totalComponents}`,
        color: 'text-cyan-500',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/20',
    },
    {
        label: 'Tests',
        value: avgTests,
        count: `${testsHighCount}✓ ${testsMidCount}~ ${testsNoneCount}✗`,
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
    },
    {
        label: 'Figma',
        value: figmaPercent,
        count: `${figmaCount}/${totalComponents}`,
        color: 'text-[#a259ff]',
        bg: 'bg-[#a259ff]/10',
        border: 'border-[#a259ff]/20',
    },
    {
        label: isEs.value ? 'Documentación' : 'Documentation',
        value: docsPercent,
        count: `${docsCompleteCount}✓ ${docsPartialCount}~ ${docsMinimalCount}✗`,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
    },
]);
</script>

<template>
    <div class="space-y-10">
        <!-- Summary Cards -->
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <div
                v-for="stat in summaryStats"
                :key="stat.label"
                class="rounded-xl border p-4 transition-all dark:border-gray-700/60 dark:bg-gray-800/40"
                :class="[stat.border]"
            >
                <div class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                    {{ stat.label }}
                </div>
                <div class="text-2xl font-bold" :class="stat.color">
                    {{ stat.value }}%
                </div>
                <div class="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    {{ stat.count }} {{ isEs ? 'componentes' : 'components' }}
                </div>
                <div class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                        class="h-full rounded-full transition-all duration-700"
                        :class="stat.bg.replace('/10', '')"
                        :style="{ width: `${stat.value}%` }"
                    />
                </div>
            </div>
        </div>

        <!-- Radar + Gauges Row -->
        <div class="grid gap-6 lg:grid-cols-2">
            <!-- Radar Chart -->
            <div class="rounded-xl border border-gray-200 p-4 dark:border-gray-700/60 dark:bg-gray-800/40">
                <ClientOnly>
                    <VChart v-if="ready" style="width: 100%; height: 320px" :option="radarOption" autoresize />
                </ClientOnly>
            </div>

            <!-- Gauge Charts Grid -->
            <div class="rounded-xl border border-gray-200 p-4 dark:border-gray-700/60 dark:bg-gray-800/40">
                <h3 class="mb-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {{ isEs ? 'Indicadores por Dimensión' : 'Dimension Indicators' }}
                </h3>
                <div class="grid grid-cols-3 gap-2">
                    <ClientOnly>
                        <VChart v-if="ready" style="width: 100%; height: 144px" :option="gaugeTs" autoresize />
                        <VChart v-if="ready" style="width: 100%; height: 144px" :option="gaugeDark" autoresize />
                        <VChart v-if="ready" style="width: 100%; height: 144px" :option="gaugeResponsive" autoresize />
                    </ClientOnly>
                </div>
                <div class="mt-2 grid grid-cols-3 gap-2">
                    <ClientOnly>
                        <VChart v-if="ready" style="width: 100%; height: 144px" :option="gaugeTests" autoresize />
                        <VChart v-if="ready" style="width: 100%; height: 144px" :option="gaugeFigma" autoresize />
                        <VChart v-if="ready" style="width: 100%; height: 144px" :option="gaugeDocs" autoresize />
                    </ClientOnly>
                </div>
            </div>
        </div>

        <!-- Bar Chart -->
        <div class="rounded-xl border border-gray-200 p-4 dark:border-gray-700/60 dark:bg-gray-800/40">
            <ClientOnly>
                <VChart v-if="ready" style="width: 100%; height: 384px" :option="barOption" autoresize />
            </ClientOnly>
        </div>

        <!-- Component Matrix Table -->
        <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700/60 dark:bg-gray-800/40">
            <table class="w-full text-left text-sm">
                <thead>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                        <th class="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">
                            {{ isEs ? 'Componente' : 'Component' }}
                        </th>
                        <th class="w-8 px-1 py-3"></th>
                        <th class="px-3 py-3">
                            <UTooltip text="TypeScript">
                                <div class="flex justify-center"><TypescriptIcon class="size-4" /></div>
                            </UTooltip>
                        </th>
                        <th class="px-3 py-3">
                            <UTooltip text="Figma">
                                <div class="flex justify-center"><FigmaIcon class="h-4 w-auto" /></div>
                            </UTooltip>
                        </th>
                        <th class="px-3 py-3">
                            <UTooltip text="Dark Mode">
                                <div class="flex justify-center"><UIcon name="i-mdi-theme-light-dark" class="size-4 text-yellow-400" /></div>
                            </UTooltip>
                        </th>
                        <th class="px-3 py-3">
                            <UTooltip text="Responsive">
                                <div class="flex justify-center"><UIcon name="i-lucide-monitor-smartphone" class="size-4 text-cyan-500" /></div>
                            </UTooltip>
                        </th>
                        <th class="px-3 py-3">
                            <UTooltip text="Tests">
                                <div class="flex justify-center"><UIcon name="i-lucide-flask-conical" class="size-4 text-amber-500" /></div>
                            </UTooltip>
                        </th>
                        <th class="px-3 py-3">
                            <UTooltip :text="isEs ? 'Documentación' : 'Documentation'">
                                <div class="flex justify-center"><UIcon name="i-lucide-book-open-text" class="size-4 text-emerald-500" /></div>
                            </UTooltip>
                        </th>
                        <th class="px-3 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="catKey in catKeys" :key="catKey">
                        <tr class="bg-gray-50 dark:bg-gray-800/80">
                            <td
                                colspan="9"
                                class="px-4 py-2 text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400"
                            >
                                {{ categories[catKey as keyof typeof categories] }}
                            </td>
                        </tr>
                        <tr
                            v-for="comp in components.filter((c) => c.category === catKey)"
                            :key="comp.name"
                            class="border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50"
                        >
                            <td class="px-4 py-2.5 font-mono text-xs font-medium">
                                <NuxtLink
                                    :to="`${isEs ? '/es' : '/en'}/components/${categorySlugMap[comp.category]}/${comp.slug}`"
                                    class="text-gray-700 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                                >
                                    {{ comp.name }}
                                </NuxtLink>
                            </td>
                            <td class="w-8 px-1 py-2.5 text-center">
                                <UPopover v-if="comp.improvements.en" mode="hover">
                                    <UIcon name="i-lucide-triangle-alert" class="size-4 text-amber-500 cursor-help" />
                                    <template #content>
                                        <div class="p-3 max-w-xs">
                                            <p class="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
                                                {{ isEs ? 'Mejoras pendientes' : 'Pending improvements' }}
                                            </p>
                                            <p class="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-line">{{ isEs ? comp.improvements.es : comp.improvements.en }}</p>
                                        </div>
                                    </template>
                                </UPopover>
                            </td>
                            <td class="px-3 py-2.5 text-center">
                                <span
                                    class="inline-flex size-5 items-center justify-center rounded-full text-xs"
                                    :class="comp.typescript ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-red-100 text-red-500 dark:bg-red-900/40 dark:text-red-400'"
                                >
                                    {{ comp.typescript ? '✓' : '✗' }}
                                </span>
                            </td>
                            <td class="px-3 py-2.5 text-center">
                                <span
                                    class="inline-flex size-5 items-center justify-center rounded-full text-xs"
                                    :class="comp.figmaLink ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-red-100 text-red-500 dark:bg-red-900/40 dark:text-red-400'"
                                >
                                    {{ comp.figmaLink ? '✓' : '✗' }}
                                </span>
                            </td>
                            <td class="px-3 py-2.5 text-center">
                                <span
                                    class="inline-flex size-5 items-center justify-center rounded-full text-xs"
                                    :class="comp.darkMode ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-red-100 text-red-500 dark:bg-red-900/40 dark:text-red-400'"
                                >
                                    {{ comp.darkMode ? '✓' : '✗' }}
                                </span>
                            </td>
                            <td class="px-3 py-2.5 text-center">
                                <span
                                    class="inline-flex size-5 items-center justify-center rounded-full text-xs"
                                    :class="comp.responsive ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-red-100 text-red-500 dark:bg-red-900/40 dark:text-red-400'"
                                >
                                    {{ comp.responsive ? '✓' : '✗' }}
                                </span>
                            </td>
                            <td class="px-3 py-2.5 text-center">
                                <div class="flex items-center justify-center gap-1.5">
                                    <div class="h-1.5 w-10 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                        <div
                                            class="h-full rounded-full transition-all"
                                            :class="comp.tests >= 70 ? 'bg-emerald-500' : comp.tests >= 40 ? 'bg-amber-500' : 'bg-red-500'"
                                            :style="{ width: `${comp.tests}%` }"
                                        />
                                    </div>
                                    <span class="w-8 text-right text-[10px] font-semibold tabular-nums text-gray-500 dark:text-gray-400">
                                        {{ comp.tests }}%
                                    </span>
                                </div>
                            </td>
                            <td class="px-3 py-2.5 text-center">
                                <UIcon
                                    :name="comp.docs === 'complete' ? 'i-fa6-regular-face-smile' : comp.docs === 'partial' ? 'i-fa6-regular-face-meh' : 'i-fa6-regular-face-frown'"
                                    class="size-5"
                                    :class="comp.docs === 'complete' ? 'text-emerald-500' : comp.docs === 'partial' ? 'text-amber-500' : 'text-red-500'"
                                />
                            </td>
                            <td class="px-3 py-2.5 text-center">
                                <button
                                    :title="isEs ? 'Copiar resumen' : 'Copy summary'"
                                    class="inline-flex size-7 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                    @click="copySummary(comp)"
                                >
                                    <svg v-if="copiedName !== comp.name" xmlns="http://www.w3.org/2000/svg" class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="size-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>
