import { test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SModal from './SModal.vue';
import SModalTitle from './SModalTitle.vue';
import SModalDescription from './SModalDescription.vue';
import { h } from 'vue';
import { mount } from '@vue/test-utils';

describe('SModal', () => {
    test('Throw warning for required props', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        mount(SModal);

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
        const { rerender } = render(SModal, {
            props: { open: false },
            slots: { default: 'Test content' },
        });

        // Assert
        expect(screen.queryByText('Test content')).not.toBeInTheDocument();
        await rerender({ open: true });
        expect(screen.queryByText('Test content')).toBeInTheDocument();
    });

    describe('Can be rendered with position', () => {
        test.each([
            ['top', 'items-end sm:items-start'],
            ['nearTop', 'items-end sm:items-start mt-20'],
            ['bottom', 'items-end sm:items-end'],
        ])('position %s showed well', async (position, expected) => {
            // Arrange
            window.ResizeObserver = vi.fn(() => ({
                observe: vi.fn(),
                unobserve: vi.fn(),
                disconnect: vi.fn(),
            }));

            // Act
            const { rerender } = render(SModal, {
                props: { open: false, position },
                slots: { default: 'Test content' },
            });
            await rerender({ open: true });

            const container = screen.queryByText('Test content')!.parentElement!;

            // Assert
            expect(container).toHaveClass(expected);
        });

        test.each([
            ['top', 'items-start'],
            ['nearTop', 'items-start mt-20'],
            ['bottom', 'items-end'],
        ])('position %s showed well without responsive', async (position, expected) => {
            // Arrange
            window.ResizeObserver = vi.fn(() => ({
                observe: vi.fn(),
                unobserve: vi.fn(),
                disconnect: vi.fn(),
            }));

            // Act
            const { rerender } = render(SModal, {
                props: { open: false, responsive: false, position },
                slots: { default: 'Test content' },
            });
            await rerender({ open: true });

            const container = screen.queryByText('Test content')!.parentElement!;

            // Assert
            expect(container).toHaveClass(expected);
        });
    });

    test('Can be rendered with title', async () => {
        // Arrange
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));
        const modalTitle = h(SModalTitle, {}, { default: () => 'Test title' });

        // Act
        const { rerender } = render(SModal, {
            props: { open: false, position: 'top' },
            slots: { default: [modalTitle, 'Test content'] },
        });
        await rerender({ open: true });

        // Assert
        screen.getByText('Test content');
        screen.getByRole('heading', { name: 'Test title' });
    });

    test('Can be rendered with description', async () => {
        // Arrange
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));
        const modalDescription = h(SModalDescription, {}, { default: () => 'Test description' });

        // Act
        const { rerender } = render(SModal, {
            props: { open: false, position: 'top' },
            slots: { default: [modalDescription, 'Test content'] },
        });
        await rerender({ open: true });

        // Assert
        screen.getByText('Test content');
        screen.getByText('Test description');
    });

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
