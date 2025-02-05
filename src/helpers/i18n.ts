import { useI18n } from 'vue-i18n';

export const translator = (namespace: string) => {
    const { t } = useI18n();
    return { t: (key: string, params: Record<string, string | undefined> = {}) => t(`$spartan.${namespace}.${key}`, params) };
};
