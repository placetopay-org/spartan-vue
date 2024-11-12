import { reactive, inject, provide, watch, type InjectionKey, computed } from 'vue';
import type { TTabProps, TTabEmits, TTab, Variants } from './types';
import { buildContext } from '@/helpers';

type TState = {
    tabs: Record<TTab['path'], TTab['setActive']>;
    variant: Variants;
    full: boolean;
    registerTab: (tab: TTab) => void;
    updateTab: (path?: string) => void;
};

export const { createContext, useContext } = buildContext<TState, TTabProps, TTabEmits>({
    name: 'STab',
    state: (props, emit) => {
        const state: TState = reactive({
            tabs: {},
            full: computed(() => props.full || false),
            variant: computed(() => props.variant || 'underline'),
            registerTab: (tab: TTab) => {
                state.tabs[tab.path] = tab.setActive;
                if (props.modelValue === tab.path) tab.setActive(true);
            },
            updateTab: (path?: string) => emit('update:modelValue', path),
        });

        watch(
            () => props.modelValue,
            (curr, old) => {
                if (old) state.tabs[old]?.(false);
                if (curr) state.tabs[curr]?.(true);
            },
        );

        return state;
    },
});
