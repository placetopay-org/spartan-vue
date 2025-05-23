import type { TBlockWrapperProps } from '@internal';
import { computed, type ComputedRef } from 'vue';

export const extractWrapperProps = <T>(props: any): [ComputedRef<TBlockWrapperProps>, ComputedRef<T>] => {
    return [
        computed(() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id, label, helpText, errorText } = props;
            return { id, label, errorText, helpText };
        }),
        computed(() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id, label, helpText, errorText, ...rest } = props;
            return { ...rest, error: errorText ? Boolean(errorText) : props.error };
        }),
    ];
};
