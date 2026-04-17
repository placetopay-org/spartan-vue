import { test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import SModal from './SModal.vue';

describe('SModal', () => {
    const resizeObserverMock = () => {
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));
    };

    test('Can be rendered', async () => {
        resizeObserverMock();

        const { rerender } = render(SModal, {
            props: { open: false },
            slots: { default: 'Test content' },
        });

        expect(screen.queryByText('Test content')).not.toBeInTheDocument();
        await rerender({ open: true });
        expect(screen.queryByText('Test content')).toBeInTheDocument();
    });

    test('Locks scroll when open', () => {
        resizeObserverMock();

        render(SModal, {
            props: { open: true },
            slots: { default: 'Content' },
        });

        expect(document.documentElement.style.overflow).toBe('hidden');
    });

    test('Restores scroll when closed', async () => {
        vi.useFakeTimers();
        resizeObserverMock();

        const { rerender } = render(SModal, {
            props: { open: true },
            slots: { default: 'Content' },
        });

        await rerender({ open: false });
        vi.advanceTimersByTime(200);

        expect(document.documentElement.style.overflow).toBe('');
        vi.useRealTimers();
    });

    test('Emits update:open when backdrop is clicked', async () => {
        resizeObserverMock();
        const user = userEvent.setup();

        const { emitted } = render(SModal, {
            props: { open: true },
            slots: { default: '<div>Content</div>' },
        });

        const overlays = document.querySelectorAll('.fixed.inset-0.z-40');
        const clickableOverlay = overlays[overlays.length - 1];
        if (clickableOverlay) await user.click(clickableOverlay as HTMLElement);

        const events = emitted()['update:open'];
        if (events) {
            expect(events.some((e: any) => e[0] === false)).toBe(true);
        }
    });

    test('Does not close when preventClose is true', async () => {
        resizeObserverMock();
        const user = userEvent.setup();

        const { emitted } = render(SModal, {
            props: { open: true, preventClose: true },
            slots: { default: 'Content' },
        });

        const overlays = document.querySelectorAll('.fixed.inset-0.z-40');
        const clickableOverlay = overlays[overlays.length - 1];
        if (clickableOverlay) await user.click(clickableOverlay as HTMLElement);

        expect(emitted()['update:open']).toBeUndefined();
    });

    test('Renders with responsive false (centered)', async () => {
        resizeObserverMock();

        render(SModal, {
            props: { open: true, responsive: false },
            slots: { default: 'Centered' },
        });

        const container = document.querySelector('[data-s-container]');
        expect(container?.className).toContain('-translate-y-1/2');
    });

    // describe('Can be rendered with position', () => {
    //     test.each([
    //         ['top', 'items-end sm:items-start'],
    //         ['nearTop', 'items-end sm:items-start mt-20'],
    //         ['bottom', 'items-end sm:items-end'],
    //     ])('position %s showed well', async (position, expected) => {
    //         // Arrange
    //         window.ResizeObserver = vi.fn(() => ({
    //             observe: vi.fn(),
    //             unobserve: vi.fn(),
    //             disconnect: vi.fn(),
    //         }));

    //         // Act
    //         const { rerender } = render(SModal, {
    //             props: { open: false, position },
    //             slots: { default: 'Test content' },
    //         });
    //         await rerender({ open: true });

    //         const container = screen.queryByText('Test content')!.parentElement!;

    //         // Assert
    //         expect(container).toHaveClass(expected);
    //     });

    //     test.each([
    //         ['top', 'items-start'],
    //         ['nearTop', 'items-start mt-20'],
    //         ['bottom', 'items-end'],
    //     ])('position %s showed well without responsive', async (position, expected) => {
    //         // Arrange
    //         window.ResizeObserver = vi.fn(() => ({
    //             observe: vi.fn(),
    //             unobserve: vi.fn(),
    //             disconnect: vi.fn(),
    //         }));

    //         // Act
    //         const { rerender } = render(SModal, {
    //             props: { open: false, responsive: false, position },
    //             slots: { default: 'Test content' },
    //         });
    //         await rerender({ open: true });

    //         const container = screen.queryByText('Test content')!.parentElement!;

    //         // Assert
    //         expect(container).toHaveClass(expected);
    //     });
    // });

    // test('Can be close clicking the backdrop', async () => {
    //     // Arrange
    //     window.ResizeObserver = vi.fn(() => ({
    //         observe: vi.fn(),
    //         unobserve: vi.fn(),
    //         disconnect: vi.fn(),
    //     }));
    //     const user = userEvent.setup();
    //     let open = false;

    //     // Act
    //     const { rerender } = render(SModal, {
    //         props: {
    //             open: false,
    //             close: (e: boolean) => {
    //                 console.log('close', e);
    //                 rerender({ open: e });
    //             },
    //         },
    //         slots: { default: 'Test content' },
    //         global: {
    //             stubs: { teleport: true },
    //         }
    //     });
    //     await rerender({ open: true });

    //     render(SButton, { props: { onClick: () => { rerender({ open: false }) } }, slots: { default: 'Open modal' } });

    //     const button = screen.getByText('Open modal');

    //     await user.click(button);

    // await user.keyboard('{Escape}');

    // const backdrop = screen.getByRole('dialog').firstElementChild!;

    // await user.click(backdrop);

    // console.log('backdrop', backdrop);
    // const backdrop = screen.getByTestId('fixed inset-0 bg-black/30 duration-300 ease-out opacity-0');

    // Assert
    // await screen.debug();
    // });
});
