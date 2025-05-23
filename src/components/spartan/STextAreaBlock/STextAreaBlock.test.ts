import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import STextAreaBlock from './STextAreaBlock.vue';
import userEvent from '@testing-library/user-event';

describe('STextAreaBlock', () => {
    test('Throw warning for required v-model', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        render(STextAreaBlock);

        // Assert
        expect(warn).toHaveBeenCalledTimes(2);
        expect(warn.mock.calls[0][0]).contains('[Vue warn]: Missing required prop: "modelValue"');
    });

    test('Can be rendered', async () => {
        // Act
        render(STextAreaBlock, { props: { modelValue: '' } });
        const textArea = screen.getByRole('textbox');

        // Assert
        expect(textArea).toBeInTheDocument();
    });

    test('Can be rendered with label', () => {
        // Act
        render(STextAreaBlock, { props: { label: 'Test label' } });
        const button = screen.getByRole('textbox', { name: 'Test label' });

        // Assert
        expect(button).toHaveAttribute('id');
    });

    test('Can be rendered with error text', () => {
        // Act
        render(STextAreaBlock, { props: { errorText: 'Error text' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Error text');
        expect(caption).toHaveClass('text-xs font-normal text-red-500 mt-1');
    });

    test('Can be rendered with help text', () => {
        // Act
        render(STextAreaBlock, { props: { helpText: 'Help text' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Help text');
        expect(caption).toHaveClass('text-xs font-normal text-gray-500 mt-1');
    });

    test('Can be written', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        render(STextAreaBlock, { props: { modelValue: '' } });
        const textArea = screen.getByRole('textbox');

        await user.type(textArea, 'Hello, World!');

        // Assert
        expect(textArea).toHaveValue('Hello, World!');
    });

    test('Can be render with error style', async () => {
        // Act
        render(STextAreaBlock, { props: { modelValue: '', error: true } });
        const textArea = screen.getByRole('textbox');

        // Assert
        expect(textArea).toHaveClass('border-red-500 focus-within:s-ring-error');
    });

    test('Can be render with disabled style', async () => {
        // Act
        render(STextAreaBlock, { props: { modelValue: '', disabled: true } });
        const textArea = screen.getByRole('textbox');

        // Assert
        expect(textArea).toHaveAttribute('disabled');
        expect(textArea).toHaveClass('pointer-events-none');
    });
});
