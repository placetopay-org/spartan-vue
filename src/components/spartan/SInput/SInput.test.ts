import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import SInput from './SInput.vue';
import { h } from 'vue';

const icon = (props: any, { attrs }: any) => h('svg', { 'data-testid': 'test-icon', ...attrs });

describe('SInput', () => {
    describe('Default rendering', () => {
        test('Renders an input element', () => {
            render(SInput);

            expect(screen.getByRole('textbox')).toBeInTheDocument();
        });

        test('Renders as a text input by default', () => {
            render(SInput);

            expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
        });

        test('Renders container with base classes', () => {
            const { container } = render(SInput);
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('bg-white');
            expect(wrapper.className).toContain('border-gray-300');
            expect(wrapper.className).toContain('rounded-lg');
        });

        test('Renders container with dark mode classes', () => {
            const { container } = render(SInput);
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('dark:bg-white/5');
            expect(wrapper.className).toContain('dark:border-white/10');
        });

        test('Renders input with text styling classes', () => {
            render(SInput);
            const input = screen.getByRole('textbox');

            expect(input.className).toContain('text-gray-900');
            expect(input.className).toContain('dark:text-gray-50');
        });

        test('Renders input with placeholder styling classes', () => {
            render(SInput);
            const input = screen.getByRole('textbox');

            expect(input.className).toContain('placeholder:text-gray-400');
        });
    });

    describe('v-model', () => {
        test('Displays the modelValue', () => {
            render(SInput, { props: { modelValue: 'hello' } });

            expect(screen.getByRole('textbox')).toHaveValue('hello');
        });

        test('Emits update:modelValue on input', async () => {
            let modelValue = 'test';
            const user = userEvent.setup();

            const { rerender } = render(SInput, {
                props: {
                    modelValue,
                    'onUpdate:modelValue': (e: string) => {
                        modelValue = e;
                        rerender({ modelValue });
                    },
                },
            });

            const input = screen.getByRole('textbox');
            await user.type(input, ' value');

            expect(modelValue).toEqual('test value');
        });

        test('Handles numeric modelValue', () => {
            render(SInput, { props: { modelValue: 42, type: 'number' } });

            expect(screen.getByRole('spinbutton')).toHaveValue(42);
        });

        test('Handles null modelValue', () => {
            render(SInput, { props: { modelValue: null } });

            expect(screen.getByRole('textbox')).toHaveValue('');
        });
    });

    describe('Placeholder', () => {
        test('Displays placeholder text', () => {
            render(SInput, { props: { placeholder: 'Enter text...' } });

            expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
        });
    });

    describe('Type', () => {
        test('Renders as email input', () => {
            render(SInput, { props: { type: 'email' } });

            expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
        });

        test('Renders as password input', () => {
            const { container } = render(SInput, { props: { type: 'password' } });
            const input = container.querySelector('input')!;

            expect(input).toHaveAttribute('type', 'password');
        });

        test('Renders as search input', () => {
            render(SInput, { props: { type: 'search' } });

            expect(screen.getByRole('searchbox')).toBeInTheDocument();
        });

        test('Renders as hidden input', () => {
            const { container } = render(SInput, { props: { type: 'hidden' } });
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('hidden');
        });

        test('Warns when type is checkbox', () => {
            const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);

            render(SInput, { props: { type: 'checkbox' } });

            expect(error).toHaveBeenCalledTimes(1);
            expect(error.mock.calls[0][0]).toContain(
                'The <SCheckbox /> component should be used instead of the <SInput type="checkbox"/>',
            );

            error.mockRestore();
        });

        test('Warns when type is radio', () => {
            const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);

            render(SInput, { props: { type: 'radio' } });

            expect(error).toHaveBeenCalledTimes(1);
            expect(error.mock.calls[0][0]).toContain(
                'The <SRadio /> component should be used instead of the <SInput type="radio"/>',
            );

            error.mockRestore();
        });
    });

    describe('Disabled', () => {
        test('Disables the input element', () => {
            render(SInput, { props: { disabled: true } });

            expect(screen.getByRole('textbox')).toBeDisabled();
        });

        test('Applies disabled classes to container', () => {
            const { container } = render(SInput, { props: { disabled: true } });
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('opacity-50');
            expect(wrapper.className).toContain('cursor-not-allowed');
        });

        test('Does not apply disabled classes by default', () => {
            const { container } = render(SInput);
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).not.toContain('opacity-50');
            expect(wrapper.className).not.toContain('cursor-not-allowed');
        });
    });

    describe('Error', () => {
        test('Applies error border classes', () => {
            const { container } = render(SInput, { props: { error: true } });
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('border-red-500');
        });

        test('Applies error border consistently in light and dark mode', () => {
            const { container } = render(SInput, { props: { error: true } });
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('border-red-500');
        });

        test('Applies error ring classes', () => {
            const { container } = render(SInput, { props: { error: true } });
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('s-ring-error');
        });

        test('Applies base border when error is false', () => {
            const { container } = render(SInput, { props: { error: false } });
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('border-gray-300');
            expect(wrapper.className).toContain('dark:border-white/10');
        });
    });

    describe('Rounded', () => {
        test('Applies rounded-lg by default (both)', () => {
            const { container } = render(SInput);
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('rounded-lg');
        });

        test('Applies rounded-l-lg for left', () => {
            const { container } = render(SInput, { props: { rounded: 'left' } });
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('rounded-l-lg');
        });

        test('Applies rounded-r-lg for right', () => {
            const { container } = render(SInput, { props: { rounded: 'right' } });
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('rounded-r-lg');
        });

        test('Applies rounded-full for full', () => {
            const { container } = render(SInput, { props: { rounded: 'full' } });
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('rounded-full');
        });

        test('Applies no rounded class for none', () => {
            const { container } = render(SInput, { props: { rounded: 'none' } });
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).not.toContain('rounded-lg');
            expect(wrapper.className).not.toContain('rounded-l-lg');
            expect(wrapper.className).not.toContain('rounded-r-lg');
            expect(wrapper.className).not.toContain('rounded-full');
        });
    });

    describe('Borderless', () => {
        test('Removes border when borderless is true', () => {
            const { container } = render(SInput, { props: { borderless: true } });
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('border-0');
        });

        test('Has border by default', () => {
            const { container } = render(SInput);
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).not.toContain('border-0');
        });
    });

    describe('Prefix and Suffix', () => {
        test('Renders prefix text', () => {
            render(SInput, { props: { prefix: 'https://' } });

            expect(screen.getByText('https://')).toBeInTheDocument();
        });

        test('Renders suffix text', () => {
            render(SInput, { props: { suffix: '.com' } });

            expect(screen.getByText('.com')).toBeInTheDocument();
        });

        test('Renders both prefix and suffix', () => {
            render(SInput, { props: { prefix: 'https://', suffix: '.com' } });

            expect(screen.getByText('https://')).toBeInTheDocument();
            expect(screen.getByText('.com')).toBeInTheDocument();
        });

        test('Prefix text has correct styling', () => {
            render(SInput, { props: { prefix: '$' } });
            const prefix = screen.getByText('$');

            expect(prefix.className).toContain('text-gray-500');
            expect(prefix.className).toContain('dark:text-gray-400');
        });

        test('Suffix text has correct styling', () => {
            render(SInput, { props: { suffix: 'USD' } });
            const suffix = screen.getByText('USD');

            expect(suffix.className).toContain('text-gray-500');
            expect(suffix.className).toContain('dark:text-gray-400');
        });
    });

    describe('Icons', () => {
        test('Renders left icon', () => {
            render(SInput, { props: { leftIcon: icon } });

            expect(screen.getByTestId('test-icon')).toBeInTheDocument();
        });

        test('Renders right icon', () => {
            render(SInput, { props: { rightIcon: icon } });

            expect(screen.getByTestId('test-icon')).toBeInTheDocument();
        });

        test('Left icon has correct styling', () => {
            const { container } = render(SInput, { props: { leftIcon: icon } });
            const svg = container.querySelector('svg')!;

            expect(svg.getAttribute('class')).toContain('text-gray-500');
            expect(svg.getAttribute('class')).toContain('dark:text-gray-400');
        });

        test('Right icon has correct styling', () => {
            const { container } = render(SInput, { props: { rightIcon: icon } });
            const svg = container.querySelector('svg')!;

            expect(svg.getAttribute('class')).toContain('text-gray-500');
            expect(svg.getAttribute('class')).toContain('dark:text-gray-400');
        });
    });

    describe('Selectors', () => {
        const options = [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
        ];

        test('Renders right selector with options', () => {
            render(SInput, { props: { rightOptions: options, rightOption: '1' } });

            const select = screen.getByRole('combobox');
            expect(select).toBeInTheDocument();
        });

        test('Renders left selector with options', () => {
            render(SInput, { props: { leftOptions: options, leftOption: '1' } });

            const select = screen.getByRole('combobox');
            expect(select).toBeInTheDocument();
        });

        test('Right selector emits update:rightOption on change', async () => {
            const user = userEvent.setup();
            const { emitted } = render(SInput, {
                props: { rightOptions: options, rightOption: '1' },
            });

            const select = screen.getByRole('combobox');
            await user.selectOptions(select, '2');

            expect(emitted()['update:rightOption']).toBeTruthy();
            expect(emitted()['update:rightOption'][0]).toEqual(['2']);
        });

        test('Left selector emits update:leftOption on change', async () => {
            const user = userEvent.setup();
            const { emitted } = render(SInput, {
                props: { leftOptions: options, leftOption: '1' },
            });

            const select = screen.getByRole('combobox');
            await user.selectOptions(select, '2');

            expect(emitted()['update:leftOption']).toBeTruthy();
            expect(emitted()['update:leftOption'][0]).toEqual(['2']);
        });

        test('Removes left padding when leftOptions is set', () => {
            const { container } = render(SInput, {
                props: { leftOptions: options, leftOption: '1' },
            });
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('pl-0');
        });

        test('Removes right padding when rightOptions is set', () => {
            const { container } = render(SInput, {
                props: { rightOptions: options, rightOption: '1' },
            });
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('pr-0');
        });

        test('Selector has dark mode styling', () => {
            render(SInput, { props: { rightOptions: options, rightOption: '1' } });
            const select = screen.getByRole('combobox');

            expect(select.className).toContain('dark:text-gray-400');
        });
    });

    describe('Slots', () => {
        test('Renders left slot content', () => {
            render(SInput, {
                slots: { left: '<span data-testid="left-content">Left</span>' },
            });

            expect(screen.getByTestId('left-content')).toBeInTheDocument();
        });

        test('Renders right slot content', () => {
            render(SInput, {
                slots: { right: '<span data-testid="right-content">Right</span>' },
            });

            expect(screen.getByTestId('right-content')).toBeInTheDocument();
        });
    });

    describe('HTML attributes', () => {
        test('Passes id to input element', () => {
            render(SInput, { props: { id: 'my-input' } });

            expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-input');
        });

        test('Passes name to input element', () => {
            render(SInput, { props: { name: 'username' } });

            expect(screen.getByRole('textbox')).toHaveAttribute('name', 'username');
        });

        test('Passes additional attrs via v-bind $attrs', () => {
            render(SInput, { attrs: { 'aria-label': 'Search input', maxlength: '100' } });

            const input = screen.getByRole('textbox');
            expect(input).toHaveAttribute('aria-label', 'Search input');
            expect(input).toHaveAttribute('maxlength', '100');
        });
    });

    describe('Custom classes', () => {
        test('Merges custom class on container', () => {
            const { container } = render(SInput, { props: { class: 'mt-4' } });
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('mt-4');
        });

        test('Merges inputClass on input element', () => {
            render(SInput, { props: { inputClass: 'text-lg' } });
            const input = screen.getByRole('textbox');

            expect(input.className).toContain('text-lg');
        });
    });

    describe('Input element', () => {
        test('Input element is accessible in the DOM', () => {
            const { container } = render(SInput);
            const input = container.querySelector('input');

            expect(input).toBeInTheDocument();
            expect(input?.tagName).toBe('INPUT');
        });
    });

    describe('Combinations', () => {
        test('Disabled + error applies both classes', () => {
            const { container } = render(SInput, { props: { disabled: true, error: true } });
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('opacity-50');
            expect(wrapper.className).toContain('border-red-500');
        });

        test('Prefix + suffix + icon renders all elements', () => {
            render(SInput, {
                props: { prefix: '$', suffix: 'USD', leftIcon: icon },
            });

            expect(screen.getByText('$')).toBeInTheDocument();
            expect(screen.getByText('USD')).toBeInTheDocument();
            expect(screen.getByTestId('test-icon')).toBeInTheDocument();
        });

        test('Error + borderless still shows error border', () => {
            const { container } = render(SInput, { props: { error: true, borderless: true } });
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('border-red-500');
        });

        test('Rounded + disabled applies both', () => {
            const { container } = render(SInput, { props: { rounded: 'full', disabled: true } });
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('rounded-full');
            expect(wrapper.className).toContain('opacity-50');
        });
    });

    describe('Focus ring', () => {
        test('Applies base focus ring when no error', () => {
            const { container } = render(SInput);
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('s-ring');
        });

        test('Applies error focus ring when error', () => {
            const { container } = render(SInput, { props: { error: true } });
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('s-ring-error');
        });

        test('Borderless removes border but ring comes from error variant', () => {
            const { container } = render(SInput, { props: { borderless: true } });
            const wrapper = container.firstElementChild!;

            expect(wrapper.className).toContain('border-0');
            // The focus ring is part of the error:false variant, so it's always present
            expect(wrapper.className).toContain('s-ring');
        });
    });
});
