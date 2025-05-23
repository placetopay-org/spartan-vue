import { expect, test, describe, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import SCopy from './SCopy.vue';
import { h } from 'vue';

describe('SCopy', () => {
    test('Can be rendered', () => {
        // Act
        render(SCopy, {
            slots: {
                default: 'Test Content',
            },
        });

        // Assert
        screen.getByText('Test Content');
    });

    test('Can copy a value from slot', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        const { emitted } = render(SCopy, {
            slots: {
                default: 'Test Content',
            },
        });

        const element = screen.getByText('Test Content');
        await user.click(element);

        // Assert
        expect(emitted().copied[0]).toEqual(['Test Content']);
    });

    test('Can copy a value from prop', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        const { emitted } = render(SCopy, {
            slots: {
                default: 'Test Content',
            },
            props: {
                value: 'Test from prop',
            },
        });

        const element = screen.getByText('Test Content');
        await user.click(element);

        // Assert
        expect(emitted().copied[0]).toEqual(['Test from prop']);
    });

    test('Can copy a value from slot scrapping', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        const { emitted } = render(SCopy, {
            slots: {
                default: () => [h('div', [h('main', [h('span', 'Test Content')])])],
            },
            props: {
                value: 'Test from prop',
            },
        });

        const element = screen.getByText('Test Content');
        await user.click(element);

        // Assert
        expect(emitted().copied[0]).toEqual(['Test from prop']);
    });
});
