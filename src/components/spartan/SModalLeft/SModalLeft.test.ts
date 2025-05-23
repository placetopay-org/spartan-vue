import { test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SModalLeft from './SModalLeft.vue';
import { mount } from '@vue/test-utils';
import userEvent from '@testing-library/user-event';

describe('SModalLeft', () => {
    test('Throw warning for required props', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        mount(SModalLeft);

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
        const { rerender } = render(SModalLeft, {
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

    test('Can be closed with button', async () => {
        // Arrange
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));
        const user = userEvent.setup();

        // Act
        const { rerender, emitted } = render(SModalLeft, {
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
});
