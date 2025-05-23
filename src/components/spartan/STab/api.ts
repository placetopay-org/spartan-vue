import { reactive, computed, type Component } from 'vue';
import { UnderlineTab, PillTab, VetchTab, UnderlineTabItem, PillTabItem, VetchTabItem } from './variants';
import type { TTabProps, TTabEmits, TTab } from './types';
import { buildContext } from '@/helpers';

type TState = {
    tabs: TTab[];
    modelValue: string;
    updateModelValue: (value: string) => void;
    variant: { tab: Component; item: Component };
    dropdowns: Record<string, RegExp[]>;
    addDropdown: (id: string, regex: RegExp) => void;
};

export const { createContext, useContext } = buildContext<TState, TTabProps, TTabEmits>({
    name: 'STab',
    state: (props, emit) => {
        const state: TState = reactive({
            modelValue: computed(() => props.modelValue),
            updateModelValue: (value: string) => emit('update:modelValue', value),
            variant: computed(() => {
                const variants = {
                    underline: {
                        tab: UnderlineTab,
                        item: UnderlineTabItem,
                    },
                    pills: {
                        tab: PillTab,
                        item: PillTabItem,
                    },
                    vetches: {
                        tab: VetchTab,
                        item: VetchTabItem,
                    },
                };

                return variants[props.variant || 'underline'];
            }),
            tabs: [],
            dropdowns: {},
            addDropdown: (id: string, regex: RegExp) => {
                if (!id || String(regex) === '/^$/') return;

                state.dropdowns[id] = [...(state.dropdowns[id] || []), regex];
            },
        });

        return state;
    },
});
