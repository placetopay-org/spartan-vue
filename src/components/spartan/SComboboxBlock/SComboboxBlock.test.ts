import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SComboboxBlock from './SComboboxBlock.vue';
import userEvent from '@testing-library/user-event';

describe('SComboboxBlock', () => {
    test('Can be rendered', () => {
        // Act
        render(SComboboxBlock);

        // Assert
        screen.getByRole('button');
    });

    test('Can be rendered with label', () => {
        // Act
        render(SComboboxBlock, { props: { label: 'Test label' } });
        const button = screen.getByRole('button', { name: 'Test label' });

        // Assert
        expect(button).toHaveAttribute('id');
    });

    test('Can be rendered with error text', () => {
        // Act
        render(SComboboxBlock, { props: { errorText: 'Error text' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Error text');
        expect(caption).toHaveClass('text-xs font-normal text-red-500 mt-1');
    });

    test('Can be rendered with help text', () => {
        // Act
        render(SComboboxBlock, { props: { helpText: 'Help text' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Help text');
        expect(caption).toHaveClass('text-xs font-normal text-gray-500 mt-1');
    });

    test('Can be work as no-block component', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        const { emitted } = render(SComboboxBlock, {
            props: {
                label: 'Test label',
                search: true,
                queryDebounce: 0,
                modelValue: '1',
                displayButtonText: (item: string) => item,
            },
        });

        const combobox = screen.getByRole('combobox', { name: 'Test label' });
        await user.type(combobox, 'test');

        // Assert
        expect(combobox).toHaveAttribute('id');
        expect(emitted()).toHaveProperty('query');
    });
});
