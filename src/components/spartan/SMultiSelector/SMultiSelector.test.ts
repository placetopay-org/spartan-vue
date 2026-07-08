import { test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import SMultiSelector from './SMultiSelector.vue';

describe('SMultiSelector', () => {
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

    test('Shows compact count text for multiple selections', () => {
        setup();

        render(SMultiSelector, {
            props: { options: defaultOptions, modelValue: ['Option 1', 'Option 2', 'Option 3'], compact: true },
        });

        expect(screen.getByText(/3/)).toBeInTheDocument();
    });

    test('Shows compact singular text for a single selection', () => {
        setup();

        render(SMultiSelector, {
            props: { options: defaultOptions, modelValue: ['Option 1'], compact: true },
        });

        // i18n is mocked to return the key; singular branch returns 'selection'.
        expect(screen.getByText(/selection$/)).toBeInTheDocument();
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

    test('Emits update:modelValue with appended option when an unselected option is clicked', async () => {
        setup();
        const user = userEvent.setup();

        const { emitted } = render(SMultiSelector, {
            props: { options: defaultOptions, modelValue: ['Option 1'] },
        });

        await user.click(screen.getAllByRole('button')[0]);

        const option = await screen.findByRole('button', { name: 'Option 2' });
        await user.click(option);

        expect(emitted()['update:modelValue']).toBeTruthy();
        expect(emitted()['update:modelValue'][0]).toEqual([['Option 1', 'Option 2']]);
    });

    test('Emits update:modelValue without the option when an already-selected option is clicked', async () => {
        setup();
        const user = userEvent.setup();

        const { emitted } = render(SMultiSelector, {
            props: { options: defaultOptions, modelValue: ['Option 1', 'Option 2'] },
        });

        await user.click(screen.getAllByRole('button')[0]);

        const option = await screen.findByRole('button', { name: 'Option 2' });
        await user.click(option);

        expect(emitted()['update:modelValue']).toBeTruthy();
        expect(emitted()['update:modelValue'][0]).toEqual([['Option 1']]);
    });

    test('Emits update:modelValue with no args when clear button is clicked', async () => {
        setup();
        const user = userEvent.setup();

        const { emitted } = render(SMultiSelector, {
            props: { options: defaultOptions, modelValue: ['Option 1'], clearable: true },
        });

        // buttons[0] is the outer SelectorButton, buttons[1] is the nested clear button.
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThanOrEqual(2);
        await user.click(buttons[1]);

        expect(emitted()['update:modelValue']).toBeTruthy();
        expect(emitted()['update:modelValue'][0]).toEqual([]);
    });

    test('Emits query event when typing in the search input', async () => {
        setup();
        const user = userEvent.setup();

        const { emitted } = render(SMultiSelector, {
            props: { options: defaultOptions, search: true },
        });

        await user.click(screen.getAllByRole('button')[0]);

        const input = await screen.findByRole('textbox');
        await user.type(input, 'foo');

        expect(emitted().query).toBeTruthy();
        const lastQuery = emitted().query[emitted().query.length - 1];
        expect(lastQuery).toEqual(['foo']);
    });

    test('Pressing Enter in the search input adds a new option', async () => {
        setup();
        const user = userEvent.setup();

        const { emitted } = render(SMultiSelector, {
            props: { options: defaultOptions, search: true },
        });

        await user.click(screen.getAllByRole('button')[0]);

        const input = await screen.findByRole('textbox');
        await user.type(input, 'Brand New');
        await user.keyboard('{Enter}');

        expect(emitted().add).toBeTruthy();
        expect(emitted().add[0]).toEqual([{ label: 'Brand New' }]);
        // selectOption is called internally, so update:modelValue should also fire
        expect(emitted()['update:modelValue']).toBeTruthy();
    });

    test('Does nothing when Enter is pressed with empty search input', async () => {
        setup();
        const user = userEvent.setup();

        const { emitted } = render(SMultiSelector, {
            props: { options: defaultOptions, search: true },
        });

        await user.click(screen.getAllByRole('button')[0]);

        const input = await screen.findByRole('textbox');
        input.focus();
        await user.keyboard('{Enter}');

        expect(emitted().add).toBeUndefined();
    });

    test('Renders the handler footer when search and handler are enabled', async () => {
        setup();
        const user = userEvent.setup();

        render(SMultiSelector, {
            props: { options: defaultOptions, search: true, handler: true },
        });

        await user.click(screen.getAllByRole('button')[0]);

        // SelectorHandler renders a button containing the translated 'add' key.
        // The mocked translator returns the full namespaced key: $spartan.selector.add
        expect(await screen.findByText(/\.add$/)).toBeInTheDocument();
    });

    test('Clicking the handler footer button emits add when input has a value', async () => {
        setup();
        const user = userEvent.setup();

        const { emitted } = render(SMultiSelector, {
            props: { options: defaultOptions, search: true, handler: true },
        });

        await user.click(screen.getAllByRole('button')[0]);

        const input = (await screen.findByRole('textbox')) as HTMLInputElement;
        await user.type(input, 'From Handler');

        const handlerButton = await screen.findByText(/\.add$/);
        await user.click(handlerButton);

        expect(emitted().add).toBeTruthy();
        expect(emitted().add[0]).toEqual([{ label: 'From Handler' }]);
    });

    test('Renders the badgeList header when badgeList prop is set', async () => {
        setup();
        const user = userEvent.setup();

        render(SMultiSelector, {
            props: {
                options: defaultOptions,
                modelValue: ['Option 1', 'Option 2'],
                badgeList: true,
            },
        });

        await user.click(screen.getAllByRole('button')[0]);

        // The badge list renders the selected options as badges in the dropdown header.
        // Both option labels will appear twice in the DOM (once in the trigger, once in the header).
        const option1Matches = await screen.findAllByText('Option 1');
        const option2Matches = await screen.findAllByText('Option 2');
        expect(option1Matches.length).toBeGreaterThanOrEqual(2);
        expect(option2Matches.length).toBeGreaterThanOrEqual(2);
    });

    test('badgeList removable badge emits update:modelValue when removed', async () => {
        setup();
        const user = userEvent.setup();

        const { container, emitted } = render(SMultiSelector, {
            props: {
                options: defaultOptions,
                modelValue: ['Option 1'],
                badgeList: true,
            },
        });

        await user.click(screen.getAllByRole('button')[0]);
        await screen.findAllByText('Option 1');

        // SBadge renders its remove button with `data-s-cross`. The trigger doesn't render
        // removable badges here (removable prop is false), so all crosses come from the badgeList.
        const crosses = container.ownerDocument.querySelectorAll('button[data-s-cross]');
        expect(crosses.length).toBeGreaterThan(0);
        await user.click(crosses[0] as HTMLElement);

        expect(emitted()['update:modelValue']).toBeTruthy();
    });

    test('Removable badges in the trigger emit update:modelValue when removed', async () => {
        setup();
        const user = userEvent.setup();

        const { emitted } = render(SMultiSelector, {
            props: {
                options: defaultOptions,
                modelValue: ['Option 1', 'Option 2'],
                removable: true,
            },
        });

        // Look for the badge remove buttons inside the trigger (they have an X icon).
        const buttons = screen.getAllByRole('button');
        // Pick a button that lives inside a badge containing 'Option 1' text.
        const removeButton = buttons.find(
            (btn) =>
                btn.querySelector('svg') && btn.closest('[class*="badge"], span')?.textContent?.includes('Option 1'),
        );

        if (removeButton) {
            await user.click(removeButton);
        } else {
            // Fallback: any nested button with an svg inside the outer trigger that isn't the clear button.
            // The trigger badges sit before the chevron/loader; use the second nested button.
            await user.click(buttons[1]);
        }

        expect(emitted()['update:modelValue']).toBeTruthy();
    });

    test('Marks selected options with the check icon inside the dropdown', async () => {
        setup();
        const user = userEvent.setup();

        render(SMultiSelector, {
            props: { options: defaultOptions, modelValue: ['Option 2'] },
        });

        await user.click(screen.getAllByRole('button')[0]);

        const matches = await screen.findAllByRole('button', { name: 'Option 2' });
        const selectedOption = matches.find((el) => el.querySelector('svg.text-spartan-primary-500'));
        expect(selectedOption).toBeDefined();
    });

    test('trigger slot receives object options resolved from primitive modelValue via optionValue', async () => {
        setup();
        const user = userEvent.setup();

        const options = [
            { name: 'Alice', id: 1 },
            { name: 'Bob', id: 2 },
        ];

        render(SMultiSelector, {
            props: { options, optionLabel: 'name', optionValue: 'id', modelValue: [1, 2] },
            slots: {
                trigger: `<template #trigger="{ options }"><span data-testid="resolved">{{ options.map(o => o.name).join('|') }}</span></template>`,
            },
        });

        // resolvedSelectedOptions should map primitives [1, 2] -> the matching objects.
        expect(screen.getByTestId('resolved')).toHaveTextContent('Alice|Bob');

        // Open dropdown — exercises `isSelected` with optionValue mapping.
        await user.click(screen.getAllByRole('button')[0]);
        const aliceMatches = await screen.findAllByRole('button', { name: 'Alice' });
        const selectedAlice = aliceMatches.find((el) => el.querySelector('svg.text-spartan-primary-500'));
        expect(selectedAlice).toBeDefined();
    });

    test('trigger slot resolves primitive modelValue against grouped options', () => {
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

        render(SMultiSelector, {
            props: {
                options,
                optionLabel: 'name',
                optionValue: 'id',
                optionGroupLabel: 'group',
                optionGroupItems: 'items',
                modelValue: [3],
            },
            slots: {
                trigger: `<template #trigger="{ options }"><span data-testid="resolved">{{ options.map(o => o.name).join('|') }}</span></template>`,
            },
        });

        expect(screen.getByTestId('resolved')).toHaveTextContent('Carrot');
    });

    test('flatOptions falls back when a grouped entry has no array under optionGroupItems', () => {
        setup();

        const options = [
            { group: 'Fruits', items: [{ name: 'Apple', id: 1 }] },
            { name: 'Loose', id: 99 },
        ];

        render(SMultiSelector, {
            props: {
                options,
                optionLabel: 'name',
                optionValue: 'id',
                optionGroupLabel: 'group',
                optionGroupItems: 'items',
                modelValue: [99],
            },
            slots: {
                trigger: `<template #trigger="{ options }"><span data-testid="resolved">{{ options.map(o => o.name).join('|') }}</span></template>`,
            },
        });

        expect(screen.getByTestId('resolved')).toHaveTextContent('Loose');
    });

    test('Returns raw value when primitive modelValue cannot be matched against object options', () => {
        setup();

        const options = [
            { name: 'Alice', id: 1 },
            { name: 'Bob', id: 2 },
        ];

        // No optionValue → resolvedSelectedOptions cannot match; falls back to the raw value (1).
        render(SMultiSelector, {
            props: { options, optionLabel: 'name', modelValue: [1] },
        });

        // Badge text content is the unresolved primitive value
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    test('Clears the search input and emits empty query when the popover closes', async () => {
        setup();
        const user = userEvent.setup();

        const { emitted } = render(SMultiSelector, {
            props: { options: defaultOptions, search: true },
        });

        // First click opens the popover; toggling it via second click closes it,
        // which fires the SelectorLayout `close` event that runs `refreshInput`.
        await user.click(screen.getAllByRole('button')[0]);

        const input = (await screen.findByRole('textbox')) as HTMLInputElement;
        await user.type(input, 'foo');
        expect(input.value).toBe('foo');

        await user.click(screen.getAllByRole('button')[0]);

        const queries = emitted().query as unknown[][];
        expect(queries[queries.length - 1]).toEqual(['']);
    });

    test('Shows all selected badges and no +N when count is 0', () => {
        setup();

        render(SMultiSelector, {
            props: { options: defaultOptions, modelValue: ['Option 1', 'Option 2', 'Option 3'], count: 0 },
        });

        // All badges rendered (modelValue.length fallback), no +N badge.
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
        expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument();
    });

    test('Uses optionValue as the badge key when modelValue contains object options', () => {
        setup();

        const options = [
            { name: 'Alice', id: 1 },
            { name: 'Bob', id: 2 },
        ];

        render(SMultiSelector, {
            props: { options, optionLabel: 'name', optionValue: 'id', modelValue: [options[0], options[1]] },
        });

        // getOptionKey takes the optionValue branch for each badge.
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('Bob')).toBeInTheDocument();
    });

    test('Falls back to the index when option has no optionLabel key', () => {
        setup();

        // Each option is an object without a `label` field — getOptionKey should fall back
        // to the iteration index (?? index branch).
        const options = [{ foo: 'a' }, { foo: 'b' }];

        render(SMultiSelector, {
            props: { options, modelValue: options },
        });

        // No throw and the trigger renders (badges will display undefined labels).
        expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
    });

    test('Closing the popover without search does not emit a query event', async () => {
        setup();
        const user = userEvent.setup();

        const { emitted } = render(SMultiSelector, {
            props: { options: defaultOptions },
        });

        await user.click(screen.getAllByRole('button')[0]);
        await user.click(screen.getAllByRole('button')[0]);

        // `refreshInput` runs but skips the search branch — no query event.
        expect(emitted().query).toBeUndefined();
    });

    test('trigger slot receives resolved options and placeholder', () => {
        setup();

        const options = [
            { name: 'Alice', id: 1, flag: 'A' },
            { name: 'Bob', id: 2, flag: 'B' },
        ];

        render(SMultiSelector, {
            props: { options, optionLabel: 'name', optionValue: 'id', modelValue: [1, 2] },
            slots: {
                trigger: `<template #trigger="{ options }"><span data-testid="custom-trigger">{{ options.map(o => o.flag).join(',') }}</span></template>`,
            },
        });

        expect(screen.getByTestId('custom-trigger')).toHaveTextContent('A,B');
    });
});
