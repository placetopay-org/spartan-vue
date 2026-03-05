<script setup lang="ts">
import { getStatusBySlug } from '~/data/componentStatus';
import TypescriptIcon from '~/assets/svg/typescript.svg';
import FigmaIcon from '~/assets/svg/figma.svg';

const route = useRoute();
const isEs = computed(() => route.path.startsWith('/es'));
const slug = computed(() => route.path.split('/').pop() || '');
const status = computed(() => getStatusBySlug(slug.value));

const typescript = computed(() => status.value?.typescript ?? false);
const jsdoc = computed(() => status.value?.jsdoc ?? false);
const darkMode = computed(() => status.value?.darkMode ?? false);
const responsive = computed(() => status.value?.responsive ?? false);
const tests = computed(() => status.value?.tests ?? 0);
const docs = computed(() => status.value?.docs ?? 'minimal');
const figmaLink = computed(() => status.value?.figmaLink ?? '');
const improvements = computed(() => status.value?.improvements ?? { en: '', es: '' });
const hasBlock = computed(() => status.value?.hasBlock ?? false);
const improvementNotes = computed(() => (isEs.value ? improvements.value.es : improvements.value.en));
const hasImprovements = computed(() => !!improvementNotes.value);

const t = computed(() =>
    isEs.value
        ? {
              tsYes: 'Soporte completo de TypeScript',
              tsNo: 'Sin soporte de TypeScript',
              jsdocYes: 'JSDoc bilingüe incluido',
              jsdocNo: 'Sin JSDoc bilingüe',
              darkYes: 'Soporta modo oscuro',
              darkNo: 'Sin soporte de modo oscuro',
              respYes: 'Diseño responsive incluido',
              respNo: 'No es responsive',
              tests: `Cobertura de tests: ${tests.value}%`,
              docsComplete: 'Documentación completa',
              docsPartial: 'Documentación parcial',
              docsMinimal: 'Documentación mínima',
              block: 'Variante Block disponible',
          }
        : {
              tsYes: 'Full TypeScript support',
              tsNo: 'No TypeScript support',
              jsdocYes: 'Bilingual JSDoc included',
              jsdocNo: 'No bilingual JSDoc',
              darkYes: 'Supports dark mode',
              darkNo: 'No dark mode support',
              respYes: 'Responsive design included',
              respNo: 'Not responsive',
              tests: `Test coverage: ${tests.value}%`,
              docsComplete: 'Documentation complete',
              docsPartial: 'Documentation partial',
              docsMinimal: 'Documentation minimal',
              block: 'Block variant available',
          },
);

const testColor = computed(() => {
    if (tests.value >= 80) return 'text-emerald-700 dark:text-emerald-300';
    if (tests.value >= 50) return 'text-amber-700 dark:text-amber-300';
    return 'text-red-700 dark:text-red-300';
});

const testBorder = computed(() => {
    if (tests.value >= 80)
        return 'border-emerald-500/20 bg-emerald-500/10 dark:border-emerald-400/20 dark:bg-emerald-400/10';
    if (tests.value >= 50) return 'border-amber-500/20 bg-amber-500/10 dark:border-amber-400/20 dark:bg-amber-400/10';
    return 'border-red-500/20 bg-red-500/10 dark:border-red-400/20 dark:bg-red-400/10';
});

const testBg = computed(() => {
    if (tests.value >= 80) return 'bg-emerald-500';
    if (tests.value >= 50) return 'bg-amber-500';
    return 'bg-red-500';
});

const testIcon = computed(() => {
    if (tests.value === 0) return 'i-lucide-circle-x';
    if (tests.value >= 80) return 'i-lucide-circle-check';
    if (tests.value >= 50) return 'i-lucide-circle-minus';
    return 'i-lucide-circle-alert';
});

const testLabel = computed(() => {
    if (tests.value === 0) return isEs.value ? 'Sin tests' : 'No tests';
    if (tests.value >= 80) return isEs.value ? 'Cobertura alta' : 'High coverage';
    if (tests.value >= 50) return isEs.value ? 'Cobertura moderada' : 'Moderate coverage';
    return isEs.value ? 'Cobertura baja' : 'Low coverage';
});

const testDescription = computed(() => {
    if (tests.value === 0)
        return isEs.value ? 'Este componente aún no tiene tests unitarios.' : 'This component has no unit tests yet.';
    if (tests.value >= 80)
        return isEs.value ? 'Las funcionalidades principales están bien probadas.' : 'Core features are well tested.';
    if (tests.value >= 50)
        return isEs.value ? 'Algunas funcionalidades necesitan más pruebas.' : 'Some features need more testing.';
    return isEs.value
        ? 'Se necesitan más tests para garantizar estabilidad.'
        : 'More tests are needed to ensure stability.';
});

