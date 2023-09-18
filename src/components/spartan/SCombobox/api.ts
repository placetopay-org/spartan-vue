import { ref } from 'vue';

export type TOption = {
    label: string;
    value: string;
};

export const currentSelection = ref<TOption>();
