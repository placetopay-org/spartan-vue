import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('vue-i18n', async () => {
    const { ref } = await import('vue');
    return {
        useI18n: () => ({
            t: (key: string) => key,
            locale: ref('en'),
        }),
    };
});
