import { test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SMultiSelector from './SMultiSelector.vue';

describe('SMultiSelector', () => {
    const resizeObserverMock = () => {
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));
    };

    const matchMediaMock = () => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation((query) => ({
                matches: true,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });
    };

    const setup = () => {
        resizeObserverMock();
        matchMediaMock();
    };

    const defaultOptions = ['Option 1', 'Option 2', 'Option 3'];

    test('Can be rendered', () => {
        setup();

        render(SMultiSelector, {
            props: { options: defaultOptions },
        });

        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('Renders with placeholder when no value selected', () => {
        setup();

        render(SMultiSelector, {
            props: { options: defaultOptions, placeholder: 'Select items' },
        });

        expect(screen.getByText('Select items')).toBeInTheDocument();
    });

    test('Displays selected values as badges', () => {
        setup();

        render(SMultiSelector, {
            props: { options: defaultOptions, modelValue: ['Option 1', 'Option 2'] },
        });

        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    test('Shows compact count text when compact is enabled', () => {
        setup();

        render(SMultiSelector, {
            props: { options: defaultOptions, modelValue: ['Option 1', 'Option 2', 'Option 3'], compact: true },
        });

        expect(screen.getByText(/3/)).toBeInTheDocument();
    });

    test('Shows +N badge when count is exceeded', () => {
        setup();

        render(SMultiSelector, {
            props: { options: defaultOptions, modelValue: ['Option 1', 'Option 2', 'Option 3'], count: 1 },
        });

        expect(screen.getByText('+2')).toBeInTheDocument();
    });

    test('Displays object options with custom optionLabel', () => {
        setup();

        const options = [
            { name: 'Alice', id: 1 },
            { name: 'Bob', id: 2 },
        ];

        render(SMultiSelector, {
            props: { options, optionLabel: 'name', modelValue: [options[0]] },
        });

        expect(screen.getByText('Alice')).toBeInTheDocument();
    });
});
