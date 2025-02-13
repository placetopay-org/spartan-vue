import { markRaw } from 'vue'
import SToast from './SToast.vue';
import { toast as vsToast, Toaster as SToaster, type ToasterProps } from 'vue-sonner';
import type { TToastProps } from './types';

export { SToaster };
export const toast = (props: TToastProps & ToasterProps) => {
    const { type, title, description, closeable, leftBorder, ...toastProps } = props;
    vsToast.custom(markRaw(SToast), { ...toastProps,  componentProps: props });
};
