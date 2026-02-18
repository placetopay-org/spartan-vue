<script setup lang="ts">
import { ref, reactive, computed, shallowRef, provide, markRaw, watch, onMounted, onUnmounted } from 'vue'
import type { ChipProps } from '@nuxt/ui'
import type { PreviewStore, ControlDefinition } from '~/composables/usePreview'

const parseMarkdown = useMarkdownParser()

const props = withDefaults(defineProps<{
    /** Path relative to docs/examples/, without extension. e.g. "SButton/basic" */
    file: string
    /** Add overflow-hidden to preview area */
    overflowHidden?: boolean
}>(), {})

// ─── 1. PreviewStore — provided to the child example component ────────────────

const store = reactive<PreviewStore>({ definition: {}, values: {} })
provide('spartan-preview', store)

// ─── 2. Load example component + raw source ───────────────────────────────────

const exampleModules = import.meta.glob('../../../examples/**/*.vue')
const rawModules = import.meta.glob('../../../examples/**/*.vue', { query: '?raw', import: 'default' })

const exampleComponent = shallowRef<any>(null)
const rawSource = ref('')
const loadError = ref(false)

async function loadExample(file: string) {
    const key = `../../../examples/${file}.vue`
    const loader = exampleModules[key]
    const rawLoader = rawModules[key]
    if (!loader) {
        loadError.value = true
        console.warn(`[ComponentPreview] Example not found: ${key}`)
        return
    }
    loadError.value = false
    store.definition = {}
    Object.keys(store.values).forEach(k => delete store.values[k])
    const [mod, raw] = await Promise.all([
        loader() as Promise<{ default: any }>,
        rawLoader ? (rawLoader() as Promise<string>) : Promise.resolve(''),
    ])
    exampleComponent.value = markRaw(mod.default)
    rawSource.value = typeof raw === 'string' ? raw : ''
}

await loadExample(props.file)
watch(() => props.file, loadExample)

// ─── 3. Code display ─────────────────────────────────────────────────────────

const codeMarkdown = computed(() =>
    rawSource.value ? `\`\`\`vue\n${rawSource.value}\n\`\`\`` : ''
)
const { data: codeAst } = await useAsyncData(
    `preview-code-${props.file.replace(/\//g, '-')}`,
    () => parseMarkdown(codeMarkdown.value),
    { watch: [codeMarkdown] }
)

// ─── 4. UI state ─────────────────────────────────────────────────────────────

const activeTab = ref<'preview' | 'code'>('preview')
const hasControls = computed(() => Object.keys(store.definition).length > 0)

// ─── 5. Responsive breakpoints ────────────────────────────────────────────────

const breakpoints = [
    { label: 'mobile', icon: 'i-lucide-smartphone', width: 375 },
    { label: 'tablet', icon: 'i-lucide-tablet', width: 768 },
    { label: 'desktop', icon: 'i-lucide-monitor', width: null },
] as const

const activeBreakpoint = ref<'mobile' | 'tablet' | 'desktop'>('desktop')
const activeBreakpointDef = computed(() => breakpoints.find(b => b.label === activeBreakpoint.value))
const isBreakpointActive = computed(() => activeBreakpoint.value !== 'desktop')

// ─── 6. Zoom ─────────────────────────────────────────────────────────────────

const previewAreaRef = ref<HTMLElement | null>(null)
const previewAreaWidth = ref(0)
const manualZoom = ref<number | null>(null)

onMounted(() => {
    const el = previewAreaRef.value
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
        previewAreaWidth.value = entry.contentRect.width
    })
    ro.observe(el)
    onUnmounted(() => ro.disconnect())
})

// Auto-zoom: scale the frame down to fit inside the preview area.
// Capped at 0.85 so breakpoint mode always shows a visible zoom reduction
// even when the frame would otherwise almost fit at full size.
const autoZoom = computed(() => {
    const bp = activeBreakpointDef.value
    if (!bp?.width || previewAreaWidth.value === 0) return 1
    const fitted = (previewAreaWidth.value - 32) / bp.width
    return parseFloat(Math.min(0.85, fitted).toFixed(2))
})

