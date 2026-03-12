<script setup lang="ts">
import VChart from 'vue-echarts';
import { ref, computed, onMounted, nextTick } from 'vue';
import { components } from '~/data/componentStatus';
import type { ComponentStatusData } from '~/data/componentStatus';
import TypescriptIcon from '~/assets/svg/typescript.svg';
import FigmaIcon from '~/assets/svg/figma.svg';

function useCountUp(target: number, duration = 1200, delay = 300) {
    const current = ref(0);
    onMounted(() => {
        setTimeout(() => {
            const start = performance.now();
            const step = (now: number) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                current.value = Math.round(eased * target);
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        }, delay);
    });
    return current;
}

const copiedName = ref<string | null>(null);

function getComponentSummary(comp: ComponentStatusData): string {
    const check = (v: boolean) => (v ? '✔️' : '❌');
    return [
        `${check(comp.typescript)} Compatible con typescript`,
        `${check(comp.jsdoc)} JSDoc bilingüe`,
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
const BG_COLOR = 'transparent';
const splitLineColor = computed(() => (isDark.value ? '#374151' : '#e5e7eb'));

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

// Summary calculations — single pass
const totalComponents = components.length;
const summary = components.reduce(
    (acc, c) => {
        if (c.typescript) acc.ts++;
        if (c.jsdoc) acc.jsdoc++;
        if (c.darkMode) acc.darkMode++;
        if (c.responsive) acc.responsive++;
        if (c.tests >= 80) acc.testsHigh++;
        else if (c.tests > 0) acc.testsMid++;
        else acc.testsNone++;
        if (c.figmaLink) acc.figma++;
        if (c.docs === 'complete') acc.docsComplete++;
        else if (c.docs === 'partial') acc.docsPartial++;
        else acc.docsMinimal++;
        acc.testsSum += c.tests;
        return acc;
    },
    {
        ts: 0,
        jsdoc: 0,
        darkMode: 0,
        responsive: 0,
        testsHigh: 0,
        testsMid: 0,
        testsNone: 0,
        figma: 0,
        docsComplete: 0,
        docsPartial: 0,
        docsMinimal: 0,
        testsSum: 0,
    },
);

const tsPercent = Math.round((summary.ts / totalComponents) * 100);
const jsdocPercent = Math.round((summary.jsdoc / totalComponents) * 100);
const darkModePercent = Math.round((summary.darkMode / totalComponents) * 100);
const responsivePercent = Math.round((summary.responsive / totalComponents) * 100);
const avgTests = Math.round(summary.testsSum / totalComponents);
const figmaPercent = Math.round((summary.figma / totalComponents) * 100);

function docsWeight(doc: string) {
    return doc === 'complete' ? 100 : doc === 'partial' ? 50 : 0;
}
const docsPercent = Math.round(components.reduce((sum, c) => sum + docsWeight(c.docs), 0) / totalComponents);

const overallPercent = Math.round(
    (tsPercent + jsdocPercent + darkModePercent + responsivePercent + avgTests + figmaPercent + docsPercent) / 7,
);

const animatedOverall = useCountUp(overallPercent, 1500, 400);

const dimensionValues = [
    tsPercent,
    jsdocPercent,
    darkModePercent,
    responsivePercent,
    avgTests,
    figmaPercent,
    docsPercent,
];
const animatedDimensions = dimensionValues.map((val, i) => useCountUp(val, 1200, 500 + i * 100));

const catKeys = ['dataInput', 'selectors', 'display', 'modals', 'structure', 'utilities', 'typography'] as const;

const categoryStatsMap = Object.fromEntries(
    catKeys.map((catKey) => {
        const catComponents = components.filter((c) => c.category === catKey);
        const total = catComponents.length;
        return [
            catKey,
            {
                total,
                ts: Math.round((catComponents.filter((c) => c.typescript).length / total) * 100),
                jsdoc: Math.round((catComponents.filter((c) => c.jsdoc).length / total) * 100),
                dark: Math.round((catComponents.filter((c) => c.darkMode).length / total) * 100),
                responsive: Math.round((catComponents.filter((c) => c.responsive).length / total) * 100),
                tests: Math.round(catComponents.reduce((s, c) => s + c.tests, 0) / total),
                figma: Math.round((catComponents.filter((c) => !!c.figmaLink).length / total) * 100),
                docs: Math.round(catComponents.reduce((s, c) => s + docsWeight(c.docs), 0) / total),
            },
        ];
    }),
);

function isComponentComplete(comp: ComponentStatusData): boolean {
    return (
        comp.typescript &&
        comp.jsdoc &&
        !!comp.figmaLink &&
        comp.darkMode &&
        comp.responsive &&
        comp.tests >= 80 &&
        comp.docs === 'complete'
    );
}

const categorySlugMap: Record<string, string> = {
    dataInput: 'data-input',
    selectors: 'selectors',
    display: 'display',
    modals: 'modals',
    structure: 'structure',
    utilities: 'utilities',
    typography: 'typography',
};

const componentsByCategory = Object.fromEntries(
    catKeys.map((key) => [key, components.filter((c) => c.category === key)]),
);

// ---- Chart Options ----

const radarOption = computed(() => ({
    backgroundColor: BG_COLOR,
    title: {
        text: isEs.value ? 'Cobertura General' : 'Overall Coverage',
        left: 'center',
        top: 10,
        textStyle: { color: textColor.value, fontSize: 15, fontWeight: 600 },
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
            { name: 'JSDoc', max: 100 },
            { name: 'Dark Mode', max: 100 },
            { name: 'Responsive', max: 100 },
            { name: 'Tests', max: 100 },
            { name: 'Figma', max: 100 },
            { name: isEs.value ? 'Documentación' : 'Documentation', max: 100 },
        ],
        shape: 'polygon',
        splitNumber: 5,
        axisName: { color: textColor.value, fontSize: 11, fontWeight: 500 },
        splitArea: {
            areaStyle: {
                color: isDark.value
                    ? [
                          'rgba(99,102,241,0.04)',
                          'rgba(99,102,241,0.08)',
                          'rgba(99,102,241,0.04)',
                          'rgba(99,102,241,0.08)',
                      ]
                    : [
                          'rgba(99,102,241,0.02)',
                          'rgba(99,102,241,0.05)',
                          'rgba(99,102,241,0.02)',
                          'rgba(99,102,241,0.05)',
                      ],
            },
        },
        splitLine: { lineStyle: { color: splitLineColor.value } },
        axisLine: { lineStyle: { color: splitLineColor.value } },
    },
    series: [
        {
            type: 'radar',
            animationDuration: 1200,
            data: [
                {
                    value: [
                        tsPercent,
                        jsdocPercent,
                        darkModePercent,
                        responsivePercent,
                        avgTests,
                        figmaPercent,
                        docsPercent,
                    ],
                    name: isEs.value ? 'Estado Actual' : 'Current Status',
                    areaStyle: { color: isDark.value ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.15)' },
                    lineStyle: { color: '#6366f1', width: 2 },
                    itemStyle: { color: '#6366f1' },
                },
                {
                    value: [100, 100, 100, 100, 100, 100, 100],
                    name: isEs.value ? 'Objetivo' : 'Target',
                    areaStyle: { color: isDark.value ? 'rgba(16,185,129,0.06)' : 'rgba(16,185,129,0.04)' },
                    lineStyle: { color: '#10b981', width: 1, type: 'dashed' },
                    itemStyle: { color: '#10b981' },
                },
            ],
        },
    ],
}));

const barOption = computed(() => {
    const catLabels = catKeys.map((k) => categories.value[k as keyof typeof categories.value]);
    const stats = catKeys.map((k) => categoryStatsMap[k]);

    return {
        backgroundColor: BG_COLOR,
        title: {
            text: isEs.value ? 'Progreso por Categoría' : 'Progress by Category',
            left: 'center',
            top: 10,
            textStyle: { color: textColor.value, fontSize: 15, fontWeight: 600 },
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
            textStyle: { color: subtextColor.value, fontSize: 10 },
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 12,
        },
        grid: { left: '3%', right: '4%', bottom: '15%', top: '18%' },
        xAxis: {
            type: 'category',
            data: catLabels,
            axisLabel: { color: subtextColor.value, fontSize: 10, interval: 0, rotate: 20 },
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
                name: 'JSDoc',
                type: 'bar',
                data: stats.map((s) => s.jsdoc),
                itemStyle: { color: '#f97316', borderRadius: [3, 3, 0, 0] },
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
                name: 'Docs',
                type: 'bar',
                data: stats.map((s) => s.docs),
                itemStyle: { color: '#10b981', borderRadius: [3, 3, 0, 0] },
            },
        ],
    };
});

