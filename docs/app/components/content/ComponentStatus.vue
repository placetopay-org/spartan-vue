<script setup lang="ts">
import { getStatusBySlug } from '~/data/componentStatus';
import TypescriptIcon from '~/assets/svg/typescript.svg';
import FigmaIcon from '~/assets/svg/figma.svg';

const route = useRoute();
const isEs = computed(() => route.path.startsWith('/es'));
const slug = computed(() => route.path.split('/').pop() || '');
const status = computed(() => getStatusBySlug(slug.value));

const typescript = computed(() => status.value?.typescript ?? false);
const darkMode = computed(() => status.value?.darkMode ?? false);
const responsive = computed(() => status.value?.responsive ?? false);
const tests = computed(() => status.value?.tests ?? 0);
const docs = computed(() => status.value?.docs ?? 'minimal');
const figmaLink = computed(() => status.value?.figmaLink ?? '');
const improvements = computed(() => status.value?.improvements ?? { en: '', es: '' });
const improvementNotes = computed(() => isEs.value ? improvements.value.es : improvements.value.en);
const hasImprovements = computed(() => !!improvementNotes.value);

const t = computed(() =>
    isEs.value
        ? {
              tsYes: 'Soporte completo de TypeScript',
              tsNo: 'Sin soporte de TypeScript',
              darkYes: 'Soporta modo oscuro',
              darkNo: 'Sin soporte de modo oscuro',
              respYes: 'Diseño responsive incluido',
              respNo: 'No es responsive',
              tests: `Cobertura de tests: ${tests.value}%`,
              docsComplete: 'Documentación completa',
              docsPartial: 'Documentación parcial',
              docsMinimal: 'Documentación mínima',
          }
        : {
              tsYes: 'Full TypeScript support',
              tsNo: 'No TypeScript support',
              darkYes: 'Supports dark mode',
              darkNo: 'No dark mode support',
              respYes: 'Responsive design included',
              respNo: 'Not responsive',
              tests: `Test coverage: ${tests.value}%`,
              docsComplete: 'Documentation complete',
              docsPartial: 'Documentation partial',
              docsMinimal: 'Documentation minimal',
          },
);

const testColor = computed(() => {
    if (tests.value >= 80) return 'text-emerald-700 dark:text-emerald-300';
    if (tests.value >= 50) return 'text-amber-700 dark:text-amber-300';
    return 'text-red-700 dark:text-red-300';
});

const testBorder = computed(() => {
    if (tests.value >= 80) return 'border-emerald-500/20 bg-emerald-500/10 dark:border-emerald-400/20 dark:bg-emerald-400/10';
    if (tests.value >= 50) return 'border-amber-500/20 bg-amber-500/10 dark:border-amber-400/20 dark:bg-amber-400/10';
    return 'border-red-500/20 bg-red-500/10 dark:border-red-400/20 dark:bg-red-400/10';
});

const testBg = computed(() => {
    if (tests.value >= 80) return 'bg-emerald-500';
    if (tests.value >= 50) return 'bg-amber-500';
    return 'bg-red-500';
});

const docsTooltip = computed(() => {
    if (docs.value === 'complete') return t.value.docsComplete;
    if (docs.value === 'partial') return t.value.docsPartial;
    return t.value.docsMinimal;
});

const docsBadge = computed(() => {
    if (docs.value === 'complete') return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300';
    if (docs.value === 'partial') return 'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300';
    return 'border-red-500/20 bg-red-500/10 text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300';
});

const docsLabel = computed(() => {
    if (docs.value === 'complete') return isEs.value ? 'Completa' : 'Complete';
    if (docs.value === 'partial') return isEs.value ? 'Parcial' : 'Partial';
    return isEs.value ? 'Mínima' : 'Minimal';
});
</script>

<template>
    <div class="mb-8 -mt-4 flex flex-wrap items-center gap-2.5">
        <!-- Improvements -->
        <UPopover v-if="hasImprovements" mode="hover">
            <div class="inline-flex items-center rounded-lg border border-transparent p-0.5 cursor-help">
                <UIcon name="i-lucide-triangle-alert" class="size-5 text-amber-500" />
            </div>
            <template #content>
                <div class="p-3 max-w-xs">
                    <p class="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
                        {{ isEs ? 'Mejoras pendientes' : 'Pending improvements' }}
                    </p>
                    <p class="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-line">{{ improvementNotes }}</p>
                </div>
            </template>
        </UPopover>

        <!-- TypeScript -->
        <UTooltip :text="typescript ? t.tsYes : t.tsNo">
            <div class="inline-flex items-center rounded-lg border border-transparent p-0.5">
                <TypescriptIcon
                    class="size-5"
                    :class="typescript ? '' : 'grayscale opacity-80'"
                />
            </div>
        </UTooltip>

        <!-- Figma -->
        <UTooltip :text="figmaLink ? (isEs ? 'Abrir en Figma' : 'Open in Figma') : (isEs ? 'Sin enlace de Figma' : 'No Figma link')">
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
                <FigmaIcon class="size-5 grayscale opacity-80" />
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
                    :class="docs === 'complete' ? 'text-emerald-500' : docs === 'partial' ? 'text-amber-500' : 'text-red-500'"
                />
                <UIcon
                    :name="docs === 'complete' ? 'i-fa6-regular-face-smile' : docs === 'partial' ? 'i-fa6-regular-face-meh' : 'i-fa6-regular-face-frown'"
                    class="size-3.5"
                    :class="docs === 'complete' ? 'text-emerald-500' : docs === 'partial' ? 'text-amber-500' : 'text-red-500'"
                />
            </div>
        </UTooltip>

        <!-- Tests -->
        <UTooltip :text="t.tests">
            <div
                class="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium"
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
        </UTooltip>
    </div>
</template>
