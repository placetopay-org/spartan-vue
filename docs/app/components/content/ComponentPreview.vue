<script setup lang="ts">
import { ref, reactive, computed, shallowRef, provide, markRaw, watch, onMounted, onUnmounted } from 'vue'
import type { ChipProps } from '@nuxt/ui'
import type { PreviewStore, ControlDefinition } from '~/composables/usePreview'

const { highlight } = useShikiHighlighter()

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
const codeHtml = ref('')
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
    codeHtml.value = await highlight(rawSource.value)
}

await loadExample(props.file)
watch(() => props.file, loadExample)

// ─── 3. Code display ─────────────────────────────────────────────────────────

// ─── 4. UI state ─────────────────────────────────────────────────────────────

const showCode = ref(false)
const copied = ref(false)
const hasControls = computed(() => Object.keys(store.definition).length > 0)

async function copyCode() {
    try {
        await navigator.clipboard.writeText(rawSource.value)
        copied.value = true
        setTimeout(() => { copied.value = false }, 2000)
    } catch {}
}

// ─── 5. Preview resize ───────────────────────────────────────────────────────

const previewAreaRef = ref<HTMLElement | null>(null)
const previewAreaWidth = ref(0)
// null = full width (desktop); number = pixel width of the content zone
const previewWidth = ref<number | null>(null)
const isDragging = ref(false)

const MIN_PREVIEW_WIDTH = 200
// Must match the `w-4` (16px) Tailwind class on the drag handle element
const HANDLE_WIDTH = 16

onMounted(() => {
    const el = previewAreaRef.value
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
        previewAreaWidth.value = entry.contentRect.width
    })
    ro.observe(el)
    onUnmounted(() => ro.disconnect())
})

const isNarrowed = computed(() => previewWidth.value !== null)

// ─── 6. Drag handle ──────────────────────────────────────────────────────────

function onHandleMousedown(e: MouseEvent) {
    e.preventDefault()
    isDragging.value = true
    window.addEventListener('mousemove', onDragMove)
    window.addEventListener('mouseup', onDragEnd)
}

function onDragMove(e: MouseEvent) {
    const el = previewAreaRef.value
    if (!el) return
    const containerLeft = el.getBoundingClientRect().left
    const newWidth = Math.round(e.clientX - containerLeft)
    const maxWidth = previewAreaWidth.value - HANDLE_WIDTH
    if (newWidth >= maxWidth - 10) {
        previewWidth.value = null
    } else {
        previewWidth.value = Math.max(MIN_PREVIEW_WIDTH, newWidth)
    }
}

function onDragEnd() {
    isDragging.value = false
    window.removeEventListener('mousemove', onDragMove)
    window.removeEventListener('mouseup', onDragEnd)
}

onUnmounted(() => {
    window.removeEventListener('mousemove', onDragMove)
    window.removeEventListener('mouseup', onDragEnd)
})

// ─── 7b. Code panel transition (JS hooks for smooth height animation) ────────

function onCodeEnter(el: Element) {
    const e = el as HTMLElement
    e.style.height = '0'
    e.style.overflow = 'hidden'
    e.style.opacity = '0'
    requestAnimationFrame(() => {
        e.style.transition = 'height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1)'
        e.style.height = e.scrollHeight + 'px'
        e.style.opacity = '1'
    })
}
function onCodeAfterEnter(el: Element) {
    const e = el as HTMLElement
    e.style.cssText = ''
}
function onCodeLeave(el: Element) {
    const e = el as HTMLElement
    e.style.height = e.scrollHeight + 'px'
    e.style.overflow = 'hidden'
    e.style.opacity = '1'
    requestAnimationFrame(() => {
        e.style.transition = 'height 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s cubic-bezier(0.4,0,0.2,1)'
        e.style.height = '0'
        e.style.opacity = '0'
    })
}
function onCodeAfterLeave(el: Element) {
    const e = el as HTMLElement
    e.style.cssText = ''
}

// ─── 8. Zoom ─────────────────────────────────────────────────────────────────

const manualZoom = ref<number | null>(null)
const zoom = computed(() => manualZoom.value ?? 1)
const zoomPercent = computed(() => Math.round(zoom.value * 100))

function adjustZoom(delta: number) {
    const next = parseFloat(Math.max(0.2, Math.min(2, zoom.value + delta)).toFixed(2))
    manualZoom.value = next
}

function resetZoom() {
    manualZoom.value = null
}

// ─── 9. Animated zoom ────────────────────────────────────────────────────────

const displayZoom = ref(zoom.value)

let _rafId: number | null = null
let _animFrom = zoom.value
let _animTarget = zoom.value
let _animStart = 0
const ANIM_DURATION = 280

function _ease(t: number) { return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2 }

