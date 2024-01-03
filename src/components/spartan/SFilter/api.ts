import { reactive, inject, provide, watch, type InjectionKey, computed } from 'vue';
import type { SFilterEmits, SFilterProps, TField, TOperatorData } from './types';
import { predefinedOperators, predefinedDescriptions, predefinedLabels } from './constants';

type ContextState = {
    activePopoverCloser?: () => boolean;
    apply: () => void;
    clear: () => void;
    togglePopover: (activePopover: any, force?: boolean) => void;
    operatorData: TOperatorData;
    applyFilter: (field: TField, state: TField['state']) => void;
    getDescriptionTranslation: (operator: string) => string;
};

const contextKey = Symbol('SFilterContext') as InjectionKey<ContextState>;

export const createContext = (props: Partial<SFilterProps>, emit: SFilterEmits) => {
    const state: ContextState = reactive({
        activePopoverCloser: undefined,
        operatorData: computed(() => {
            const data: TOperatorData = {};

            props.fields?.forEach((field) => {
                if (!field.interfaces) return;
                Object.keys(field.interfaces).forEach((key) => {
                    const interfaceData = field.interfaces[key as keyof typeof field.interfaces];
                    if (interfaceData) {
                        if (interfaceData.operators) {
                            interfaceData.operators.forEach((operator) => {
                                data[field.id] = {
                                    ...data[field.id],
                                    [operator]: {
                                        label: predefinedLabels[operator],
                                        interface: key,
                                    },
                                };
                            });
                        }

                        if (interfaceData.customOperators) {
                            interfaceData.customOperators.forEach((operator) => {
                                data[field.id] = {
                                    ...data[field.id],
                                    [operator.id]: {
                                        label: operator.translationLabel,
                                        interface: key,
                                    },
                                };
                            });
                        }
                    }
                });
            });

            return data;
        }),
        apply: () => {
            emit('apply', props.fields?.filter((filter) => filter.state));
        },
        clear: () => {
            props.fields?.forEach((filter) => {
                delete filter.state;
            });
        },
        togglePopover: (activePopover: any) => {
            if (activePopover?.isOpen) {
                activePopover?.close();
                state.activePopoverCloser = undefined;
            } else {
                state.activePopoverCloser?.();
                activePopover?.open();
                state.activePopoverCloser = activePopover?.close;
            }
        },
        applyFilter: (field: TField, state: TField['state']) => {
            field.state = state;
        },
        getDescriptionTranslation: (operator: string) => {
            if (predefinedOperators.includes(operator as any))
                return predefinedDescriptions[operator as (typeof predefinedOperators)[number]];
            return 'hola';
        },
    });

    provide(contextKey, state);
    return state;
};

export const useContext = (component: string) => {
    const context = inject(contextKey, null);
    if (context === null) {
        const err = new Error(`<${component} /> is missing parent <SFilter /> component`);
        throw err;
    }
    return context;
};
