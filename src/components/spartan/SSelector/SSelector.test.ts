import { test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import SSelector from './SSelector.vue';

describe('SSelector', () => {
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

        render(SSelector, {
            props: { options: defaultOptions },
        });

        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('Renders with placeholder', () => {
        setup();

        render(SSelector, {
            props: { options: defaultOptions, placeholder: 'Select one' },
        });

        expect(screen.getByText('Select one')).toBeInTheDocument();
    });

    test('Displays selected value label for string options', () => {
        setup();

        render(SSelector, {
            props: { options: defaultOptions, modelValue: 'Option 1' },
        });

        expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    test('Displays selected value label for object options', () => {
        setup();

        const options = [
            { label: 'Alice', id: 1 },
            { label: 'Bob', id: 2 },
        ];

        render(SSelector, {
            props: { options, modelValue: options[0] },
        });

        expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    test('Displays selected value with custom optionLabel', () => {
        setup();

        const options = [
            { name: 'Alice', id: 1 },
            { name: 'Bob', id: 2 },
        ];

        render(SSelector, {
            props: { options, optionLabel: 'name', modelValue: options[1] },
        });

        expect(screen.getByText('Bob')).toBeInTheDocument();
    });

});
