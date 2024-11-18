import { reactive, inject, provide, watch, type InjectionKey, computed } from 'vue';
import type { TTabProps, TTabEmits, TTab, Variants } from './types';
import { buildContext } from '@/helpers';

type TState = {
    tabs: Record<TTab['path'], TTab['setActive']>;
    dropdownResponsive: boolean;
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
            dropdownResponsive: computed(() => props.dropdownResponsive || false),
            full: computed(() => props.full || false),
            variant: computed(() => props.variant || 'underline'),
            registerTab: (tab: TTab) => {
                state.tabs[tab.path] = tab.setActive;
                if (props.modelValue === tab.path) tab.setActive(true);
                if (props.nested && props.modelValue.startsWith(tab.path)) tab.setActive(true);
            },
            updateTab: (path?: string) => emit('update:modelValue', path),
        });

        watch(
            () => props.modelValue,
            (curr, old) => {
                if (props.nested) {
                    Object.keys(state.tabs).forEach((tab) => {
                        if (old.startsWith(tab)) state.tabs[tab]?.(false);
                        if (curr.startsWith(tab)) state.tabs[tab]?.(true);
                    });
                } else {
                    if (old) state.tabs[old]?.(false);
                    if (curr) state.tabs[curr]?.(true);
                }
            },
        );

        return state;
    },
});
