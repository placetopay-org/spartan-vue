import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import SInputPasswordBlock from './SInputPasswordBlock.vue';

// `type="password"` has no implicit ARIA role, so the input cannot be reached
// through `getByRole`.
const getPasswordInput = () => document.querySelector('input') as HTMLInputElement;

describe('SInputPasswordBlock', () => {
    test('Can be rendered and forwards update:modelValue', async () => {
        // Arrange
        let modelValue = 'pass';
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInputPasswordBlock, {
            props: {
                modelValue,
                'onUpdate:modelValue': (e: string) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
            },
        });

        await user.type(getPasswordInput(), 'word');

        // Assert
        expect(modelValue).toEqual('password');
    });

    test('Can be rendered with label', () => {
        // Act
        render(SInputPasswordBlock, { props: { label: 'Password' } });

        const label = screen.getByText('Password');
        const input = getPasswordInput();

        // Assert: the wrapper generates an id and wires the label to the input.
        expect(input).toHaveAttribute('id');
        expect(label).toHaveAttribute('for', input.getAttribute('id'));
    });

    test('Can be rendered with a caller-supplied id', () => {
        // Act
        render(SInputPasswordBlock, { props: { id: 'my-password', label: 'Password' } });

        // Assert
        expect(getPasswordInput()).toHaveAttribute('id', 'my-password');
        expect(screen.getByText('Password')).toHaveAttribute('for', 'my-password');
    });

    test('Can be rendered with help text', () => {
        // Act
        render(SInputPasswordBlock, { props: { helpText: 'Help text' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Help text');
        expect(caption).toHaveClass('text-xs font-normal text-gray-500 mt-1');
    });

    test('Can be rendered with error text', () => {
        // Act
        render(SInputPasswordBlock, { props: { errorText: 'Error text' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Error text');
        expect(caption).toHaveClass('text-xs font-normal text-red-500 mt-1');
    });

    test('errorText also puts the inner input into its error state', () => {
        // `extractWrapperProps` derives `error` from `errorText`, so passing only the
        // caption text must still restyle the input. Nothing else exercises that path.
        const { unmount } = render(SInputPasswordBlock, { props: { errorText: 'Error text' } });
        const withError = getPasswordInput().closest('div[class*="border"]');
        expect(withError).toHaveClass('border-red-500');
        unmount();

        render(SInputPasswordBlock, {});
        const withoutError = getPasswordInput().closest('div[class*="border"]');
        expect(withoutError).not.toHaveClass('border-red-500');
    });

    test('Forwards the state and isValid events of the inner input', async () => {
        // Arrange. Validation reads `props.modelValue`, so the value has to be fed
        // back in — an uncontrolled render always validates against `undefined`.
        let modelValue = '';
        const user = userEvent.setup();
        const onState = vi.fn();
        const onIsValid = vi.fn();

        // Act
        const { rerender } = render(SInputPasswordBlock, {
            props: {
                rules: { min: 4 },
                modelValue,
                'onUpdate:modelValue': (e: string) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
                onState,
                onIsValid,
            },
        });

        await user.type(getPasswordInput(), 'abc');

        // Assert: three characters is short of the rule.
        expect(onState.mock.calls.at(-1)?.[0]).toMatchObject({ min: { isValid: false, value: 4 } });
        expect(onIsValid).toHaveBeenLastCalledWith(false);

        await user.type(getPasswordInput(), 'd');

        // Assert: the fourth satisfies it, and both events reach the wrapper's consumer.
        expect(onState.mock.calls.at(-1)?.[0]).toMatchObject({ min: { isValid: true, value: 4 } });
        expect(onIsValid).toHaveBeenLastCalledWith(true);
    });

    test('Forwards focus and blur', async () => {
        // Arrange
        const user = userEvent.setup();
        const onFocus = vi.fn();
        const onBlur = vi.fn();

        // Act
        render(SInputPasswordBlock, { props: { onFocus, onBlur } });

        await user.click(getPasswordInput());
        await user.tab();

        // Assert
        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onBlur).toHaveBeenCalledTimes(1);
    });

    test('Passes non-wrapper props through to the inner input', async () => {
        // Act
        const user = userEvent.setup();
        render(SInputPasswordBlock, { props: { label: 'Password', placeholder: 'Type it' } });

        const input = getPasswordInput();

        // Assert: the toggle belongs to SInputPassword, not to the wrapper.
        expect(input).toHaveAttribute('placeholder', 'Type it');
        expect(input).toHaveAttribute('type', 'password');

        await user.click(screen.getByRole('button'));
        expect(getPasswordInput()).toHaveAttribute('type', 'text');
    });
});
