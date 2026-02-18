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
}

export interface PreviewDefinition {
    props?: Record<string, ControlDefinition>
}

export interface PreviewStore {
    /** Controls definition registered by usePreview — read by ComponentPreview to render the panel */
    definition: Record<string, ControlDefinition>
    /** Current values — mutated by ComponentPreview on user input, initialised by usePreview */
    values: Record<string, any>
}

export interface UsePreviewReturn {
    controls: ComputedRef<Record<string, any>>
}

export function usePreview(definition: PreviewDefinition): UsePreviewReturn {
    const store = inject<PreviewStore | null>('spartan-preview', null)

    if (store) {
        // Register the definition so the parent (ComponentPreview) can render the controls panel
        store.definition = definition.props ?? {}

        // Initialise values with defaults for any key not yet set
        for (const [key, ctrl] of Object.entries(definition.props ?? {})) {
            if (!(key in store.values)) {
                store.values[key] = ctrl.default ?? null
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

    return { controls }
}