function _animFrame(now: number) {
    const t = Math.min((now - _animStart) / ANIM_DURATION, 1)
    displayZoom.value = _animFrom + (_animTarget - _animFrom) * _ease(t)
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
                            label: 'text-muted px-2 py-2',
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

            <!-- ── Toolbar: zoom ──────────────────────────────────────────── -->
            <div
                class="relative flex items-center border border-b-0 border-muted"
                :class="[!hasControls ? 'rounded-t-md' : '']"
            >
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
                        title="Reset zoom"
                        @click="resetZoom"
                    >
                        {{ zoomPercent }}%
                    </button>
                    <UButton
                        icon="i-lucide-zoom-in"
                        size="xs"
                        variant="ghost"
                        color="neutral"
                        :disabled="zoom >= 2"
                        aria-label="Zoom in"
                        @click="adjustZoom(0.1)"
                    />
                </div>
            </div>

            <!-- ── Preview area ────────────────────────────────────────────── -->
            <div
                ref="previewAreaRef"
                class="preview-grid relative flex min-h-48 overflow-hidden border border-b-0 border-muted"
                :class="{ 'select-none cursor-ew-resize': isDragging }"
            >
                <!-- Dot grid background (covers full area including dead space) -->
                <div class="preview-grid__dots pointer-events-none absolute inset-0" />
                <!-- Vignette fade -->
                <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,var(--ui-bg)_100%)]" />

                <!-- Content zone: occupies the "active viewport" width -->
                <div
                    class="relative z-10 flex flex-shrink-0 items-center justify-center overflow-hidden self-stretch"
                    :class="!isNarrowed ? 'flex-1' : ''"
                    :style="isNarrowed ? { width: `${previewWidth}px` } : {}"
                >
                    <!-- Width badge: shown inside the content zone when narrowed -->
                    <div
                        v-if="isNarrowed"
                        class="pointer-events-none absolute left-1/2 top-2 z-20 -translate-x-1/2"
                    >
                        <span class="preview-frame__label">{{ previewWidth }}px</span>
                    </div>

                    <div class="flex w-full items-center justify-center p-8" :style="{ zoom: String(displayZoom) }">
                        <component :is="exampleComponent" v-if="exampleComponent" />
                    </div>
                </div>

                <!-- Drag handle: vertical bar at the right edge of the content zone -->
                <div
                    class="relative z-20 flex w-4 flex-shrink-0 cursor-ew-resize items-center justify-center self-stretch border-l transition-colors"
                    :class="isDragging
                        ? 'border-primary/50 bg-primary/5'
                        : 'border-muted hover:border-primary/30 hover:bg-muted/20'"
                    @mousedown="onHandleMousedown"
                >
                    <!-- 2 × 3 grip dots -->
                    <div class="flex gap-[2px]">
                        <div v-for="col in 2" :key="col" class="flex flex-col gap-[3px]">
                            <span
                                v-for="row in 3"
                                :key="row"
                                class="block h-[3px] w-[3px] rounded-full transition-colors"
                                :class="isDragging ? 'bg-primary/70' : 'bg-muted'"
                            />
                        </div>
                    </div>
                </div>

                <!-- Dead space: fills remaining width when preview is narrowed -->
                <div v-if="isNarrowed" class="preview-dead-space flex-1 self-stretch" />
            </div>

            <!-- ── Code toggle footer ─────────────────────────────────────── -->
            <button
                class="code-toggle-footer group flex w-full items-center justify-between border border-muted px-4 py-2.5 transition-colors"
                :class="showCode ? 'border-b-0 rounded-b-none' : 'rounded-b-md'"
                @click="showCode = !showCode"
            >
                <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-code-2" class="size-3.5 text-muted transition-colors group-hover:text-highlighted" />
                    <span class="text-xs font-medium text-muted transition-colors group-hover:text-highlighted">Code</span>
                </div>
                <UIcon
                    name="i-lucide-chevron-down"
                    class="size-3.5 text-muted transition-all duration-300 group-hover:text-highlighted"
                    :class="showCode ? '-rotate-180' : ''"
                />
            </button>

            <!-- ── Code area ───────────────────────────────────────────────── -->
            <Transition
                @enter="onCodeEnter"
                @after-enter="onCodeAfterEnter"
                @leave="onCodeLeave"
                @after-leave="onCodeAfterLeave"
            >
                <div v-if="showCode" class="group relative">
                    <div v-html="codeHtml" class="shiki-block" />
                    <UButton
                        :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
                        size="xs"
                        color="neutral"
                        variant="subtle"
                        :aria-label="copied ? 'Copied' : 'Copy code'"
                        class="absolute right-2 top-2"
                        :class="copied ? 'text-green-500!' : ''"
                        @click="copyCode"
                    />
                </div>
            </Transition>
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

/* Code toggle footer */
.code-toggle-footer {
    background-color: var(--ui-bg);
}
.code-toggle-footer:hover {
    background-color: color-mix(in oklch, var(--ui-text-muted) 5%, var(--ui-bg));
}

/* Dead space: subtle overlay to indicate it's outside the active viewport */
.preview-dead-space {
    background-color: color-mix(in oklch, var(--ui-text-muted) 6%, transparent);
}

:global(.dark) .preview-dead-space {
    background-color: color-mix(in oklch, var(--ui-bg) 60%, transparent);
}

/* ── Shiki code block ────────────────────────────────────────────────────── */
:global(.shiki-block pre) {
    margin: 0;
    padding: 0.75rem 1rem;
    overflow-x: auto;
    border-radius: 0 0 0.375rem 0.375rem;
    border: 1px solid var(--ui-border-muted);
    border-top: none;
    background-color: var(--ui-bg-muted) !important;
}

/* Collapse the \n text-nodes that Shiki places between .line spans.
   Those nodes live directly in <code> and inherit its line-height, so the
   only reliable way to neutralise them is to zero-out the font-size here
   and restore it on each .line span. */
:global(.shiki-block code) {
    font-size: 0;
}

/* Each line is a block; font-size and line-height are set here, not on <pre>. */
:global(.shiki-block .line) {
    display: block;
    font-size: 0.875rem;
    line-height: 1.5;
}

/* Blank lines: empty spans take minimal height instead of a full line. */
:global(.shiki-block .line:empty) {
    height: 0.5rem;
}

/* Dark mode: switch syntax colors to --shiki-dark variables. */
:global(.dark .shiki-block .shiki span) {
    color: var(--shiki-dark) !important;
    font-style: var(--shiki-dark-font-style, inherit) !important;
    font-weight: var(--shiki-dark-font-weight, inherit) !important;
}

/* Width badge shown inside the content zone */
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
