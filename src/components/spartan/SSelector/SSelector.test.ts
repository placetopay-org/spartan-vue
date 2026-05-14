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

    test('Resolves primitive modelValue against options when optionValue is set', () => {
        setup();

        const options = [
            { name: 'Alice', id: 1 },
            { name: 'Bob', id: 2 },
        ];

        render(SSelector, {
            props: { options, optionLabel: 'name', optionValue: 'id', modelValue: 2 },
        });

        // Default trigger should resolve `2` -> { name: 'Bob', id: 2 } and render the label
        expect(screen.getByText('Bob')).toBeInTheDocument();
    });

    test('trigger slot receives the resolved selected option object', () => {
        setup();

        const options = [
            { name: 'Alice', id: 1, flag: 'A' },
            { name: 'Bob', id: 2, flag: 'B' },
        ];

        render(SSelector, {
            props: { options, optionLabel: 'name', optionValue: 'id', modelValue: 2 },
            slots: {
                trigger: `<template #trigger="{ option }"><span data-testid="custom-trigger">{{ option?.flag }} - {{ option?.name }}</span></template>`,
            },
        });

        const trigger = screen.getByTestId('custom-trigger');
        expect(trigger).toHaveTextContent('B - Bob');
    });

    test('trigger slot falls back to placeholder when no value is selected', () => {
        setup();

        render(SSelector, {
            props: { options: defaultOptions, placeholder: 'Pick something' },
            slots: {
                trigger: `<template #trigger="{ option, placeholder }"><span data-testid="custom-trigger">{{ option ? option : placeholder }}</span></template>`,
            },
        });

        expect(screen.getByTestId('custom-trigger')).toHaveTextContent('Pick something');
    });

    test('trigger slot receives undefined when modelValue does not match any option', () => {
        setup();

        const options = [
            { name: 'Alice', id: 1 },
            { name: 'Bob', id: 2 },
        ];

        render(SSelector, {
            props: { options, optionLabel: 'name', optionValue: 'id', modelValue: 999, placeholder: 'Loading...' },
            slots: {
                trigger: `<template #trigger="{ option, placeholder }"><span data-testid="custom-trigger">{{ option === undefined ? 'no-match: ' + placeholder : option.name }}</span></template>`,
            },
        });

        expect(screen.getByTestId('custom-trigger')).toHaveTextContent('no-match: Loading...');
    });

    test('Default trigger preserves current behavior when slot is omitted', () => {
        setup();

        render(SSelector, {
            props: { options: defaultOptions, modelValue: 'Option 2' },
        });

        expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    test('Resolves primitive modelValue against grouped options', () => {
        setup();

        const options = [
            { group: 'Fruits', items: [{ name: 'Apple', id: 1 }, { name: 'Banana', id: 2 }] },
            { group: 'Veggies', items: [{ name: 'Carrot', id: 3 }] },
        ];

        render(SSelector, {
            props: {
                options,
                optionLabel: 'name',
                optionValue: 'id',
                optionGroupLabel: 'group',
                optionGroupItems: 'items',
                modelValue: 3,
            },
        });

        expect(screen.getByText('Carrot')).toBeInTheDocument();
    });
});
