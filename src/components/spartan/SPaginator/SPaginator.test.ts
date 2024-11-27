import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SPaginator from './SPaginator.vue';
import userEvent from '@testing-library/user-event';

describe('SPaginator', () => {
    test('Can be rendered', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        render(SPaginator, {
            props: { page: 3, size: 5, total: 125 },
        });

        // Assert
        screen.getByRole('button', { name: '1' });
        screen.getByRole('button', { name: '2' });
        screen.getByRole('button', { name: '3' });
        screen.getByRole('button', { name: '...' });
        screen.getByRole('button', { name: '25' });
    });

    test('Can be emit events', async () => {
        // Arrange
        let state = { page: 16, size: 5, total: 125 };
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SPaginator, {
            props: {
                ...state,
                paginatorSize: "3",
                onChange: (e: { page?: number, size?: number, count?: number }) => {
                    rerender({...state, ...e});
                },
            },
        });

        const nextButton = screen.getByRole('button', { name: /next/i });

        // Assert
        expect(screen.getAllByRole('button', { name: '...' }).length).toBe(2);
        screen.getByRole('button', { name: '1' })
        
        screen.getByRole('button', { name: '13' });
        screen.getByRole('button', { name: '14' });
        screen.getByRole('button', { name: '15' });
        screen.getByRole('button', { name: '16' });
        screen.getByRole('button', { name: '17' });
        screen.getByRole('button', { name: '18' });
        screen.getByRole('button', { name: '19' });

        screen.getByRole('button', { name: '25' });

        await user.click(nextButton);
        await user.click(nextButton);
        await user.click(nextButton);
        await user.click(nextButton);

        expect(screen.getAllByRole('button', { name: '...' }).length).toBe(1);
        screen.getByRole('button', { name: '1' });

        screen.getByRole('button', { name: '17' });
        screen.getByRole('button', { name: '18' });
        screen.getByRole('button', { name: '19' });
        screen.getByRole('button', { name: '20' });
        screen.getByRole('button', { name: '21' });
        screen.getByRole('button', { name: '22' });
        screen.getByRole('button', { name: '23' });
        screen.getByRole('button', { name: '24' });
        screen.getByRole('button', { name: '25' });
    });

    test('Can be render fully', async () => {
        // Arrange
        let state = { page: 4, size: 5, total: 30 };
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SPaginator, {
            props: {
                ...state,
                paginatorSize: "3",
                onChange: (e: { page?: number, size?: number }) => {
                    rerender({...state, ...e});
                },
            },
        });

        const button = screen.getByRole('button', { name: /2/i });

        await user.click(button);

        // Assert
        screen.getByRole('button', { name: '1' })
        screen.getByRole('button', { name: '2' });
        screen.getByRole('button', { name: '3' });
        screen.getByRole('button', { name: '4' });
        screen.getByRole('button', { name: '5' });
        screen.getByRole('button', { name: '6' });
    });

    test('Cannot prev on first page', async () => {
        // Arrange
        let state = { page: 3, size: 5, total: 25 };
        const user = userEvent.setup();

        // Act
        const { rerender, emitted } = render(SPaginator, {
            props: {
                ...state,
                paginatorSize: "3",
                onChange: (e: { page?: number, size?: number }) => {
                    rerender({...state, ...e});
                },
            },
        });

        
        const prevButton = screen.getByRole('button', { name: /prev/i });

        await user.click(prevButton);
        await user.click(prevButton);
        await user.click(prevButton);
        await user.click(prevButton);
        await user.click(prevButton);
        await user.click(prevButton);
        await user.click(prevButton);
        await user.click(prevButton);
        await user.click(prevButton);

        // Assert
        screen.getByRole('button', { name: '1' })
        screen.getByRole('button', { name: '2' });
        screen.getByRole('button', { name: '3' });
        screen.getByRole('button', { name: '4' });
        screen.getByRole('button', { name: '5' });

        expect(emitted()['update:page'].length).toBe(2);
        expect(emitted()['change'].length).toBe(2);
    });

    test('Cannot next on last page', async () => {
        // Arrange
        let state = { page: 3, size: 5, total: 25 };
        const user = userEvent.setup();

        // Act
        const { rerender, emitted } = render(SPaginator, {
            props: {
                ...state,
                paginatorSize: "3",
                onChange: (e: { page?: number, size?: number }) => {
                    rerender({...state, ...e});
                },
            },
        });

        const nextButton = screen.getByRole('button', { name: /next/i });

        await user.click(nextButton);
        await user.click(nextButton);
        await user.click(nextButton);
        await user.click(nextButton);
        await user.click(nextButton);
        await user.click(nextButton);
        await user.click(nextButton);
        await user.click(nextButton);
        await user.click(nextButton);

        // Assert
        screen.getByRole('button', { name: '1' })
        screen.getByRole('button', { name: '2' });
        screen.getByRole('button', { name: '3' });
        screen.getByRole('button', { name: '4' });
        screen.getByRole('button', { name: '5' });

        expect(emitted()['update:page'].length).toBe(2);
        expect(emitted()['change'].length).toBe(2);
    });
});
