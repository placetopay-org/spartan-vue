import { test, describe, vi } from 'vitest';
import { render, waitFor } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SModalSide from './SModalSide.vue';
import { mount } from '@vue/test-utils';
import userEvent from '@testing-library/user-event';

describe('SModalSide', () => {
    test('Throw warning for required props', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        mount(SModalSide);

        // Assert
        expect(warn).not.toHaveBeenCalledOnce();
    });

    test('Can be rendered', async () => {
        // Arrange
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));

        // Act
        const { rerender } = render(SModalSide, {
            props: { open: false },
            slots: { default: 'Test content' },
        });

        // Assert
        expect(screen.queryByText('Test content')).not.toBeInTheDocument();
        await rerender({ open: true });
        expect(screen.queryByText('Test content')).toBeInTheDocument();
        expect(screen.queryByText('Test content')?.parentElement?.parentElement).toHaveClass(
            'fixed inset-0 w-screen overflow-y-auto',
        );
    });

    test('Renders with left side by default', async () => {
        // Arrange
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));

        // Act
        render(SModalSide, {
            props: { open: true },
            slots: { default: 'Test content' },
        });

        // Assert
        await waitFor(() => {
            const flexContainer = document.querySelector('.flex.h-full');
            const closeButton = document.querySelector('button[aria-label="Close modal"]');

            expect(flexContainer).toHaveClass('justify-start');
            expect(closeButton).toHaveClass('right-4');
        });
    });

    test('Renders with left side when explicitly set', async () => {
        // Arrange
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));

        // Act
        render(SModalSide, {
            props: { open: true, side: 'left' },
            slots: { default: 'Test content' },
        });

        // Assert
        await waitFor(() => {
            const flexContainer = document.querySelector('.flex.h-full');
            const closeButton = document.querySelector('button[aria-label="Close modal"]');

            expect(flexContainer).toHaveClass('justify-start');
            expect(closeButton).toHaveClass('right-4');
        });
    });

    test('Renders with right side when set', async () => {
        // Arrange
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));

        // Act
        render(SModalSide, {
            props: { open: true, side: 'right' },
            slots: { default: 'Test content' },
        });

        // Assert
        await waitFor(() => {
            const flexContainer = document.querySelector('.flex.h-full');
            const closeButton = document.querySelector('button[aria-label="Close modal"]');

            expect(flexContainer).toHaveClass('justify-end');
            expect(closeButton).toHaveClass('left-4');
        });
    });

    test('Can be closed with button', async () => {
        // Arrange
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));
        const user = userEvent.setup();

        // Act
        const { rerender, emitted } = render(SModalSide, {
            props: { open: false },
            slots: { default: 'Test content' },
        });
        await rerender({ open: true });

        const closeButton = screen.getByRole('button');

        await user.click(closeButton);

        // Assert
        expect(emitted()).toHaveProperty('backdropClick');
        expect(emitted()).toHaveProperty('close');
    });

    test('Close button has accessible label', async () => {
        // Arrange
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));

        // Act
        render(SModalSide, {
            props: { open: true },
            slots: { default: 'Test content' },
        });

        // Assert
        await waitFor(() => {
            const closeButton = screen.getByRole('button');
            expect(closeButton).toHaveAttribute('aria-label', 'Close modal');
        });
    });
});
