import { test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import SSelectorBlock from './SSelectorBlock.vue';

describe('SSelectorBlock', () => {
    const resizeObserverMock = () => {
        window.ResizeObserver = vi.fn(function (this: any) {
            this.observe = vi.fn();
            this.unobserve = vi.fn();
            this.disconnect = vi.fn();
        }) as unknown as typeof ResizeObserver;
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

    test('Can be rendered with a label', () => {
        setup();

        render(SSelectorBlock, {
            props: { options: defaultOptions, label: 'My field' },
        });

        expect(screen.getByText('My field')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('trigger slot receives the resolved selected option', () => {
        setup();

        const options = [
            { name: 'Alice', id: 1, flag: 'A' },
            { name: 'Bob', id: 2, flag: 'B' },
        ];

        render(SSelectorBlock, {
            props: { options, optionLabel: 'name', optionValue: 'id', modelValue: 1 },
            slots: {
                trigger: `<template #trigger="{ option }"><span data-testid="custom-trigger">{{ option?.flag }}-{{ option?.name }}</span></template>`,
            },
        });

        expect(screen.getByTestId('custom-trigger')).toHaveTextContent('A-Alice');
    });

    test('trigger slot receives placeholder when no value is selected', () => {
        setup();

        render(SSelectorBlock, {
            props: { options: defaultOptions, placeholder: 'Pick something' },
            slots: {
                trigger: `<template #trigger="{ placeholder }"><span data-testid="custom-trigger">empty: {{ placeholder }}</span></template>`,
            },
        });

        expect(screen.getByTestId('custom-trigger')).toHaveTextContent('empty: Pick something');
    });

    test('Default trigger renders the label when no slot is provided', () => {
        setup();

        render(SSelectorBlock, {
            props: { options: defaultOptions, modelValue: 'Option 2' },
        });

        expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    test('Default trigger renders placeholder when no value is selected', () => {
        setup();

        render(SSelectorBlock, {
            props: { options: defaultOptions, placeholder: 'Choose…' },
        });

        expect(screen.getByText('Choose…')).toBeInTheDocument();
    });

    test('option slot receives the iterated option in the dropdown', async () => {
        setup();
        const user = userEvent.setup();

        const options = [
            { name: 'Alice', id: 1 },
            { name: 'Bob', id: 2 },
        ];

        render(SSelectorBlock, {
            props: { options, optionLabel: 'name', optionValue: 'id' },
            slots: {
                option: `<template #option="{ option }"><span :data-testid="option ? 'opt-' + option.id : 'opt-probe'">{{ option ? 'custom-' + option.name : '' }}</span></template>`,
            },
        });

        await user.click(screen.getByRole('button'));

        expect(screen.getByTestId('opt-1')).toHaveTextContent('custom-Alice');
        expect(screen.getByTestId('opt-2')).toHaveTextContent('custom-Bob');
    });
});
