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
        expect(clickableOverlay).toBeTruthy();
        await user.click(clickableOverlay as HTMLElement);

        const events = emitted()['update:open'];
        expect(events.some((e: any) => e[0] === false)).toBe(true);
        // `close` was removed in 3.0: it fired alongside update:open on the same
        // trigger, adding nothing, and clashed with SModalLeft/SModalSide, where
        // `close` means the X button was pressed.
        expect(emitted()).not.toHaveProperty('close');
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
});
