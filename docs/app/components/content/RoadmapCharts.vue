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
          }
        : {
              dataInput: 'Data Input',
              selectors: 'Selectors',
              display: 'Display',
              modals: 'Modals',
              structure: 'Structure',
              utilities: 'Utilities',
          },
);

// Summary calculations
const totalComponents = components.length;
const tsCount = components.filter((c) => c.typescript).length;
const darkModeCount = components.filter((c) => c.darkMode).length;
const responsiveCount = components.filter((c) => c.responsive).length;
const testedCount = components.filter((c) => c.tests > 0).length;
const docsCompleteCount = components.filter((c) => c.docs === 'complete').length;

const tsPercent = Math.round((tsCount / totalComponents) * 100);
const darkModePercent = Math.round((darkModeCount / totalComponents) * 100);
const responsivePercent = Math.round((responsiveCount / totalComponents) * 100);
const avgTests = Math.round(components.reduce((sum, c) => sum + c.tests, 0) / totalComponents);
const docsPercent = Math.round((docsCompleteCount / totalComponents) * 100);

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
        docs: Math.round((catComponents.filter((c) => c.docs === 'complete').length / total) * 100),
    };
}

const catKeys = ['dataInput', 'selectors', 'display', 'modals', 'structure', 'utilities'];

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
                    value: [tsPercent, darkModePercent, responsivePercent, avgTests, docsPercent],
                    name: isEs.value ? 'Estado Actual' : 'Current Status',
                    areaStyle: {
                        color: isDark.value ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)',
                    },
                    lineStyle: { color: '#6366f1', width: 2 },
                    itemStyle: { color: '#6366f1' },
                },
                {
                    value: [100, 100, 100, 100, 100],
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
        count: `${testedCount}/${totalComponents}`,
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
    },
    {
        label: isEs.value ? 'Docs Completa' : 'Docs Complete',
        value: docsPercent,
        count: `${docsCompleteCount}/${totalComponents}`,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
    },
]);
</script>

<template>
    <div class="space-y-10">
        <!-- Summary Cards -->
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
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
                <div class="mt-2 grid grid-cols-2 gap-2">
                    <ClientOnly>
                        <VChart v-if="ready" style="width: 100%; height: 144px" :option="gaugeTests" autoresize />
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
                        <th class="px-3 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">
                            <TypescriptIcon class="mx-auto size-5" />
                        </th>
                        <th class="px-3 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">
                            <FigmaIcon class="mx-auto h-5 w-auto" />
                        </th>
                        <th class="px-3 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">
                            <span class="hidden sm:inline">Dark Mode</span>
                            <span class="sm:hidden">DM</span>
                        </th>
                        <th class="px-3 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">
                            <span class="hidden sm:inline">Responsive</span>
                            <span class="sm:hidden">Resp</span>
                        </th>
                        <th class="px-3 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">Tests</th>
                        <th class="px-3 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">Docs</th>
                        <th class="px-3 py-3 text-center font-semibold text-gray-700 dark:text-gray-300"></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="catKey in catKeys" :key="catKey">
                        <tr class="bg-gray-50 dark:bg-gray-800/80">
                            <td
                                colspan="8"
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
                            <td class="px-4 py-2.5 font-mono text-xs font-medium text-gray-700 dark:text-gray-300">
                                {{ comp.name }}
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
                                <a
                                    v-if="comp.figmaLink"
                                    :href="comp.figmaLink"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex size-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 transition-colors hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:hover:bg-emerald-900/60"
                                    :title="isEs ? 'Abrir en Figma' : 'Open in Figma'"
                                >
                                    <FigmaIcon class="size-3" />
                                </a>
                                <span
                                    v-else
                                    class="inline-flex size-5 items-center justify-center rounded-full text-xs bg-red-100 text-red-500 dark:bg-red-900/40 dark:text-red-400"
                                >
                                    ✗
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
                                <span
                                    class="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium"
                                    :class="
                                        comp.docs === 'complete'
                                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                                            : comp.docs === 'partial'
                                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                                              : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                                    "
                                >
                                    {{ comp.docs === 'complete' ? (isEs ? 'Completa' : 'Complete') : comp.docs === 'partial' ? (isEs ? 'Parcial' : 'Partial') : (isEs ? 'Mínima' : 'Minimal') }}
                                </span>
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
