import { reactive, inject, provide, type InjectionKey, computed } from 'vue';
import { SPopover } from '..';
import type { NFilterProps, NFilterEmits, TField, TInterfaceId, TOperatorData } from './types';
import { buildLabel } from './helpers';

type ContextState = {
    fields?: TField[];
    activeField?: TField;
    switchPopover: (popover?: InstanceType<typeof SPopover>) => void;
    selectField: (id: string) => void;
    getOperatorLabel: (field: TField) => string | undefined;
    operatorData: TOperatorData;
};

const contextKey = Symbol('SFilterContext') as InjectionKey<ContextState>;

export const createContext = (props: Partial<NFilterProps>, emit: NFilterEmits) => {
    let currentPopover: InstanceType<typeof SPopover> | undefined;

    const state: ContextState = reactive({
         fields: props.fields,
         activeField: undefined,
         switchPopover: (popover?: InstanceType<typeof SPopover>) => {
            currentPopover?.close();
            currentPopover = popover;
            currentPopover?.open();
         },
         selectField: (id: string) => {
            state.activeField = state.fields?.find((field) => field.id === id);
         },
         getOperatorLabel: (field: TField) => {
            const fieldState = field.state;
            if (!fieldState) return;

            return buildLabel(fieldState.operator, fieldState.value);
        },
         operatorData: computed(() => {
            const data: TOperatorData = {};

            props.fields?.forEach((field) => {
                data[field.id] = {
                    operators: [],
                    interfaces: {},
                };

                if (!field.interfaces) return;

                Object.keys(field.interfaces).forEach((value) => {
                    const key = value as TInterfaceId;
                    const interfaceData = field.interfaces[key];
                    if (interfaceData) {
                        if (interfaceData.operators) {
                            interfaceData.operators.forEach((operator) => {
                                data[field.id].operators.push({ id: operator, label: operator });
                                data[field.id].interfaces[operator] = key;
                            });
                        }

                        if (interfaceData.customOperators) {
                            interfaceData.customOperators.forEach((operator) => {
                                const isString = typeof operator === 'string';
                                const operatorId = isString ? operator : operator.id;
                                const operatorLabel = isString ? operator : operator.label;

                                data[field.id].operators.push({ id: operatorId, label: operatorLabel });
                                data[field.id].interfaces[operatorId] = key;
                            });
                        }
                    }
                });
            });

            return data;
        }),
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