type RatioCount = { type: 'ratio'; done: number; total: number };
type BreakdownCount = { type: 'breakdown'; good: number; partial: number; none: number };

interface DimensionStat {
    label: string;
    value: number;
    count: RatioCount | BreakdownCount;
    color: string;
    border: string;
    rawColor: string;
}

const summaryStats = computed<DimensionStat[]>(() => [
    {
        label: 'TypeScript',
        value: tsPercent,
        count: { type: 'ratio', done: summary.ts, total: totalComponents },
        color: 'text-[#3178c6]',
        border: 'border-[#3178c6]/20',
        rawColor: '#3178c6',
    },
    {
        label: 'JSDoc',
        value: jsdocPercent,
        count: { type: 'ratio', done: summary.jsdoc, total: totalComponents },
        color: 'text-orange-500',
        border: 'border-orange-500/20',
        rawColor: '#f97316',
    },
    {
        label: 'Dark Mode',
        value: darkModePercent,
        count: { type: 'ratio', done: summary.darkMode, total: totalComponents },
        color: 'text-violet-500',
        border: 'border-violet-500/20',
        rawColor: '#8b5cf6',
    },
    {
        label: 'Responsive',
        value: responsivePercent,
        count: { type: 'ratio', done: summary.responsive, total: totalComponents },
        color: 'text-cyan-500',
        border: 'border-cyan-500/20',
        rawColor: '#06b6d4',
    },
    {
        label: 'Tests',
        value: avgTests,
        count: { type: 'breakdown', good: summary.testsHigh, partial: summary.testsMid, none: summary.testsNone },
        color: 'text-amber-500',
        border: 'border-amber-500/20',
        rawColor: '#f59e0b',
    },
    {
        label: 'Figma',
        value: figmaPercent,
        count: { type: 'ratio', done: summary.figma, total: totalComponents },
        color: 'text-[#a259ff]',
        border: 'border-[#a259ff]/20',
        rawColor: '#a259ff',
    },
    {
        label: isEs.value ? 'Docs' : 'Docs',
        value: docsPercent,
        count: {
            type: 'breakdown',
            good: summary.docsComplete,
            partial: summary.docsPartial,
            none: summary.docsMinimal,
        },
        color: 'text-emerald-500',
        border: 'border-emerald-500/20',
        rawColor: '#10b981',
    },
]);
</script>

