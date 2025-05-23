import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SToast from './SToast.vue';
import userEvent from '@testing-library/user-event';

describe('SToast', () => {
    test('Can be rendered', async () => {
        // Act
        render(SToast, { slots: { default: 'Toast test' } });

        const toast = screen.getByText('Toast test');

        // Assert
        expect(toast).toBeInTheDocument();
    });

    test('Can be rendered with description', async () => {
        // Act
        render(SToast, { slots: { default: 'Toast test', description: 'A test description' } });

        // Assert
        screen.getByText('Toast test');
        screen.getByText('A test description');
    });

    test('Can be closed', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        const { emitted } = render(SToast, {
            props: { closeable: true },
            slots: { default: 'Toast test', description: 'A test description' },
        });

        const closeButton = screen.getByRole('button');

        await user.click(closeButton);

        // Assert
        screen.getByText('Toast test');
        expect(emitted()).toHaveProperty('closeToast');
        expect(emitted().closeToast).toHaveLength(1);
    });
});
