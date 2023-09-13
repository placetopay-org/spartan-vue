import { ref } from 'vue';
import type { TField } from './types';

export const closeActivePopover = ref();

export const customFilterManager = {
    get: () =>
        JSON.parse(localStorage.getItem('customFilters') || '[]') as {
            name: string;
            data: TField[];
        }[],
    add: (name: string, data: TField[]) => {
        const filters = customFilterManager.get();
        filters.push({ name, data });
        localStorage.setItem('customFilters', JSON.stringify(filters));
    },
};
