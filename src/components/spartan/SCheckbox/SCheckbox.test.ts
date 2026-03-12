import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SCheckbox from './SCheckbox.vue';
import userEvent from '@testing-library/user-event';

describe('SCheckbox', () => {
    test('Can be rendered', () => {
        render(SCheckbox);
        screen.getByRole('checkbox');
    });

    test('Can be checked', async () => {
        const user = userEvent.setup();
        render(SCheckbox);
        const checkbox = screen.getByRole('checkbox');

        await user.click(checkbox);

        expect(checkbox).toBeChecked();
    });

    test('Can be checked with group', async () => {
        const user = userEvent.setup();
        render(SCheckbox, {
            slots: { default: 'first' },
            props: { value: 'first', modelValue: [] },
        });
        render(SCheckbox, { slots: { default: 'second' }, props: { value: 'second', modelValue: [] } });

        const firstCheckbox = screen.getByRole('checkbox', { name: 'first' });
        const secondCheckbox = screen.getByRole('checkbox', { name: 'second' });

        await user.click(firstCheckbox);
        await user.click(secondCheckbox);

        expect(firstCheckbox).toBeChecked();
        expect(secondCheckbox).toBeChecked();
    });

    test('Can be unchecked in group', async () => {
        const user = userEvent.setup();
        const { emitted } = render(SCheckbox, {
            slots: { default: 'option' },
            props: { value: 'option', modelValue: ['option'] },
        });

        const checkbox = screen.getByRole('checkbox', { name: 'option' });
        await user.click(checkbox);

        expect(emitted()['update:modelValue'][0]).toEqual([[]]);
    });

    test('Renders disabled state', () => {
        const { container } = render(SCheckbox, { props: { disabled: true } });

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeDisabled();
        expect(container.firstElementChild?.className).toContain('pointer-events-none');
        expect(container.firstElementChild?.className).toContain('opacity-50');
    });

    test('Renders reverse layout', () => {
        const { container } = render(SCheckbox, {
            props: { reverse: true },
            slots: { default: 'Label' },
        });

        expect(container.firstElementChild?.className).toContain('flex-row-reverse');
        expect(container.firstElementChild?.className).toContain('justify-between');
    });

    test('Renders label slot', () => {
        render(SCheckbox, { slots: { default: 'My Label' } });

        expect(screen.getByText('My Label')).toBeTruthy();
    });

    test('Renders description slot', () => {
        render(SCheckbox, {
            slots: { description: 'My Description' },
        });

        expect(screen.getByText('My Description')).toBeTruthy();
    });

    test('Renders both label and description', () => {
        render(SCheckbox, {
            slots: { default: 'Label Text', description: 'Description Text' },
        });

        expect(screen.getByText('Label Text')).toBeTruthy();
        expect(screen.getByText('Description Text')).toBeTruthy();
    });

    test('Label has for attribute matching checkbox id', () => {
        render(SCheckbox, {
            props: { id: 'test-id' },
            slots: { default: 'Label' },
        });

        const checkbox = screen.getByRole('checkbox');
        const label = screen.getByText('Label');

        expect(checkbox.id).toBe('test-id');
        expect(label.closest('label')?.getAttribute('for')).toBe('test-id');
    });

    test('Generates id when not provided', () => {
        render(SCheckbox, { slots: { default: 'Label' } });

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox.id).toBeTruthy();
    });

    test('Renders name attribute', () => {
        render(SCheckbox, { props: { name: 'my-checkbox' } });

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox.getAttribute('name')).toBe('my-checkbox');
    });

    test('Inline mode renders label inside description', () => {
        render(SCheckbox, {
            props: { inline: true },
            slots: { default: 'Inline Label', description: 'Inline Description' },
        });

        const description = screen.getByText('Inline Description');
        const label = screen.getByText('Inline Label');

        // In inline mode, label is inside the description paragraph
        expect(description.closest('p')?.contains(label.closest('label'))).toBe(true);
    });

    test('Non-inline mode renders label separately from description', () => {
        render(SCheckbox, {
            props: { inline: false },
            slots: { default: 'Separate Label', description: 'Separate Description' },
        });

        const description = screen.getByText('Separate Description');
        const label = screen.getByText('Separate Label');

        // In non-inline mode, label is NOT inside the description paragraph
        expect(description.closest('p')?.contains(label.closest('label'))).toBe(false);
    });

    test('Applies dark mode classes to input', () => {
        const { container } = render(SCheckbox);
        const checkbox = container.querySelector('input[type="checkbox"]');

        expect(checkbox?.className).toContain('dark:border-white/10');
        expect(checkbox?.className).toContain('dark:bg-white/5');
    });

    test('Applies dark mode classes to label', () => {
        render(SCheckbox, { slots: { default: 'Dark Label' } });
        const label = screen.getByText('Dark Label').closest('label');

        expect(label?.className).toContain('dark:text-gray-50');
    });

    test('Applies dark mode classes to description', () => {
        render(SCheckbox, { slots: { description: 'Dark Description' } });
        const description = screen.getByText('Dark Description').closest('p');

        expect(description?.className).toContain('dark:text-gray-400');
    });

    test('Emits boolean value for single checkbox', async () => {
        const user = userEvent.setup();
        const { emitted } = render(SCheckbox, {
            props: { modelValue: false },
        });

        await user.click(screen.getByRole('checkbox'));

        expect(emitted()['update:modelValue'][0]).toEqual([true]);
    });
});
