import { test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import SSelector from './SSelector.vue';

describe('SSelector', () => {
    const resizeObserverMock = () => {
        class MockResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        }
        window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
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
            {
                group: 'Fruits',
                items: [
                    { name: 'Apple', id: 1 },
                    { name: 'Banana', id: 2 },
                ],
            },
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

    test('Opens dropdown and emits update:modelValue when an option is selected', async () => {
        setup();
        const user = userEvent.setup();

        const { emitted } = render(SSelector, {
            props: { options: defaultOptions },
        });

        await user.click(screen.getByRole('button'));

        const option = await screen.findByRole('button', { name: 'Option 2' });
        await user.click(option);

        expect(emitted()['update:modelValue']).toBeTruthy();
        expect(emitted()['update:modelValue'][0]).toEqual(['Option 2']);
    });

    test('Emits update:modelValue with undefined when clear button is clicked', async () => {
        setup();
        const user = userEvent.setup();

        const { emitted } = render(SSelector, {
            props: { options: defaultOptions, modelValue: 'Option 1', clearable: true },
        });

        // The outer SelectorButton is buttons[0]; the nested clear button is buttons[1].
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThanOrEqual(2);
        await user.click(buttons[1]);

        expect(emitted()['update:modelValue']).toBeTruthy();
        // `clear` calls `emit('update:modelValue')` with no args, so the call payload is [].
        expect(emitted()['update:modelValue'][0]).toEqual([]);
    });

    test('Emits query event when typing in search input', async () => {
        setup();
        const user = userEvent.setup();

        const { emitted } = render(SSelector, {
            props: { options: defaultOptions, search: true },
        });

        await user.click(screen.getByRole('button'));

        const input = await screen.findByRole('textbox');
        await user.type(input, 'option 1');

        expect(emitted().query).toBeTruthy();
        const lastQuery = emitted().query[emitted().query.length - 1];
        expect(lastQuery).toEqual(['option 1']);
    });

    test('Filters options locally when search is enabled', async () => {
        setup();
        const user = userEvent.setup();

        render(SSelector, {
            props: { options: defaultOptions, search: true },
        });

        await user.click(screen.getByRole('button'));

        const input = await screen.findByRole('textbox');
        await user.type(input, 'option 2');

        expect(screen.queryByRole('button', { name: 'Option 1' })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Option 2' })).toBeInTheDocument();
    });

    test('Does not filter locally when search is set to "manual"', async () => {
        setup();
        const user = userEvent.setup();

        const { emitted } = render(SSelector, {
            props: { options: defaultOptions, search: 'manual' },
        });

        await user.click(screen.getByRole('button'));

        const input = await screen.findByRole('textbox');
        await user.type(input, 'zzz');

        // Manual mode: all options remain visible, only query is emitted
        expect(screen.getByRole('button', { name: 'Option 1' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Option 2' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Option 3' })).toBeInTheDocument();
        expect(emitted().query).toBeTruthy();
    });

    test('Resets computed options when options prop changes', async () => {
        setup();
        const user = userEvent.setup();

        const { rerender } = render(SSelector, {
            props: { options: defaultOptions, search: true },
        });

        await user.click(screen.getByRole('button'));

        const input = await screen.findByRole('textbox');
        await user.type(input, 'option 1');

        // Only Option 1 visible after filtering
        expect(screen.queryByRole('button', { name: 'Option 2' })).not.toBeInTheDocument();

        // Updating options should reset the filter
        await rerender({ options: ['Alpha', 'Beta', 'Gamma'], search: true });

        expect(screen.getByRole('button', { name: 'Alpha' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Beta' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Gamma' })).toBeInTheDocument();
    });

    test('flatOptions handles entries that are not array group containers', () => {
        setup();

        // When optionGroupItems is set but an option does not have an array under that key,
        // flatOptions should fall back to treating that option as a leaf.
        const options = [
            { group: 'Fruits', items: [{ name: 'Apple', id: 1 }] },
            { name: 'Loose', id: 99 },
        ];

        render(SSelector, {
            props: {
                options,
                optionLabel: 'name',
                optionValue: 'id',
                optionGroupLabel: 'group',
                optionGroupItems: 'items',
                modelValue: 99,
            },
        });

        expect(screen.getByText('Loose')).toBeInTheDocument();
    });

    test('Marks the selected primitive option inside the dropdown', async () => {
        setup();
        const user = userEvent.setup();

        render(SSelector, {
            props: { options: defaultOptions, modelValue: 'Option 2' },
        });

        await user.click(screen.getAllByRole('button')[0]);

        // Exercises the primitive branch of `isSelected` (option === modelValue).
        const matches = await screen.findAllByRole('button', { name: 'Option 2' });
        const selectedOption = matches.find((el) => el.querySelector('svg.text-spartan-primary-500'));
        expect(selectedOption).toBeDefined();
    });

    test('Marks the selected object option inside the dropdown', async () => {
        setup();
        const user = userEvent.setup();

        const options = [
            { label: 'Alice', id: 1 },
            { label: 'Bob', id: 2 },
        ];

        render(SSelector, {
            props: { options, modelValue: options[0] },
        });

        await user.click(screen.getAllByRole('button')[0]);

        // Once the dropdown is open, `isSelected` runs for every option, exercising
        // the object branch (no `optionValue` → falls back to deep object equality).
        // Exactly one option should render the check icon — the selected one.
        const aliceMatches = await screen.findAllByRole('button', { name: /Alice/ });
        const selectedOption = aliceMatches.find((el) => el.querySelector('svg.text-spartan-primary-500'));
        expect(selectedOption).toBeDefined();
    });

    test('Marks the selected object option using optionValue inside the dropdown', async () => {
        setup();
        const user = userEvent.setup();

        const options = [
            { name: 'Alice', id: 1 },
            { name: 'Bob', id: 2 },
        ];

        render(SSelector, {
            props: { options, optionLabel: 'name', optionValue: 'id', modelValue: 2 },
        });

        await user.click(screen.getAllByRole('button')[0]);

        const bobMatches = await screen.findAllByRole('button', { name: /Bob/ });
        const selectedOption = bobMatches.find((el) => el.querySelector('svg.text-spartan-primary-500'));
        expect(selectedOption).toBeDefined();
    });

    test('Clears the search input and emits empty query when the popover closes', async () => {
        setup();
        const user = userEvent.setup();

        const { emitted } = render(SSelector, {
            props: { options: defaultOptions, search: true },
        });

        // Open dropdown
        await user.click(screen.getAllByRole('button')[0]);

        const input = (await screen.findByRole('textbox')) as HTMLInputElement;
        await user.type(input, 'option 1');
        expect(input.value).toBe('option 1');

        // Selecting an option closes the popover, which triggers `refreshInput`
        const option = await screen.findByRole('button', { name: 'Option 1' });
        await user.click(option);

        // The last `query` event should have been emitted with '' from refreshInput
        const queries = emitted().query as unknown[][];
        expect(queries[queries.length - 1]).toEqual(['']);
    });

    test('Returns undefined when primitive modelValue is resolved against object options without optionValue', () => {
        setup();

        // modelValue is primitive (a number) and options are objects, but optionValue is NOT set.
        // The resolver should give up and produce no label.
        render(SSelector, {
            props: {
                options: [
                    { name: 'Alice', id: 1 },
                    { name: 'Bob', id: 2 },
                ],
                optionLabel: 'name',
                modelValue: 1,
            },
        });

        expect(screen.queryByText('Alice')).not.toBeInTheDocument();
        expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    });

    test('Filters object options locally when search is enabled', async () => {
        setup();
        const user = userEvent.setup();

        const options = [
            { label: 'Alice', id: 1 },
            { label: 'Bob', id: 2 },
            { label: 'Charlie', id: 3 },
        ];

        render(SSelector, {
            props: { options, search: true },
        });

        await user.click(screen.getAllByRole('button')[0]);

        const input = await screen.findByRole('textbox');
        await user.type(input, 'ali');

        expect(screen.getByRole('button', { name: 'Alice' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Bob' })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Charlie' })).not.toBeInTheDocument();
    });

    test('Returns undefined label when no option matches and no placeholder is set', () => {
        setup();

        render(SSelector, {
            props: {
                options: [
                    { name: 'Alice', id: 1 },
                    { name: 'Bob', id: 2 },
                ],
                optionLabel: 'name',
                optionValue: 'id',
                modelValue: 999,
            },
        });

        // Nothing should be shown in the trigger besides the chevron icon
        expect(screen.queryByText('Alice')).not.toBeInTheDocument();
        expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    });
});
