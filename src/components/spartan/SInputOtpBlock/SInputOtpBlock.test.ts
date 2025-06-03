import { test, describe, expect } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import { h } from 'vue';
import SInputOtpBlock from './SInputOtpBlock.vue';
import { SInputOtpItem } from '../SInputOtp';
import userEvent from '@testing-library/user-event';

describe('SInputOtpBlock', () => {
    test('Can be rendered', async () => {
        // Arrange
        let modelValue = '';
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInputOtpBlock, {
            props: {
                modelValue,
                'onUpdate:modelValue': (e: string) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
            },
            slots: {
                default: [
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                ],
            },
        });

        const input = screen.getByRole('textbox');

        await user.type(input, '1234');

        // Assert
        expect(modelValue).toEqual('1234');
    });

    test('Can be rendered with label', () => {
        // Act
        render(SInputOtpBlock, { 
            props: { label: 'Código OTP' },
            slots: {
                default: [
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                ],
            },
        });
        const input = screen.getByRole('textbox', { name: 'Código OTP' });

        // Assert
        expect(input).toHaveAttribute('id');
    });

    test('Can be rendered with error text', () => {
        // Act
        render(SInputOtpBlock, { 
            props: { errorText: 'Código OTP requerido' },
            slots: {
                default: [
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                ],
            },
        });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Código OTP requerido');
        expect(caption).toHaveClass('text-xs font-normal text-red-500 mt-1');
    });

    test('Can be rendered with help text', () => {
        // Act
        render(SInputOtpBlock, { 
            props: { helpText: 'Ingresa el código de 4 dígitos' },
            slots: {
                default: [
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                ],
            },
        });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Ingresa el código de 4 dígitos');
        expect(caption).toHaveClass('text-xs font-normal text-gray-500 mt-1');
    });

    test('Can handle OTP input correctly', async () => {
        // Arrange
        let modelValue = '';
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInputOtpBlock, {
            props: {
                modelValue,
                'onUpdate:modelValue': (e: string) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
            },
            slots: {
                default: [
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                ],
            },
        });

        const input = screen.getByRole('textbox');
        const items = screen.getAllByText('-');

        // Assert initial state
        expect(items).toHaveLength(6);

        // Type OTP code
        await user.type(input, '123456');

        // Assert each digit appears in its respective position
        expect(items[0]).toHaveTextContent('1');
        expect(items[1]).toHaveTextContent('2');
        expect(items[2]).toHaveTextContent('3');
        expect(items[3]).toHaveTextContent('4');
        expect(items[4]).toHaveTextContent('5');
        expect(items[5]).toHaveTextContent('6');
        expect(modelValue).toEqual('123456');
    });

    test('Can handle disabled state', () => {
        // Act
        render(SInputOtpBlock, { 
            props: { disabled: true },
            slots: {
                default: [
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                ],
            },
        });
        const input = screen.getByRole('textbox');

        // Assert
        expect(input).toBeDisabled();
    });

    test('Can handle error state', () => {
        // Act
        render(SInputOtpBlock, { 
            props: { error: true },
            slots: {
                default: [
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                ],
            },
        });
        
        // The OTP component should render without issues in error state
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
    });

    test('Only accepts numeric input', async () => {
        // Arrange
        let modelValue = '';
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInputOtpBlock, {
            props: {
                modelValue,
                'onUpdate:modelValue': (e: string) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
            },
            slots: {
                default: [
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                    h(SInputOtpItem),
                ],
            },
        });

        const input = screen.getByRole('textbox');

        // Try to type non-numeric characters
        await user.type(input, 'abc123def');

        // Assert only numbers are accepted
        expect(modelValue).toEqual('123');
    });
});