const zoom = computed(() => manualZoom.value ?? autoZoom.value)
const zoomPercent = computed(() => Math.round(zoom.value * 100))

function adjustZoom(delta: number) {
    const next = parseFloat(Math.max(0.2, Math.min(1.5, zoom.value + delta)).toFixed(2))
    manualZoom.value = next
}

function resetZoom() {
    manualZoom.value = null
}

// On breakpoint change: preserve manual zoom unless it's at 100%, in which case
// let the new breakpoint's auto-zoom apply (e.g. tablet may need to zoom to 80%).
watch(activeBreakpoint, () => {
    if (manualZoom.value !== null && manualZoom.value < 0.995) return
    manualZoom.value = null
})

// ─── 7. Animated zoom ────────────────────────────────────────────────────────
// CSS `zoom` transitions are inconsistently supported across browsers.
// We drive the animation manually via requestAnimationFrame so zoom is always
// smooth: each frame we lerp displayZoom toward the target and update scrollLeft
// in the same tick, keeping scroll and zoom perfectly in sync.

const displayZoom = ref(zoom.value)

let _rafId: number | null = null
let _animFrom = zoom.value
let _animTarget = zoom.value
let _animStart = 0
const ANIM_DURATION = 280

function _ease(t: number) { return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2 }

function _animFrame(now: number) {
    const t = Math.min((now - _animStart) / ANIM_DURATION, 1)
    const cur = _animFrom + (_animTarget - _animFrom) * _ease(t)
    displayZoom.value = cur
    _syncScroll(cur)
    if (t < 1) {
        _rafId = requestAnimationFrame(_animFrame)
    } else {
        displayZoom.value = _animTarget
        _rafId = null
    }
}

function _startAnim(target: number) {
    if (typeof requestAnimationFrame === 'undefined') { displayZoom.value = target; return }
    if (_rafId !== null) cancelAnimationFrame(_rafId)
    _animFrom = displayZoom.value
    _animTarget = target
    _animStart = performance.now()
    _rafId = requestAnimationFrame(_animFrame)
}

watch(zoom, _startAnim)
onUnmounted(() => { if (_rafId !== null) cancelAnimationFrame(_rafId) })

// ─── 8. Scroll-based centering ────────────────────────────────────────────────
// _syncScroll is called inside the animation loop each frame so scroll and zoom
// stay perfectly in sync without needing smooth scroll behavior.

const scrollLayerRef = ref<HTMLElement | null>(null)

function _syncScroll(z: number) {
    const el = scrollLayerRef.value
    if (!el) return
    const bp = activeBreakpointDef.value
    if (!bp?.width) { el.scrollLeft = 0; return }
    const excess = Math.max(0, bp.width * z - el.clientWidth)
    el.scrollLeft = excess / 2
}

onMounted(() => _syncScroll(zoom.value))

// CSS zoom is always on the same frame element.
// displayZoom (not zoom) drives the rendered value so it follows the animation.
const frameStyle = computed(() => {
    const bp = activeBreakpointDef.value
    const z = String(displayZoom.value)
    if (!bp?.width) return { zoom: z }
    return { width: `${bp.width}px`, zoom: z }
})
</script>

