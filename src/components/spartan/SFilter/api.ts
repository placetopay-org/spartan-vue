import { reactive, inject, provide, type InjectionKey, computed } from 'vue';
import type { SFilterEmits, SFilterProps, TField, TOperatorData, TInterfaceId } from './types';
import { translator } from '@/helpers';

type ContextState = {
    activePopoverCloser?: () => boolean;
    apply: () => void;
    clear: () => void;
    togglePopover: (activePopover: any, force?: boolean) => void;
    operatorData: TOperatorData;
    applyFilter: (field: TField, state: TField['state']) => void;
    getOperatorLabel: (field: TField) => string;
};

const contextKey = Symbol('SFilterContext') as InjectionKey<ContextState>;

export const createContext = (props: Partial<SFilterProps>, emit: SFilterEmits) => {
    const state: ContextState = reactive({
        activePopoverCloser: undefined,
        operatorData: computed(() => {
            const data: TOperatorData = {};

            props.fields?.forEach((field) => {
                if (!field.interfaces) return;
                Object.keys(field.interfaces).forEach((value) => {
                    const key = value as TInterfaceId;
                    const interfaceData = field.interfaces[key];
                    if (interfaceData) {
                        const { t } = translator('filter');
                        if (interfaceData.operators) {
                            interfaceData.operators.forEach((operator) => {
                                data[field.id] = {
                                    ...data[field.id],
                                    [operator]: {
                                        label: t(`operator.${operator}`),
                                        description: t(`operator.${operator}_description`),
                                        interface: key,
                                    },
                                };
                            });
                        }

                        if (interfaceData.customOperators) {
                            interfaceData.customOperators.forEach((operator) => {
                                const isString = typeof operator === 'string';
                                data[field.id] = {
                                    ...data[field.id],
                                    [isString ? operator : operator.id]: {
                                        label: isString ? t(`operator.${operator}`) : operator.label,
                                        description: isString
                                            ? t(`operator.${operator}_description`)
                                            : operator.description,
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
            const fields: Omit<TField, 'interfaces'>[] = [];
            props.fields?.forEach((field) => {
                if (field.state) {
                    const { interfaces, ...rest } = field;
                    fields.push({ ...rest });
                }
            });
            emit('apply', fields);
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
        getOperatorLabel: (field: TField) => {
            const operator = field.state!.operator;
            return state.operatorData[field.id][operator].label;
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
