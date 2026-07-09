import { test, describe, vi, beforeEach, afterEach } from 'vitest';
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
        expect(screen.getAllByRole('button', { name: '...' })).toHaveLength(2);
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

        expect(screen.getAllByRole('button', { name: '...' })).toHaveLength(1);
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

        render(SPaginator, {
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

    test('Emits change with dir only when prev is forced on first page', async () => {
        const user = userEvent.setup();

        const { emitted } = render(SPaginator, {
            props: { page: 1, size: 10, total: 50, canGoPrev: true },
        });

        await user.click(screen.getByRole('button', { name: /prev/i }));

        expect(emitted()['change']).toEqual([[{ dir: 'prev' }]]);
        expect(emitted()['update:page']).toBeUndefined();
    });

    test('Emits change with dir only when next is forced on last page', async () => {
        const user = userEvent.setup();

        const { emitted } = render(SPaginator, {
            props: { page: 5, size: 10, total: 50, canGoNext: true },
        });

        await user.click(screen.getByRole('button', { name: /next/i }));

        expect(emitted()['change']).toEqual([[{ dir: 'next' }]]);
        expect(emitted()['update:page']).toBeUndefined();
    });

    test('Next emits update:page when not on last', async () => {
        const user = userEvent.setup();

        const { emitted } = render(SPaginator, {
            props: { page: 2, size: 10, total: 50 },
        });

        await user.click(screen.getByRole('button', { name: /next/i }));

        expect(emitted()['change']).toEqual([[{ page: 3, dir: 'next' }]]);
        expect(emitted()['update:page']).toEqual([[3]]);
    });

    test('Clicking a numbered page emits change and update:page', async () => {
        const user = userEvent.setup();

        const { emitted } = render(SPaginator, {
            props: { page: 1, size: 10, total: 50 },
        });

        await user.click(screen.getByRole('button', { name: '3' }));

        expect(emitted()['change']).toEqual([[{ page: 3 }]]);
        expect(emitted()['update:page']).toEqual([[3]]);
    });

    test('Clicking the active page emits nothing', async () => {
        const user = userEvent.setup();

        const { emitted } = render(SPaginator, {
            props: { page: 1, size: 10, total: 50 },
        });

        await user.click(screen.getByRole('button', { name: '1' }));

        expect(emitted()['change']).toBeUndefined();
        expect(emitted()['update:page']).toBeUndefined();
    });

    test('Hides numbers when hideNumbers is true', () => {
        render(SPaginator, {
            props: { page: 1, size: 10, total: 50, hideNumbers: true },
        });

        expect(screen.queryByRole('button', { name: '1' })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: /prev/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });

    test('updateSize ignores empty value', async () => {
        const { emitted } = render(SPaginator, {
            props: { page: 1, size: 10, total: 100, pageSizes: [10, 25, 50] },
        });

        const select = document.querySelector('select')!;
        select.value = '';
        select.dispatchEvent(new Event('change', { bubbles: true }));

        expect(emitted()['update:size']).toBeUndefined();
    });

    test('pageSizes trims at total and pushes current size if missing', () => {
        render(SPaginator, {
            // size 15 is not in pageSizes; total 40 caps items >= 40
            props: { page: 1, size: 15, total: 40, pageSizes: [10, 25, 50, 100] },
        });

        const select = document.querySelector('select')!;
        const options = Array.from(select.options).map((o) => o.value);
        expect(options).toContain('15');
        expect(options).toContain('40');
        expect(options).not.toContain('50');
        expect(options).not.toContain('100');
    });

    test('Renders "of {total} results" suffix when total is provided with pageSizes', () => {
        render(SPaginator, {
            props: { page: 1, size: 10, total: 50, pageSizes: [10, 25] },
        });

        expect(screen.getByText('50')).toBeInTheDocument();
    });

    describe('Laravel pagination', () => {
        let originalHref: string;

        beforeEach(() => {
            originalHref = window.location.href;
            const url = new URL('http://localhost/items?page=1');
            Object.defineProperty(window, 'location', {
                value: {
                    href: url.toString(),
                    assign: vi.fn(),
                    replace: vi.fn(),
                },
                writable: true,
                configurable: true,
            });
        });

        afterEach(() => {
            Object.defineProperty(window, 'location', {
                value: { href: originalHref },
                writable: true,
                configurable: true,
            });
        });

        const flatLaravel = {
            total: 50,
            per_page: 10,
            current_page: 2,
            last_page: 5,
            prev_page_url: 'http://localhost/items?page=1',
            next_page_url: 'http://localhost/items?page=3',
            links: [
                { url: 'http://localhost/items?page=1', label: '1' },
                { url: 'http://localhost/items?page=2', label: '2', active: true },
                { url: 'http://localhost/items?page=3', label: '3' },
            ],
        };

        const resourceLaravel = {
            meta: {
                total: 50,
                per_page: 10,
                current_page: 2,
                last_page: 5,
                links: [
                    { url: 'http://localhost/items?page=1', label: '1' },
                    { url: 'http://localhost/items?page=2', label: '2', active: true },
                    { url: 'http://localhost/items?page=3', label: '3' },
                ],
            },
            links: {
                prev: 'http://localhost/items?page=1',
                next: 'http://localhost/items?page=3',
            },
        };

        test('Renders with flat Laravel pagination shape', () => {
            render(SPaginator, { props: { laravel: flatLaravel, pageSizes: [10, 25] } });

            expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
        });

        test('Renders with Laravel resource shape (meta + links)', () => {
            render(SPaginator, { props: { laravel: resourceLaravel, pageSizes: [10, 25] } });

            expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
        });

        test('Clicking next navigates via window.location with flat laravel', async () => {
            const user = userEvent.setup();

            render(SPaginator, { props: { laravel: flatLaravel } });

            await user.click(screen.getByRole('button', { name: /next/i }));

            expect(window.location.href).toBe('http://localhost/items?page=3');
        });

        test('Clicking prev navigates via window.location with flat laravel', async () => {
            const user = userEvent.setup();

            render(SPaginator, { props: { laravel: flatLaravel } });

            await user.click(screen.getByRole('button', { name: /prev/i }));

            expect(window.location.href).toBe('http://localhost/items?page=1');
        });

        test('Computes vTotal/vSize/vPage from laravel when no top-level fields provided', () => {
            // No last_page so vCount falls through to vTotal/vSize math, exercising those branches
            const laravelNoLastPage = {
                total: 30,
                per_page: 10,
                current_page: 1,
                links: [
                    { url: 'http://localhost/items?page=1', label: '1' },
                    { url: 'http://localhost/items?page=2', label: '2' },
                    { url: 'http://localhost/items?page=3', label: '3' },
                ],
            };

            render(SPaginator, { props: { laravel: laravelNoLastPage } });

            expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
        });

        test('Renders nothing meaningful when laravel has no totals or page info', () => {
            const { container } = render(SPaginator, {
                props: { laravel: { total: undefined, per_page: undefined } as any },
            });

            // vPages is [], no number buttons — prev/next only
            expect(container.querySelectorAll('button').length).toBeLessThanOrEqual(2);
        });

        test('vSize falls through to undefined when laravel has total but no per_page', () => {
            // Forces vCount to access vSize while perPage is undefined → exercises vSize fallback
            const laravelTotalOnly = { total: 30, current_page: 1 } as any;

            render(SPaginator, { props: { laravel: laravelTotalOnly } });

            // vCount is undefined → no number buttons rendered, but component still renders prev/next
            expect(screen.getByRole('button', { name: /prev/i })).toBeInTheDocument();
        });

        test('Clicking prev uses inertiaRouter when provided', async () => {
            const user = userEvent.setup();
            const inertia = { visit: vi.fn() };

            render(SPaginator, { props: { laravel: flatLaravel, inertiaRouter: inertia } });

            await user.click(screen.getByRole('button', { name: /prev/i }));

            expect(inertia.visit).toHaveBeenCalledWith('http://localhost/items?page=1');
        });

        test('Clicking next uses inertiaRouter when provided', async () => {
            const user = userEvent.setup();
            const inertia = { visit: vi.fn() };

            render(SPaginator, { props: { laravel: flatLaravel, inertiaRouter: inertia } });

            await user.click(screen.getByRole('button', { name: /next/i }));

            expect(inertia.visit).toHaveBeenCalledWith('http://localhost/items?page=3');
        });

        test('Clicking a page number navigates via window.location with laravel links', async () => {
            const user = userEvent.setup();

            render(SPaginator, { props: { laravel: flatLaravel } });

            await user.click(screen.getByRole('button', { name: '3' }));

            expect(window.location.href).toBe('http://localhost/items?page=3');
        });

        test('Clicking a page number uses inertiaRouter when provided', async () => {
            const user = userEvent.setup();
            const inertia = { visit: vi.fn() };

            render(SPaginator, { props: { laravel: flatLaravel, inertiaRouter: inertia } });

            await user.click(screen.getByRole('button', { name: '3' }));

            expect(inertia.visit).toHaveBeenCalledWith('http://localhost/items?page=3');
        });

        test('Changing page size with laravel navigates to URL with new per_page', async () => {
            const user = userEvent.setup();

            render(SPaginator, { props: { laravel: flatLaravel, pageSizes: [10, 25, 50] } });

            const select = document.querySelector('select')!;
            await user.selectOptions(select, '25');

            expect(window.location.href).toContain('per_page=25');
            expect(window.location.href).toContain('page=1');
        });

        test('Changing page size with laravel + inertiaRouter calls visit', async () => {
            const user = userEvent.setup();
            const inertia = { visit: vi.fn() };

            render(SPaginator, {
                props: { laravel: flatLaravel, pageSizes: [10, 25, 50], inertiaRouter: inertia },
            });

            const select = document.querySelector('select')!;
            await user.selectOptions(select, '25');

            expect(inertia.visit).toHaveBeenCalled();
            const arg = inertia.visit.mock.calls[0][0];
            expect(arg).toContain('per_page=25');
            expect(arg).toContain('page=1');
        });

        test('Renders pagination buttons as anchors when asLinks is provided', () => {
            const laravelWithAsLinks = { ...flatLaravel, asLinks: 'a' };

            render(SPaginator, { props: { laravel: laravelWithAsLinks } });

            const prev = screen.getByRole('link', { name: /prev/i });
            const next = screen.getByRole('link', { name: /next/i });
            expect(prev).toHaveAttribute('href', 'http://localhost/items?page=1');
            expect(next).toHaveAttribute('href', 'http://localhost/items?page=3');
        });

        test('Falls back to button when asLinks href is missing', () => {
            const laravelNoPrev = { ...flatLaravel, prev_page_url: null, asLinks: 'a' };

            render(SPaginator, { props: { laravel: laravelNoPrev } });

            expect(screen.getByRole('button', { name: /prev/i })).toBeInTheDocument();
        });
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
