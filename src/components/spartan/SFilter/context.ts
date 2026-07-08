import { computed, reactive } from 'vue';
import type { SFilterEmits, SFilterProps, SFilterSaved, SFilterValue } from './types';
import { buildContext } from '@/helpers';

// ── Popover manager ────────────────────────────────────────────────────────

export type PopoverHandle = {
    id: symbol;
    close: () => void;
};

export type PopoverManager = {
    register: (handle: PopoverHandle) => void;
    unregister: (id: symbol) => void;
    open: (id: symbol) => void;
    notifyClosed: (id: symbol) => void;
};

const createPopoverManager = (): PopoverManager => {
    const handles = new Map<symbol, PopoverHandle>();
    // `current` is intentionally a closure variable rather than a Ref — only the
    // manager's own methods need to inspect it. Mutations happen synchronously
    // when popovers open or close.
    let current: symbol | null = null;

    return {
        register: (handle) => {
            handles.set(handle.id, handle);
        },
        unregister: (id) => {
            handles.delete(id);
            if (current === id) current = null;
        },
        open: (id) => {
            // Close the previously open popover (if any) before promoting this one.
            if (current && current !== id) {
                handles.get(current)?.close();
            }
            current = id;
        },
        notifyClosed: (id) => {
            if (current === id) current = null;
        },
    };
};

// ── Filter context ─────────────────────────────────────────────────────────

type TState = {
    filters: SFilterProps['filters'];
    value: SFilterValue;
    saved?: SFilterSaved[];
    responsive: boolean;
    activeFieldId: string | undefined;
    popoverManager: PopoverManager;
    selectField: (id: string) => void;
    applyFilter: (id: string, operator: string, value: any) => void;
    removeFilter: (id: string) => void;
    loadSnapshot: (snapshot: SFilterValue) => void;
    saveCurrent: (name: string) => void;
    deleteSaved: (name: string) => void;
};

export const { createContext, useContext } = buildContext<TState, SFilterProps, SFilterEmits>({
    name: 'SFilter',
    state: (props, emit) => {
        const popoverManager = createPopoverManager();

        const state: TState = reactive({
            filters: computed(() => props.filters) as unknown as SFilterProps['filters'],
            // SFilter.vue applies a `withDefaults` for `modelValue`, so by the time the
            // context reads it the value is guaranteed to be an object.
            value: computed(() => props.modelValue as SFilterValue) as unknown as SFilterValue,
            saved: computed(() => props.saved) as unknown as SFilterSaved[] | undefined,
            responsive: computed(() => props.responsive !== false) as unknown as boolean,
            activeFieldId: undefined,
            popoverManager,

            selectField: (id: string) => {
                state.activeFieldId = id;
            },

            applyFilter: (id: string, operator: string, value: any) => {
                const next: SFilterValue = { ...state.value, [id]: { operator, value } };
                emit('update:modelValue', next);
            },

            removeFilter: (id: string) => {
                const next: SFilterValue = { ...state.value };
                delete next[id];
                emit('update:modelValue', next);
            },

            loadSnapshot: (snapshot: SFilterValue) => {
                emit('update:modelValue', { ...snapshot });
                emit('load', { ...snapshot });
            },

            saveCurrent: (name: string) => {
                emit('save', name, { ...state.value });
            },

            deleteSaved: (name: string) => {
                emit('delete', name);
            },
        });

        return state;
    },
});
