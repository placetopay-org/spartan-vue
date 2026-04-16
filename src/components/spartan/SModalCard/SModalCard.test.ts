import { test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import SModalCard from './SModalCard.vue';

describe('SModalCard', () => {
    test('Can be rendered', async () => {
        // Arrange
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));

        // Act
        const { rerender } = render(SModalCard, {
            props: { open: false },
            slots: { default: 'Test content' },
        });

        // Assert
        expect(screen.queryByText('Test content')).not.toBeInTheDocument();
        await rerender({ open: true });
        expect(screen.queryByText('Test content')).toBeInTheDocument();
    });

    test('Renders with title', async () => {
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));

        render(SModalCard, {
            props: { open: true, title: 'My Title' },
            slots: { default: 'Body content' },
        });

        expect(screen.getByText('My Title')).toBeInTheDocument();
        expect(screen.getByText('Body content')).toBeInTheDocument();
    });

    test('Renders with description slot', async () => {
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));

        render(SModalCard, {
            props: { open: true },
            slots: { default: 'Content', description: 'Description text' },
        });

        expect(screen.getByText('Description text')).toBeInTheDocument();
    });

    test('Emits update:open false when close button clicked', async () => {
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));
        const user = userEvent.setup();

        const { emitted } = render(SModalCard, {
            props: { open: true, icon: 'danger', closable: true },
            slots: { default: 'Content' },
        });

        const closeButton = screen.getByRole('button');
        await user.click(closeButton);

        expect(emitted()['update:open']).toBeTruthy();
        expect(emitted()['update:open'].some((e: any) => e[0] === false)).toBe(true);
    });

    test('Renders with icon', async () => {
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));

        render(SModalCard, {
            props: { open: true, icon: 'success', title: 'Success' },
            slots: { default: 'Done' },
        });

        expect(screen.getByText('Success')).toBeInTheDocument();
    });

    test('Renders actions slot', async () => {
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));

        render(SModalCard, {
            props: { open: true },
            slots: { default: 'Content', actions: '<button>Save</button>' },
        });

        expect(screen.getByText('Save')).toBeInTheDocument();
    });

    // test('Can be rendered with slots', async () => {
    //     // Arrange
    //     window.ResizeObserver = vi.fn(() => ({
    //         observe: vi.fn(),
    //         unobserve: vi.fn(),
    //         disconnect: vi.fn(),
    //     }));

    //     // Act
    //     const { rerender } = render(SModalCard, {
    //         props: { open: false },
    //         slots: { title: 'Test Title', default: 'Test content', description: 'Test description', actions: 'Test actions' },
    //     });
    //     await rerender({ open: true });

    //     // Assert
    //     screen.getAllByRole('heading', { name: 'Test Title' });
    //     screen.getByText('Test description');
    //     screen.getByText('Test content');
    //     screen.getByText('Test actions');
    // });
});
