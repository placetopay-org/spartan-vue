import { useI18n } from 'vue-i18n';

export const translator = (namespace: string) => {
    const { t } = useI18n();
    return { t: (key: string) => t(`$spartan.${namespace}.${key}`) };
};