const testTiers = computed(() =>
    isEs.value
        ? [
              { label: 'Alta', range: '≥ 80%', color: 'bg-emerald-500' },
              { label: 'Moderada', range: '50–79%', color: 'bg-amber-500' },
              { label: 'Baja', range: '< 50%', color: 'bg-red-500' },
          ]
        : [
              { label: 'High', range: '≥ 80%', color: 'bg-emerald-500' },
              { label: 'Moderate', range: '50–79%', color: 'bg-amber-500' },
              { label: 'Low', range: '< 50%', color: 'bg-red-500' },
          ],
);

const docsTooltip = computed(() => {
    if (docs.value === 'complete') return t.value.docsComplete;
    if (docs.value === 'partial') return t.value.docsPartial;
    return t.value.docsMinimal;
});

const docsBadge = computed(() => {
    if (docs.value === 'complete')
        return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300';
    if (docs.value === 'partial')
        return 'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300';
    return 'border-red-500/20 bg-red-500/10 text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300';
});

const docsLabel = computed(() => {
    if (docs.value === 'complete') return isEs.value ? 'Completa' : 'Complete';
    if (docs.value === 'partial') return isEs.value ? 'Parcial' : 'Partial';
    return isEs.value ? 'Mínima' : 'Minimal';
});

const isFullQuality = computed(
    () =>
        typescript.value &&
        jsdoc.value &&
        !!figmaLink.value &&
        darkMode.value &&
        responsive.value &&
        docs.value === 'complete' &&
        tests.value >= 100,
);

const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: [3, 4, 3, 5, 3, 4, 3, 4][i],
    left: [8, 22, 38, 55, 68, 82, 92, 48][i],
    delay: [0, 0.8, 1.6, 0.4, 2.0, 1.2, 2.4, 0.6][i],
    duration: [2.8, 3.2, 2.6, 3.0, 2.9, 3.4, 2.7, 3.1][i],
}));
</script>

