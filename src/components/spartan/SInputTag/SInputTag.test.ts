import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import SInputTag from './SInputTag.vue';

describe('SInputTag', () => {
    test('Can be rendered', () => {
        render(SInputTag);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('Renders with placeholder', () => {
        render(SInputTag, {
            props: { placeholder: 'Add a tag' },
        });

        expect(screen.getByPlaceholderText('Add a tag')).toBeInTheDocument();
    });

    test('Renders existing tags', () => {
        render(SInputTag, {
            props: { modelValue: ['vue', 'react'] },
        });

        expect(screen.getByText('vue')).toBeInTheDocument();
        expect(screen.getByText('react')).toBeInTheDocument();
    });

    test('Adds a tag on Enter', async () => {
        const user = userEvent.setup();

        const { emitted } = render(SInputTag, {
            props: { modelValue: [] },
        });

        const input = screen.getByRole('textbox');
        await user.type(input, 'new-tag{enter}');

        expect(emitted()['update:modelValue'][0]).toEqual([['new-tag']]);
    });

    test('Does not add duplicate tags', async () => {
        const user = userEvent.setup();

        const { emitted } = render(SInputTag, {
            props: { modelValue: ['existing'] },
        });

        const input = screen.getByRole('textbox');
        await user.type(input, 'existing{enter}');

        expect(emitted()['update:modelValue']).toBeUndefined();
    });

    test('Removes a tag when clicking the remove button', async () => {
        const user = userEvent.setup();

        const { emitted } = render(SInputTag, {
            props: { modelValue: ['vue', 'react'] },
        });

        const removeButtons = screen.getAllByRole('button');
        await user.click(removeButtons[0]);

        expect(emitted()['update:modelValue'][0]).toEqual([['react']]);
    });

    test('Applies disabled state', () => {
        render(SInputTag, {
            props: { disabled: true },
        });

        expect(screen.getByRole('textbox')).toBeDisabled();
    });

    test('Applies error styling', () => {
        const { container } = render(SInputTag, {
            props: { error: true },
        });

        const wrapper = container.querySelector('div > div');
        expect(wrapper?.className).toContain('border-red-500');
    });

    test('Applies borderless styling', () => {
        const { container } = render(SInputTag, {
            props: { borderless: true },
        });

        const wrapper = container.querySelector('div > div');
        expect(wrapper?.className).toContain('border-0');
    });

    test('Supports hidden type', () => {
        const { container } = render(SInputTag, {
            props: { type: 'hidden' },
        });

        const wrapper = container.querySelector('div > div');
        expect(wrapper?.className).toContain('hidden');
    });
});
