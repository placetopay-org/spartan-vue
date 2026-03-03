import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SSelect from './SSelect.vue';
import { h } from 'vue';
import userEvent from '@testing-library/user-event';

const options = [
    h('option', { value: '1' }, 'Option 1'),
    h('option', { value: '2' }, 'Option 2'),
    h('option', { value: '3' }, 'Option 3'),
];

describe('SSelect', () => {
    describe('Default rendering', () => {
        test('Renders a combobox element', () => {
            render(SSelect);

            expect(screen.getByRole('combobox')).toBeInTheDocument();
        });

        test('Renders with base background class', () => {
            render(SSelect);
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('bg-white');
        });

        test('Renders with base text class when value is selected', () => {
            render(SSelect, {
                slots: { default: options },
                props: { modelValue: '1' },
            });
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('text-gray-900');
        });

        test('Renders with base border class', () => {
            render(SSelect);
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('border-gray-300');
        });

        test('Renders with rounded-lg by default', () => {
            render(SSelect);
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('rounded-lg');
        });

        test('Renders with appearance-none', () => {
            render(SSelect);
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('appearance-none');
        });

        test('Renders with h-9 height', () => {
            render(SSelect);
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('h-9');
        });
    });

    describe('Dark mode', () => {
        test('Renders with dark mode background class', () => {
            render(SSelect);
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('dark:bg-white/5');
        });

        test('Renders with dark mode text class', () => {
            render(SSelect);
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('dark:text-gray-50');
        });

        test('Renders with dark mode border class', () => {
            render(SSelect);
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('dark:border-white/10');
        });
    });

    describe('v-model', () => {
        test('Displays the selected value', () => {
            render(SSelect, {
                slots: { default: options },
                props: { modelValue: '2' },
            });

            expect(screen.getByRole('combobox')).toHaveValue('2');
        });

        test('Emits update:modelValue on change', async () => {
            let modelValue = '1';
            const user = userEvent.setup();

            const { rerender } = render(SSelect, {
                slots: { default: options },
                props: {
                    modelValue,
                    'onUpdate:modelValue': (e: string) => {
                        modelValue = e;
                        rerender({ modelValue });
                    },
                },
            });

            await user.selectOptions(screen.getByRole('combobox'), '2');

            expect(modelValue).toBe('2');
        });

        test('Handles string values', async () => {
            let modelValue = 'vue';
            const user = userEvent.setup();
            const stringOptions = [
                h('option', { value: 'vue' }, 'Vue'),
                h('option', { value: 'react' }, 'React'),
            ];

            const { rerender } = render(SSelect, {
                slots: { default: stringOptions },
                props: {
                    modelValue,
                    'onUpdate:modelValue': (e: string) => {
                        modelValue = e;
                        rerender({ modelValue });
                    },
                },
            });

            await user.selectOptions(screen.getByRole('combobox'), 'react');

            expect(modelValue).toBe('react');
        });
    });

    describe('Placeholder', () => {
        test('Renders disabled placeholder option', () => {
            render(SSelect, {
                slots: { default: options },
                props: { placeholder: 'Select an option' },
            });

            const placeholder = screen.getByRole('option', { name: 'Select an option' });

            expect(placeholder).toHaveAttribute('disabled');
        });

        test('Does not render placeholder option when prop is not set', () => {
            render(SSelect, {
                slots: { default: options },
            });

            expect(screen.queryByRole('option', { name: 'Select an option' })).not.toBeInTheDocument();
        });

        test('Applies placeholder class when no value is selected', () => {
            render(SSelect, {
                props: { placeholder: 'Select an option' },
            });
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('text-gray-400');
        });

        test('Applies dark placeholder class when no value is selected', () => {
            render(SSelect, {
                props: { placeholder: 'Select an option' },
            });
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('dark:text-gray-500');
        });

        test('Removes placeholder class when value is selected', () => {
            render(SSelect, {
                slots: { default: options },
                props: { placeholder: 'Select an option', modelValue: '1' },
            });
            const select = screen.getByRole('combobox');

            expect(select.className).not.toMatch(/(?<!\w:)text-gray-400/);
        });
    });

    describe('Rounded', () => {
        test('Applies rounded-lg for both (default)', () => {
            render(SSelect);
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('rounded-lg');
        });

        test('Applies rounded-l-lg for left', () => {
            render(SSelect, { props: { rounded: 'left' } });
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('rounded-l-lg');
        });

        test('Applies rounded-r-lg for right', () => {
            render(SSelect, { props: { rounded: 'right' } });
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('rounded-r-lg');
        });

        test('Applies no rounded class for none', () => {
            render(SSelect, { props: { rounded: 'none' } });
            const select = screen.getByRole('combobox');

            expect(select.className).not.toContain('rounded-lg');
            expect(select.className).not.toContain('rounded-l-lg');
            expect(select.className).not.toContain('rounded-r-lg');
            expect(select.className).not.toContain('rounded-full');
        });

        test('Applies rounded-full for full', () => {
            render(SSelect, { props: { rounded: 'full' } });
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('rounded-full');
        });
    });

    describe('Error', () => {
        test('Applies error border class', () => {
            render(SSelect, { props: { error: true } });
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('border-red-500');
        });

        test('Applies error ring class', () => {
            render(SSelect, { props: { error: true } });
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('focus-within:s-ring-error');
        });

        test('Does not apply error classes by default', () => {
            render(SSelect);
            const select = screen.getByRole('combobox');

            expect(select.className).not.toContain('border-red-500');
            expect(select.className).not.toContain('focus-within:s-ring-error');
        });

        test('Applies normal border when not in error state', () => {
            render(SSelect);
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('border-gray-300');
        });

        test('Applies normal ring when not in error state', () => {
            render(SSelect);
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('focus-within:s-ring');
        });
    });

    describe('Disabled', () => {
        test('Applies disabled attribute', () => {
            render(SSelect, { props: { disabled: true } });
            const select = screen.getByRole('combobox');

            expect(select).toBeDisabled();
        });

        test('Applies opacity class when disabled', () => {
            render(SSelect, { props: { disabled: true } });
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('opacity-50');
        });

        test('Applies cursor-not-allowed class when disabled', () => {
            render(SSelect, { props: { disabled: true } });
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('cursor-not-allowed');
        });

        test('Is not disabled by default', () => {
            render(SSelect);
            const select = screen.getByRole('combobox');

            expect(select).not.toBeDisabled();
        });

        test('Does not apply disabled classes by default', () => {
            render(SSelect);
            const select = screen.getByRole('combobox');

            expect(select.className).not.toContain('opacity-50');
            expect(select.className).not.toContain('cursor-not-allowed');
        });
    });

    describe('Custom class', () => {
        test('Merges custom classes', () => {
            render(SSelect, { props: { class: 'w-64' } });
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('w-64');
        });

        test('Preserves base classes when custom class is added', () => {
            render(SSelect, { props: { class: 'w-64' } });
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('h-9');
            expect(select.className).toContain('bg-white');
        });
    });

    describe('Slots', () => {
        test('Renders option elements from default slot', () => {
            render(SSelect, {
                slots: { default: options },
            });

            expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'Option 3' })).toBeInTheDocument();
        });
    });
});
