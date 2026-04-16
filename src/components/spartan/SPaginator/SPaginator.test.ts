import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SPaginator from './SPaginator.vue';
import userEvent from '@testing-library/user-event';

describe('SPaginator', () => {
    test('Can be rendered', async () => {
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
        const state = { page: 16, size: 5, total: 125 };
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SPaginator, {
            props: {
                ...state,
                paginatorSize: '3',
                onChange: (e: { page?: number; size?: number }) => {
                    rerender({ ...state, ...e });
                },
            },
        });

        const nextButton = screen.getByRole('button', { name: /next/i });

        // Assert
        expect(screen.getAllByRole('button', { name: '...' }).length).toBe(2);
        screen.getByRole('button', { name: '1' });

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
        const state = { page: 4, size: 5, total: 30 };
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SPaginator, {
            props: {
                ...state,
                paginatorSize: '3',
                onChange: (e: { page?: number; size?: number }) => {
                    rerender({ ...state, ...e });
                },
            },
        });

        const button = screen.getByRole('button', { name: /2/i });

        await user.click(button);

        // Assert
        screen.getByRole('button', { name: '1' });
        screen.getByRole('button', { name: '2' });
        screen.getByRole('button', { name: '3' });
        screen.getByRole('button', { name: '4' });
        screen.getByRole('button', { name: '5' });
        screen.getByRole('button', { name: '6' });
    });

    test('Navigates to previous page', async () => {
        const state = { page: 3, size: 5, total: 50 };
        const user = userEvent.setup();

        const { rerender } = render(SPaginator, {
            props: {
                ...state,
                paginatorSize: '3',
                onChange: (e: { page?: number; size?: number; dir?: string }) => {
                    if (e.page) rerender({ ...state, page: e.page });
                },
            },
        });

        const prevButton = screen.getByRole('button', { name: /prev/i });
        await user.click(prevButton);

        expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    });

    test('Emits change with dir when on first page', async () => {
        const user = userEvent.setup();

        const { emitted } = render(SPaginator, {
            props: { page: 1, size: 10, total: 50 },
        });

        const prevButton = screen.getByRole('button', { name: /prev/i });
        await user.click(prevButton);

        // On first page, prev is disabled so no event
        expect(prevButton).toBeDisabled();
    });

    test('Disables next on last page', () => {
        render(SPaginator, {
            props: { page: 5, size: 10, total: 50 },
        });

        expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    });

    test('Renders page size selector when pageSizes provided', () => {
        render(SPaginator, {
            props: { page: 1, size: 10, total: 100, pageSizes: [10, 25, 50] },
        });

        const select = document.querySelector('select');
        expect(select).toBeTruthy();
    });

    test('Emits update:size when page size changes', async () => {
        const user = userEvent.setup();

        const { emitted } = render(SPaginator, {
            props: { page: 1, size: 10, total: 100, pageSizes: [10, 25, 50] },
        });

        const select = document.querySelector('select')!;
        await user.selectOptions(select, '25');

        expect(emitted()['change']).toBeTruthy();
    });

    test('Hides when single page and hideWhenSinglePage is true', () => {
        const { container } = render(SPaginator, {
            props: { page: 1, size: 10, total: 5, count: 1, hideWhenSinglePage: true },
        });

        expect(container.querySelector('[aria-label="pagination"]')).toBeNull();
    });

    test('Shows when multiple pages and hideWhenSinglePage is true', () => {
        render(SPaginator, {
            props: { page: 1, size: 10, total: 50, hideWhenSinglePage: true },
        });

        expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });

    test('Renders with count prop', () => {
        render(SPaginator, {
            props: { page: 1, count: 5 },
        });

        expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
    });

    test('Supports canGoPrev and canGoNext overrides', () => {
        render(SPaginator, {
            props: { page: 3, size: 10, total: 50, canGoPrev: false, canGoNext: false },
        });

        expect(screen.getByRole('button', { name: /prev/i })).toBeDisabled();
        expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    });

    // test('Cannot prev on first page', async () => {
    //     // Arrange
    //     let state = { page: 3, size: 5, total: 25 };
    //     const user = userEvent.setup();

    //     // Act
    //     const { rerender, emitted } = render(SPaginator, {
    //         props: {
    //             ...state,
    //             paginatorSize: "3",
    //             onChange: (e: { page?: number, size?: number }) => {
    //                 rerender({...state, ...e});
    //             },
    //         },
    //     });

    //     const prevButton = screen.getByRole('button', { name: /prev/i });

    //     await user.click(prevButton);
    //     await user.click(prevButton);
    //     await user.click(prevButton);
    //     await user.click(prevButton);
    //     await user.click(prevButton);
    //     await user.click(prevButton);
    //     await user.click(prevButton);
    //     await user.click(prevButton);
    //     await user.click(prevButton);

    //     // Assert
    //     screen.getByRole('button', { name: '1' })
    //     screen.getByRole('button', { name: '2' });
    //     screen.getByRole('button', { name: '3' });
    //     screen.getByRole('button', { name: '4' });
    //     screen.getByRole('button', { name: '5' });

    //     expect(emitted()['update:page'].length).toBe(2);
    //     expect(emitted()['change'].length).toBe(2);
    // });

    // test('Cannot next on last page', async () => {
    //     // Arrange
    //     let state = { page: 3, size: 5, total: 25 };
    //     const user = userEvent.setup();

    //     // Act
    //     const { rerender, emitted } = render(SPaginator, {
    //         props: {
    //             ...state,
    //             paginatorSize: "3",
    //             onChange: (e: { page?: number, size?: number }) => {
    //                 rerender({...state, ...e});
    //             },
    //         },
    //     });

    //     const nextButton = screen.getByRole('button', { name: /next/i });

    //     await user.click(nextButton);
    //     await user.click(nextButton);
    //     await user.click(nextButton);
    //     await user.click(nextButton);
    //     await user.click(nextButton);
    //     await user.click(nextButton);
    //     await user.click(nextButton);
    //     await user.click(nextButton);
    //     await user.click(nextButton);

    //     // Assert
    //     screen.getByRole('button', { name: '1' })
    //     screen.getByRole('button', { name: '2' });
    //     screen.getByRole('button', { name: '3' });
    //     screen.getByRole('button', { name: '4' });
    //     screen.getByRole('button', { name: '5' });

    //     expect(emitted()['update:page'].length).toBe(2);
    //     expect(emitted()['change'].length).toBe(2);
    // });
});
