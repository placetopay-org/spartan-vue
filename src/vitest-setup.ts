import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// PrimeVue uses matchMedia for responsive behavior
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

vi.mock('vue-i18n', async () => {
    const { ref } = await import('vue');
    return {
        useI18n: () => ({
            t: (key: string) => key,
            locale: ref('en'),
        }),
    };
});