<template>
    <div class="space-y-10">
        <!-- Hero + Radar -->
        <div class="grid items-stretch gap-6 lg:grid-cols-2">
            <!-- Overall Progress -->
            <div
                class="relative overflow-hidden rounded-2xl border border-gray-200/80 px-6 py-10 dark:border-gray-700/40 dark:bg-gray-800/30"
            >
                <div
                    class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.08),transparent_70%)]"
                />
                <div class="relative flex h-full flex-col items-center justify-center">
                    <div class="relative">
                        <svg class="hero-svg size-36" viewBox="0 0 36 36">
                            <defs>
                                <linearGradient id="heroRingGrad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stop-color="#818cf8" />
                                    <stop offset="100%" stop-color="#4f46e5" />
                                </linearGradient>
                            </defs>
                            <circle
                                class="text-gray-100 dark:text-gray-800"
                                cx="18"
                                cy="18"
                                r="15.9155"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                            />
                            <circle
                                class="hero-ring"
                                cx="18"
                                cy="18"
                                r="15.9155"
                                fill="none"
                                stroke="url(#heroRingGrad)"
                                stroke-width="3"
                                stroke-linecap="round"
                                :stroke-dasharray="ready ? `${overallPercent} 100` : '0 100'"
                            />
                        </svg>
                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                            <span
                                class="text-4xl font-extrabold tracking-tight text-gray-900 tabular-nums dark:text-white"
                            >
                                {{ animatedOverall }}%
                            </span>
                            <span class="text-[11px] font-medium text-gray-400 dark:text-gray-500">
                                {{ isEs ? 'completado' : 'complete' }}
                            </span>
                        </div>
                    </div>
                    <h3 class="mt-5 text-sm font-semibold text-gray-700 dark:text-gray-200">
                        {{ isEs ? 'Madurez General de Componentes' : 'Overall Component Maturity' }}
                    </h3>
                    <p class="mt-1 text-xs text-gray-400 dark:text-gray-500">
                        {{ totalComponents }} {{ isEs ? 'componentes' : 'components' }} · 7
                        {{ isEs ? 'dimensiones' : 'dimensions' }}
                    </p>
                </div>
            </div>
            <!-- Radar Chart -->
            <div class="rounded-xl border border-gray-200 p-4 dark:border-gray-700/50 dark:bg-gray-800/30">
                <ClientOnly>
                    <VChart v-if="ready" style="width: 100%; height: 360px" :option="radarOption" autoresize />
                </ClientOnly>
            </div>
        </div>

        <!-- Dimension Cards -->
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            <div
                v-for="(stat, index) in summaryStats"
                :key="stat.label"
                class="card-animate group flex flex-col items-center rounded-xl border px-3 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-700/50 dark:bg-gray-800/30"
                :class="[stat.border]"
                :style="{ animationDelay: `${index * 80 + 300}ms` }"
            >
                <svg class="dim-svg size-12" viewBox="0 0 36 36">
                    <circle
                        class="text-gray-100 dark:text-gray-800"
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                    />
                    <circle
                        class="dimension-ring"
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        :stroke="stat.rawColor"
                        stroke-width="3"
                        stroke-linecap="round"
                        :stroke-dasharray="ready ? `${stat.value} 100` : '0 100'"
                        :style="{ transitionDelay: `${index * 100 + 500}ms` }"
                    />
                </svg>
                <span class="mt-2 text-lg font-bold tabular-nums" :class="stat.color"
                    >{{ animatedDimensions[index].value }}%</span
                >
                <span class="mt-0.5 text-[11px] font-medium text-gray-500 dark:text-gray-400">{{ stat.label }}</span>
                <!-- Ratio indicator -->
                <div v-if="stat.count.type === 'ratio'" class="mt-1.5 flex items-center gap-1">
                    <span class="text-[10px] font-semibold text-gray-600 tabular-nums dark:text-gray-300">{{
                        stat.count.done
                    }}</span>
                    <span class="text-[9px] text-gray-300 dark:text-gray-600">/</span>
                    <span class="text-[10px] text-gray-400 tabular-nums dark:text-gray-500">{{
                        stat.count.total
                    }}</span>
                </div>
                <!-- Breakdown indicator (Tests, Docs) -->
                <div v-else class="mt-1.5 flex items-center gap-1">
                    <span
                        class="inline-flex items-center gap-0.5 rounded-full bg-emerald-100 px-1.5 py-px text-[9px] font-semibold text-emerald-700 tabular-nums dark:bg-emerald-900/40 dark:text-emerald-400"
                    >
                        {{ stat.count.good }}
                        <span class="text-[8px]">✓</span>
                    </span>
                    <span
                        v-if="stat.count.partial > 0"
                        class="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-px text-[9px] font-semibold text-amber-700 tabular-nums dark:bg-amber-900/40 dark:text-amber-400"
                    >
                        {{ stat.count.partial }}
                        <span class="text-[8px]">~</span>
                    </span>
                </div>
            </div>
        </div>

        <!-- Bar Chart: Full Width -->
        <div class="rounded-xl border border-gray-200 p-4 dark:border-gray-700/50 dark:bg-gray-800/30">
            <ClientOnly>
                <VChart v-if="ready" style="width: 100%; height: 380px" :option="barOption" autoresize />
            </ClientOnly>
        </div>

        <!-- Component Status Matrix -->
        <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700/50 dark:bg-gray-800/30">
            <table class="w-full text-left text-sm">
                <thead>
                    <tr class="border-b border-gray-200 bg-gray-50/80 dark:border-gray-700 dark:bg-gray-800/60">
                        <th
                            class="px-4 py-3 text-[11px] font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400"
                        >
                            {{ isEs ? 'Componente' : 'Component' }}
                        </th>
                        <th class="w-8 px-1 py-3"></th>
                        <th class="px-3 py-3">
                            <UTooltip text="TypeScript">
                                <div class="flex justify-center"><TypescriptIcon class="size-4" /></div>
                            </UTooltip>
                        </th>
                        <th class="px-3 py-3">
                            <UTooltip text="JSDoc">
                                <div class="flex justify-center">
                                    <UIcon name="i-lucide-file-text" class="size-4 text-orange-500" />
                                </div>
                            </UTooltip>
                        </th>
                        <th class="px-3 py-3">
                            <UTooltip text="Figma">
                                <div class="flex justify-center"><FigmaIcon class="h-4 w-auto" /></div>
                            </UTooltip>
                        </th>
                        <th class="px-3 py-3">
                            <UTooltip text="Dark Mode">
                                <div class="flex justify-center">
                                    <UIcon name="i-mdi-theme-light-dark" class="size-4 text-yellow-400" />
                                </div>
                            </UTooltip>
                        </th>
                        <th class="px-3 py-3">
                            <UTooltip text="Responsive">
                                <div class="flex justify-center">
                                    <UIcon name="i-lucide-monitor-smartphone" class="size-4 text-cyan-500" />
                                </div>
                            </UTooltip>
                        </th>
                        <th class="px-3 py-3">
                            <UTooltip text="Tests">
                                <div class="flex justify-center">
                                    <UIcon name="i-lucide-flask-conical" class="size-4 text-amber-500" />
                                </div>
                            </UTooltip>
                        </th>
                        <th class="px-3 py-3">
                            <UTooltip :text="isEs ? 'Documentación' : 'Documentation'">
                                <div class="flex justify-center">
                                    <UIcon name="i-lucide-book-open-text" class="size-4 text-emerald-500" />
                                </div>
                            </UTooltip>
                        </th>
                        <th class="px-3 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="catKey in catKeys" :key="catKey">
                        <!-- Category Header -->
                        <tr>
                            <td colspan="10" class="border-b border-gray-100 px-4 py-2.5 dark:border-gray-800">
                                <div class="flex items-center gap-2">
                                    <span
                                        class="text-[11px] font-bold tracking-wider text-gray-400 uppercase dark:text-gray-500"
                                    >
                                        {{ categories[catKey as keyof typeof categories] }}
                                    </span>
                                    <span
                                        class="rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] font-semibold text-gray-400 tabular-nums dark:bg-gray-700/60 dark:text-gray-500"
                                    >
                                        {{ categoryStatsMap[catKey].total }}
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <!-- Component Rows -->
                        <tr
                            v-for="comp in componentsByCategory[catKey]"
                            :key="comp.name"
                            class="group border-b border-l-2 transition-colors"
                            :class="
                                isComponentComplete(comp)
                                    ? 'border-b-emerald-200/60 border-l-emerald-500 bg-emerald-50/60 hover:bg-emerald-50 dark:border-b-emerald-900/40 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/50'
                                    : 'border-b-gray-50 border-l-transparent hover:bg-gray-50/80 dark:border-b-gray-800/50 dark:hover:bg-gray-800/40'
                            "
                        >
                            <td class="px-4 py-2.5 font-mono text-xs font-medium">
                                <div class="flex items-center gap-2">
                                    <NuxtLink
                                        :to="`${isEs ? '/es' : '/en'}/components/${categorySlugMap[comp.category]}/${comp.slug}`"
                                        class="transition-colors"
                                        :class="
                                            isComponentComplete(comp)
                                                ? 'font-semibold text-emerald-700 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300'
                                                : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
                                        "
                                    >
                                        {{ comp.name }}
                                    </NuxtLink>
                                </div>
                            </td>
                            <td class="w-8 px-1 py-2.5 text-center">
                                <UPopover v-if="comp.improvements.en" mode="hover">
                                    <UIcon name="i-lucide-triangle-alert" class="size-4 cursor-help text-amber-500" />
                                    <template #content>
                                        <div class="max-w-xs p-3">
                                            <p class="mb-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200">
                                                {{ isEs ? 'Mejoras pendientes' : 'Pending improvements' }}
                                            </p>
                                            <p class="text-xs whitespace-pre-line text-gray-600 dark:text-gray-400">
                                                {{ isEs ? comp.improvements.es : comp.improvements.en }}
                                            </p>
                                        </div>
                                    </template>
                                </UPopover>
                            </td>
                            <!-- TypeScript -->
                            <td class="px-3 py-2.5 text-center">
                                <div class="flex justify-center">
                                    <span
                                        class="inline-block size-2.5 rounded-full transition-shadow"
                                        :class="
                                            comp.typescript
                                                ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]'
                                                : 'bg-gray-200 dark:bg-gray-700'
                                        "
                                    />
                                </div>
                            </td>
                            <!-- JSDoc -->
                            <td class="px-3 py-2.5 text-center">
                                <div class="flex justify-center">
                                    <span
                                        class="inline-block size-2.5 rounded-full transition-shadow"
                                        :class="
                                            comp.jsdoc
                                                ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]'
                                                : 'bg-gray-200 dark:bg-gray-700'
                                        "
                                    />
                                </div>
                            </td>
                            <!-- Figma -->
                            <td class="px-3 py-2.5 text-center">
                                <div class="flex justify-center">
                                    <span
                                        class="inline-block size-2.5 rounded-full transition-shadow"
                                        :class="
                                            comp.figmaLink
                                                ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]'
                                                : 'bg-gray-200 dark:bg-gray-700'
                                        "
                                    />
                                </div>
                            </td>
                            <!-- Dark Mode -->
                            <td class="px-3 py-2.5 text-center">
                                <div class="flex justify-center">
                                    <span
                                        class="inline-block size-2.5 rounded-full transition-shadow"
                                        :class="
                                            comp.darkMode
                                                ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]'
                                                : 'bg-gray-200 dark:bg-gray-700'
                                        "
                                    />
                                </div>
                            </td>
                            <!-- Responsive -->
                            <td class="px-3 py-2.5 text-center">
                                <div class="flex justify-center">
                                    <span
                                        class="inline-block size-2.5 rounded-full transition-shadow"
                                        :class="
                                            comp.responsive
                                                ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]'
                                                : 'bg-gray-200 dark:bg-gray-700'
                                        "
                                    />
                                </div>
                            </td>
                            <!-- Tests -->
                            <td class="px-3 py-2.5">
                                <div class="flex items-center justify-center gap-2">
                                    <div
                                        class="h-1.5 w-14 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700/80"
                                    >
                                        <div
                                            class="h-full rounded-full transition-all duration-500"
                                            :class="
                                                comp.tests >= 70
                                                    ? 'bg-emerald-500'
                                                    : comp.tests >= 40
                                                      ? 'bg-amber-500'
                                                      : comp.tests > 0
                                                        ? 'bg-red-400'
                                                        : ''
                                            "
                                            :style="{ width: `${comp.tests}%` }"
                                        />
                                    </div>
                                    <span
                                        class="w-8 text-right text-[10px] font-semibold text-gray-500 tabular-nums dark:text-gray-400"
                                    >
                                        {{ comp.tests }}%
                                    </span>
                                </div>
                            </td>
                            <!-- Docs -->
                            <td class="px-3 py-2.5 text-center">
                                <UIcon
                                    :name="
                                        comp.docs === 'complete'
                                            ? 'i-fa6-regular-face-smile'
                                            : comp.docs === 'partial'
                                              ? 'i-fa6-regular-face-meh'
                                              : 'i-fa6-regular-face-frown'
                                    "
                                    class="size-5"
                                    :class="
                                        comp.docs === 'complete'
                                            ? 'text-emerald-500'
                                            : comp.docs === 'partial'
                                              ? 'text-amber-500'
                                              : 'text-red-500'
                                    "
                                />
                            </td>
                            <!-- Copy -->
                            <td class="px-3 py-2.5 text-center">
                                <button
                                    :title="isEs ? 'Copiar resumen' : 'Copy summary'"
                                    class="inline-flex size-7 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                    @click="copySummary(comp)"
                                >
                                    <svg
                                        v-if="copiedName !== comp.name"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="size-3.5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                    </svg>
                                    <svg
                                        v-else
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="size-3.5 text-emerald-500"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
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

<style scoped>
.hero-svg {
    transform: rotate(-90deg);
}

.dim-svg {
    transform: rotate(-90deg);
}

.hero-ring {
    transition: stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
}

.dimension-ring {
    transition: stroke-dasharray 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-animate {
    opacity: 0;
    transform: translateY(16px);
    animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
