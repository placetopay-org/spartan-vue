import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import STextArea from './STextArea.vue';
import userEvent from '@testing-library/user-event';

describe('STextArea', () => {
    test('Throw warning for required v-model', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        render(STextArea);

        // Assert
        expect(warn).toHaveBeenCalledOnce();
        expect(warn.mock.calls[0][0]).contains('[Vue warn]: Missing required prop: "modelValue"');
    });

    test('Can be rendered', async () => {
        // Act
        render(STextArea, { props: { modelValue: '' } });
        const textArea = screen.getByRole('textbox');

        // Assert
        expect(textArea).toBeInTheDocument();
    });

    test('Can be written', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        render(STextArea, { props: { modelValue: '' } });
        const textArea = screen.getByRole('textbox');

        await user.type(textArea, 'Hello, World!');

        // Assert
        expect(textArea).toHaveValue('Hello, World!');
    });

    test('Can be render with error style', async () => {
        // Act
        render(STextArea, { props: { modelValue: '', error: true } });
        const textArea = screen.getByRole('textbox');

        // Assert
        expect(textArea).toHaveClass('border-red-500 focus-within:s-ring-error');
    });

    test('Can be render with disabled style', async () => {
        // Act
        render(STextArea, { props: { modelValue: '', disabled: true } });
        const textArea = screen.getByRole('textbox');

        // Assert
        expect(textArea).toHaveAttribute('disabled');
        expect(textArea).toHaveClass('pointer-events-none');
    });
});