<template>
    <div class="relative -mt-4 mb-8 flex flex-wrap items-center gap-2.5">
        <!-- Quality sparkles -->
        <template v-if="isFullQuality">
            <div
                v-for="p in particles"
                :key="p.id"
                class="sparkle-particle"
                :style="{
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    left: `${p.left}%`,
                    animationDelay: `${p.delay}s`,
                    animationDuration: `${p.duration}s`,
                }"
            />
        </template>
        <!-- Improvements -->
        <UPopover v-if="hasImprovements" mode="hover">
            <div class="inline-flex cursor-help items-center rounded-lg border border-transparent p-0.5">
                <UIcon name="i-lucide-triangle-alert" class="size-5 text-amber-500" />
            </div>
            <template #content>
                <div class="max-w-xs p-3">
                    <p class="mb-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200">
                        {{ isEs ? 'Mejoras pendientes' : 'Pending improvements' }}
                    </p>
                    <p class="text-xs whitespace-pre-line text-gray-600 dark:text-gray-400">{{ improvementNotes }}</p>
                </div>
            </template>
        </UPopover>

        <!-- TypeScript -->
        <UTooltip :text="typescript ? t.tsYes : t.tsNo">
            <div class="inline-flex items-center rounded-lg border border-transparent p-0.5">
                <TypescriptIcon class="size-5" :class="typescript ? '' : 'opacity-80 grayscale'" />
            </div>
        </UTooltip>

        <!-- JSDoc -->
        <UTooltip :text="jsdoc ? t.jsdocYes : t.jsdocNo">
            <div class="inline-flex items-center rounded-lg border border-transparent p-0.5">
                <UIcon
                    name="i-lucide-file-text"
                    class="size-5"
                    :class="jsdoc ? 'text-orange-500' : 'text-gray-400 opacity-80'"
                />
            </div>
        </UTooltip>

        <!-- Figma -->
        <UTooltip
            :text="
                figmaLink ? (isEs ? 'Abrir en Figma' : 'Open in Figma') : isEs ? 'Sin enlace de Figma' : 'No Figma link'
            "
        >
            <a
                v-if="figmaLink"
                :href="figmaLink"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center transition-colors"
            >
                <FigmaIcon class="size-5" />
            </a>
            <div v-else class="inline-flex items-center">
                <FigmaIcon class="size-5 opacity-80 grayscale" />
            </div>
        </UTooltip>

        <!-- Dark Mode -->
        <UTooltip :text="darkMode ? t.darkYes : t.darkNo">
            <div class="inline-flex items-center rounded-lg border border-transparent p-0.5">
                <UIcon
                    name="i-mdi-theme-light-dark"
                    class="size-5"
                    :class="darkMode ? 'text-yellow-400' : 'text-gray-400 opacity-80'"
                />
            </div>
        </UTooltip>

        <!-- Responsive -->
        <UTooltip :text="responsive ? t.respYes : t.respNo">
            <div class="inline-flex items-center rounded-lg border border-transparent p-0.5">
                <UIcon
                    name="i-lucide-monitor-smartphone"
                    class="size-5"
                    :class="responsive ? 'text-cyan-500' : 'text-gray-400 opacity-80'"
                />
            </div>
        </UTooltip>

        <!-- Docs -->
        <UTooltip :text="docsTooltip">
            <div class="inline-flex items-center gap-0.5 rounded-lg border border-transparent p-0.5">
                <UIcon
                    name="i-lucide-book-open-text"
                    class="size-5"
                    :class="
                        docs === 'complete'
                            ? 'text-emerald-500'
                            : docs === 'partial'
                              ? 'text-amber-500'
                              : 'text-red-500'
                    "
                />
                <UIcon
                    :name="
                        docs === 'complete'
                            ? 'i-fa6-regular-face-smile'
                            : docs === 'partial'
                              ? 'i-fa6-regular-face-meh'
                              : 'i-fa6-regular-face-frown'
                    "
                    class="size-3.5"
                    :class="
                        docs === 'complete'
                            ? 'text-emerald-500'
                            : docs === 'partial'
                              ? 'text-amber-500'
                              : 'text-red-500'
                    "
                />
            </div>
        </UTooltip>

        <!-- Tests -->
        <UPopover mode="hover">
            <div
                class="inline-flex cursor-help items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium"
                :class="[testBorder, testColor]"
            >
                <UIcon class="size-4" name="i-lucide-flask-conical" />
                <span>Tests</span>
                <div class="flex items-center gap-1.5">
                    <div class="h-1.5 w-12 overflow-hidden rounded-lg bg-black/10 dark:bg-white/10">
                        <div
                            class="h-full rounded-full transition-all duration-500"
                            :class="testBg"
                            :style="{ width: `${tests}%` }"
                        />
                    </div>
                    <span class="text-[10px] font-semibold tabular-nums">{{ tests }}%</span>
                </div>
            </div>
            <template #content>
                <div class="w-56 p-3">
                    <!-- Header: icon + label + percentage -->
                    <div class="mb-2 flex items-center justify-between">
                        <div class="flex items-center gap-1.5">
                            <UIcon :name="testIcon" class="size-4" :class="testColor" />
                            <span class="text-xs font-semibold text-gray-700 dark:text-gray-200">{{ testLabel }}</span>
                        </div>
                        <span class="text-sm font-bold tabular-nums" :class="testColor">{{ tests }}%</span>
                    </div>

                    <!-- Progress bar -->
                    <div class="mb-2 h-2 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                        <div
                            class="h-full rounded-full transition-all duration-500"
                            :class="testBg"
                            :style="{ width: `${tests}%` }"
                        />
                    </div>

                    <!-- Description -->
                    <p class="mb-3 text-[11px] text-gray-500 dark:text-gray-400">{{ testDescription }}</p>

                    <!-- Tier legend -->
                    <div class="flex flex-col gap-1 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <div v-for="tier in testTiers" :key="tier.label" class="flex items-center gap-1.5">
                            <div class="size-2 rounded-full" :class="tier.color" />
                            <span class="text-[10px] text-gray-500 dark:text-gray-400">
                                {{ tier.label }}
                                <span class="text-gray-400 dark:text-gray-500">{{ tier.range }}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </template>
        </UPopover>

        <!-- Block -->
        <UTooltip v-if="hasBlock" :text="t.block">
            <div
                class="inline-flex items-center gap-1.5 rounded-lg border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300"
            >
                <UIcon class="size-4" name="i-lucide-box" />
                <span>Block</span>
            </div>
        </UTooltip>
    </div>
</template>

<style scoped>
.sparkle-particle {
    position: absolute;
    bottom: 0;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle, #fbbf24 0%, #f59e0b 40%, transparent 70%);
    box-shadow: 0 0 4px 1px rgba(251, 191, 36, 0.5);
    animation: sparkle-float linear infinite;
    opacity: 0;
}

@keyframes sparkle-float {
    0% {
        opacity: 0;
        transform: translateY(0) scale(0.4);
    }
    15% {
        opacity: 1;
        transform: translateY(-6px) scale(1);
    }
    50% {
        opacity: 0.7;
        transform: translateY(-18px) scale(0.8);
    }
    85% {
        opacity: 0.3;
        transform: translateY(-30px) scale(0.5);
    }
    100% {
        opacity: 0;
        transform: translateY(-38px) scale(0.2);
    }
}
</style>
