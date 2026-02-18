import { inject, computed, type ComputedRef } from 'vue'

export type ControlType = 'select' | 'boolean' | 'text' | 'number'

export interface ControlDefinition {
    type: ControlType
    /** Options array for 'select' type */
    options?: (string | number | boolean)[]
    default?: any
    label?: string
    /** For 'number' type */
    min?: number
    max?: number
    step?: number
    /** Always include this prop in the generated code, even when the value matches the default */
    required?: boolean
}

export interface SlotDefinition {
    /** Default text content for the slot */
    default?: string
    label?: string
}

export interface PreviewDefinition {
    /** 'playground' = first/usage example full panel; default = 'feature' bar */
    mode?: 'playground' | 'feature'
    /** Component name for code generation */
    component?: string
    props?: Record<string, ControlDefinition>
    /** Slot content controls: text inputs */
    slots?: Record<string, SlotDefinition>
}

export interface PreviewStore {
    /** Controls definition registered by usePreview — read by ComponentPreview to render the panel */
    definition: Record<string, ControlDefinition>
    /** Slot definitions registered by usePreview */
    slotDefinition: Record<string, SlotDefinition>
    /** Current prop values — mutated by ComponentPreview on user input, initialised by usePreview */
    values: Record<string, any>
    /** Current slot content values */
    slotValues: Record<string, string>
    /** 'playground' shows full panel; 'feature' shows minimal pill bar */
    mode: 'playground' | 'feature'
    /** Component name used for live code generation */
    component: string
}

export interface UsePreviewReturn {
    controls: ComputedRef<Record<string, any>>
    slots: ComputedRef<Record<string, string>>
}

export function usePreview(definition: PreviewDefinition): UsePreviewReturn {
    const store = inject<PreviewStore | null>('spartan-preview', null)

    if (store) {
        // Register props definition
        store.definition = definition.props ?? {}
        // Register slots definition
        store.slotDefinition = definition.slots ?? {}
        // Register mode and component name
        store.mode = definition.mode ?? 'feature'
        store.component = definition.component ?? ''

        // Initialise prop values with defaults
        for (const [key, ctrl] of Object.entries(definition.props ?? {})) {
            if (!(key in store.values)) {
                store.values[key] = ctrl.default ?? null
            }
        }

        // Initialise slot values with defaults
        for (const [key, slotDef] of Object.entries(definition.slots ?? {})) {
            if (!(key in store.slotValues)) {
                store.slotValues[key] = slotDef.default ?? ''
            }
        }
    }

    const controls: ComputedRef<Record<string, any>> = computed(() => {
        return Object.fromEntries(
            Object.entries(definition.props ?? {}).map(([key, ctrl]) => [
                key,
                store ? store.values[key] : (ctrl.default ?? null),
            ])
        )
    })

    const slots: ComputedRef<Record<string, string>> = computed(() => {
        return Object.fromEntries(
            Object.entries(definition.slots ?? {}).map(([key, slotDef]) => [
                key,
                store ? store.slotValues[key] : (slotDef.default ?? ''),
            ])
        )
    })

    return { controls, slots }
}
