import { test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SModalCard from './SModalCard.vue';
import { h } from 'vue';
import { mount } from '@vue/test-utils';

describe('SModalCard', () => {
    test('Throw warning for required props', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        mount(SModalCard);

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
        const { rerender } = render(SModalCard, {
            props: { open: false },
            slots: { default: 'Test content' },
        });

        // Assert
        expect(screen.queryByText('Test content')).not.toBeInTheDocument();
        await rerender({ open: true });
        expect(screen.queryByText('Test content')).toBeInTheDocument();
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
