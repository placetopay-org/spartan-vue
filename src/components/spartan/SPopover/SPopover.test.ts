import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SPopover from './SPopover.vue';
import userEvent from '@testing-library/user-event';
import { h } from 'vue';

describe('SPopover', () => {
    test('Can be rendered', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        const {} = render(SPopover, {
            slots: {
                default: 'Hello World!',
                reference: ({ open }) =>
                    h(
                        'button',
                        {
                            onClick() {
                                open();
                            },
                        },
                        'Reference element',
                    ),
            },
        });

        const button = screen.getByRole('button', { name: 'Reference element' });
        await user.click(button);

        // Assert
        screen.getByText('Hello World!');
    });
});
