import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('vue-i18n', async (importOriginal) => {
    // const mod = await importOriginal<typeof import('vue-i18n')>()
    return {
        useI18n: () => ({
            t: (key: string) => key,
        }),
    };
});