<template>
    <div class="my-5" :style="{ '--ui-header-height': '4rem' }">
        <!-- Error state -->
        <div v-if="loadError" class="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
            Example file not found: <code class="font-mono">docs/examples/{{ file }}.vue</code>
        </div>

        <template v-else>
            <!-- ── Controls panel (prop dropdowns) ─────────────────────────── -->
            <div
                v-if="hasControls"
                class="relative flex flex-wrap items-center gap-2.5 overflow-x-auto rounded-t-md border border-b-0 border-muted px-4 py-2.5"
            >
                <template v-for="(ctrl, key) in store.definition" :key="key">
                    <UFormField
                        :label="(ctrl as ControlDefinition).label ?? String(key)"
                        size="sm"
                        class="inline-flex rounded-sm ring ring-accented"
                        :ui="{
                            wrapper: 'bg-elevated/50 rounded-l-sm flex border-r border-accented',
                            label: 'text-muted px-2 py-1.5',
                            container: 'mt-0'
                        }"
                    >
                        <USelect
                            v-if="(ctrl as ControlDefinition).type === 'select'"
                            :model-value="store.values[key]"
                            :items="((ctrl as ControlDefinition).options ?? []).map((o: any) => ({ value: o, label: String(o) }))"
                            value-key="value"
                            color="neutral"
                            variant="soft"
                            class="min-w-12 rounded-sm rounded-l-none"
                            :class="[String(key).toLowerCase().endsWith('color') && 'pl-6']"
                            :ui="{ itemLeadingChip: 'w-2' }"
                            @update:model-value="store.values[key] = $event"
                        >
                            <template v-if="String(key).toLowerCase().endsWith('color')" #leading="{ modelValue, ui }">
                                <UChip
                                    v-if="modelValue"
                                    inset
                                    standalone
                                    :color="(modelValue as any)"
                                    :size="(ui.itemLeadingChipSize() as ChipProps['size'])"
                                    class="size-2"
                                />
                            </template>
                        </USelect>
                        <USelect
                            v-else-if="(ctrl as ControlDefinition).type === 'boolean'"
                            :model-value="store.values[key]"
                            :items="[{ value: true, label: 'true' }, { value: false, label: 'false' }]"
                            value-key="value"
                            color="neutral"
                            variant="soft"
                            class="min-w-12 rounded-sm rounded-l-none"
                            @update:model-value="store.values[key] = $event"
                        />
                        <UInput
                            v-else-if="(ctrl as ControlDefinition).type === 'number'"
                            :model-value="store.values[key]"
                            type="number"
                            :min="(ctrl as ControlDefinition).min"
                            :max="(ctrl as ControlDefinition).max"
                            :step="(ctrl as ControlDefinition).step"
                            color="neutral"
                            variant="soft"
                            :ui="{ base: 'rounded-sm rounded-l-none min-w-12' }"
                            @update:model-value="store.values[key] = Number($event)"
                        />
                        <UInput
                            v-else
                            :model-value="store.values[key]"
                            type="text"
                            color="neutral"
                            variant="soft"
                            :ui="{ base: 'rounded-sm rounded-l-none min-w-12' }"
                            @update:model-value="store.values[key] = $event"
                        />
                    </UFormField>
                </template>
            </div>

            <!-- ── Tab row: Preview | Code · breakpoints · zoom ────────────── -->
            <div
                class="relative flex items-center border border-b-0 border-muted"
                :class="[!hasControls ? 'rounded-t-md' : '']"
            >
                <button
                    class="border-b-2 px-4 py-2 text-sm transition-colors"
                    :class="activeTab === 'preview'
                        ? 'border-primary-500 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                        : 'border-transparent text-muted hover:text-highlighted'"
                    @click="activeTab = 'preview'"
                >
                    Preview
                </button>
                <button
                    class="border-b-2 px-4 py-2 text-sm transition-colors"
                    :class="activeTab === 'code'
                        ? 'border-primary-500 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                        : 'border-transparent text-muted hover:text-highlighted'"
                    @click="activeTab = 'code'"
                >
                    Code
                </button>

                <!-- Breakpoint buttons — centered -->
                <div class="absolute left-1/2 flex -translate-x-1/2 items-center gap-0.5">
                    <UButton
                        v-for="bp in breakpoints"
                        :key="bp.label"
                        :icon="bp.icon"
                        size="xs"
                        :color="activeBreakpoint === bp.label ? 'primary' : 'neutral'"
                        :variant="activeBreakpoint === bp.label ? 'soft' : 'ghost'"
                        :aria-label="bp.label"
                        @click="activeBreakpoint = bp.label as any"
                    />
                </div>

                <!-- Zoom controls — right side -->
                <div class="ml-auto flex items-center gap-0.5 pr-2">
                    <UButton
                        icon="i-lucide-zoom-out"
                        size="xs"
                        variant="ghost"
                        color="neutral"
                        :disabled="zoom <= 0.2"
                        aria-label="Zoom out"
                        @click="adjustZoom(-0.1)"
                    />
                    <button
                        class="w-11 rounded px-1 py-0.5 text-center font-mono text-xs text-muted transition-colors hover:bg-elevated hover:text-highlighted"
                        :title="manualZoom !== null ? `Auto: ${Math.round(autoZoom * 100)}%` : 'Auto zoom'"
                        @click="resetZoom"
                    >
                        {{ zoomPercent }}%
                    </button>
                    <UButton
                        icon="i-lucide-zoom-in"
                        size="xs"
                        variant="ghost"
                        color="neutral"
                        :disabled="zoom >= 1.5"
                        aria-label="Zoom in"
                        @click="adjustZoom(0.1)"
                    />
                </div>
            </div>

            <!-- ── Preview area ────────────────────────────────────────────── -->
            <div
                ref="previewAreaRef"
                v-show="activeTab === 'preview'"
                class="preview-grid relative flex min-h-48 overflow-hidden border border-b-0 border-muted"
                :class="[{ 'overflow-hidden': overflowHidden }]"
            >
                <!-- Dot grid background -->
                <div class="preview-grid__dots pointer-events-none absolute inset-0" />
                <!-- Vignette fade -->
                <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,var(--ui-bg)_100%)]" />

                <!-- Scroll layer: overflow-x allows the zoomed frame to grow beyond the container.
                     scrollLeft is adjusted by JS to keep the frame visually centered. -->
                <div
                    ref="scrollLayerRef"
                    class="relative z-10 flex flex-1 overflow-x-auto"
                    style="overflow-y: hidden;"
                >
                    <!-- Centering box: min-width 100% ensures CSS centering works when content fits;
                         flex-shrink: 0 lets it expand beyond 100% when the frame overflows. -->
                    <div class="flex min-w-full flex-shrink-0 items-center justify-center self-stretch">
                        <!-- Breakpoint width label (outside the zoomed frame so it doesn't scale) -->
                        <div v-if="isBreakpointActive" class="pointer-events-none absolute top-2 z-20 left-1/2 -translate-x-1/2">
                            <span class="preview-frame__label">{{ activeBreakpointDef?.width }}px</span>
                        </div>

                        <!-- Frame: zoom is always on this element so CSS can transition smoothly.
                             In desktop mode: w-full + zoom on content. In breakpoints: fixed width + zoom on frame. -->
                        <div
                            class="preview-frame-base flex items-center justify-center"
                            :class="isBreakpointActive ? 'preview-frame' : 'w-full p-8'"
                            :style="frameStyle"
                        >
                            <component :is="exampleComponent" v-if="exampleComponent" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── Code area ───────────────────────────────────────────────── -->
            <div v-show="activeTab === 'code'">
                <MDCRenderer
                    v-if="codeAst"
                    :body="codeAst.body"
                    :data="codeAst.data"
                    class="[&_pre]:rounded-t-none! [&_.my-5]:mt-0!"
                />
            </div>
        </template>
    </div>
</template>

<style scoped>
.preview-grid {
    background-color: var(--ui-bg);
}

.preview-grid__dots {
    background-image: radial-gradient(circle, var(--preview-dot) 1px, transparent 1px);
    background-size: 24px 24px;
    background-position: center center;
    --preview-dot: color-mix(in oklch, var(--ui-text-muted) 30%, transparent);
}

:global(.dark) .preview-grid__dots {
    --preview-dot: color-mix(in oklch, var(--ui-text-muted) 18%, transparent);
}

/* Breakpoint frame: dashed side borders. CSS zoom scales the whole box (layout + visual). */
.preview-frame {
    position: relative;
    padding: 2rem 1.5rem;
    min-height: 10rem;
    border-left: 1px dashed color-mix(in oklch, var(--ui-text-muted) 50%, transparent);
    border-right: 1px dashed color-mix(in oklch, var(--ui-text-muted) 50%, transparent);
}

/* Width label — rendered outside the frame so it is NOT affected by CSS zoom */
.preview-frame__label {
    display: inline-block;
    font-family: ui-monospace, monospace;
    font-size: 10px;
    line-height: 1;
    white-space: nowrap;
    color: var(--ui-text-muted);
    background: color-mix(in oklch, var(--ui-bg) 85%, transparent);
    padding: 3px 8px;
    border-radius: 9999px;
    border: 1px solid color-mix(in oklch, var(--ui-text-muted) 25%, transparent);
    backdrop-filter: blur(4px);
}
</style>
