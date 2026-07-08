import { test, describe, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import SToast from './SToast.vue';

// `SToast.vue` does not import vue-sonner; only `toast.ts` does. Mocking it here
// isolates the imperative API without touching the rendering tests below.
vi.mock('vue-sonner', () => ({
    toast: { custom: vi.fn() },
    Toaster: { name: 'Toaster' },
}));

const { toast, SToaster } = await import('./toast');
const { toast: vsToast, Toaster: vsToaster } = await import('vue-sonner');

describe('SToast', () => {
    describe('Rendering', () => {
        test('Can be rendered', () => {
            // Act
            render(SToast, { slots: { default: 'Toast test' } });

            // Assert
            expect(screen.getByText('Toast test')).toBeInTheDocument();
        });

        test('Can be rendered with title prop', () => {
            // Act
            render(SToast, { props: { title: 'Title text' } });

            // Assert
            expect(screen.getByText('Title text')).toBeInTheDocument();
        });

        test('Slot content takes precedence over title prop', () => {
            // Act
            render(SToast, {
                props: { title: 'Title prop' },
                slots: { default: 'Slot content' },
            });

            // Assert
            expect(screen.getByText('Slot content')).toBeInTheDocument();
        });
    });

    describe('Types', () => {
        test('Renders success type by default', () => {
            // Act
            const { container } = render(SToast, { slots: { default: 'Success toast' } });

            // Assert
            expect(container.firstElementChild).toHaveClass('border-green-500');
        });

        test('Renders error type', () => {
            // Act
            const { container } = render(SToast, {
                props: { type: 'error' },
                slots: { default: 'Error toast' },
            });

            // Assert
            expect(container.firstElementChild).toHaveClass('border-red-500');
        });

        test('Renders warning type', () => {
            // Act
            const { container } = render(SToast, {
                props: { type: 'warning' },
                slots: { default: 'Warning toast' },
            });

            // Assert
            expect(container.firstElementChild).toHaveClass('border-yellow-500');
        });
    });

    describe('Icon styles', () => {
        test('Success type renders green icon', () => {
            // Act
            const { container } = render(SToast, { slots: { default: 'Toast' } });
            const icon = container.querySelector('[aria-hidden="true"]');

            // Assert
            expect(icon).toHaveClass('text-green-500');
        });

        test('Error type renders red icon', () => {
            // Act
            const { container } = render(SToast, {
                props: { type: 'error' },
                slots: { default: 'Toast' },
            });
            const icon = container.querySelector('[aria-hidden="true"]');

            // Assert
            expect(icon).toHaveClass('text-red-500');
        });

        test('Warning type renders yellow icon', () => {
            // Act
            const { container } = render(SToast, {
                props: { type: 'warning' },
                slots: { default: 'Toast' },
            });
            const icon = container.querySelector('[aria-hidden="true"]');

            // Assert
            expect(icon).toHaveClass('text-yellow-500');
        });
    });

    describe('Description', () => {
        test('Can be rendered with description prop', () => {
            // Act
            render(SToast, {
                props: { description: 'A description' },
                slots: { default: 'Toast test' },
            });

            // Assert
            expect(screen.getByText('A description')).toBeInTheDocument();
        });

        test('Can be rendered with description slot', () => {
            // Act
            render(SToast, {
                slots: { default: 'Toast test', description: 'Slot description' },
            });

            // Assert
            expect(screen.getByText('Slot description')).toBeInTheDocument();
        });

        test('Description is not rendered when not provided', () => {
            // Act
            const { container } = render(SToast, { slots: { default: 'Toast test' } });

            // Assert
            expect(container.querySelector('p')).not.toBeInTheDocument();
        });
    });

    describe('Left border', () => {
        test('Renders with left border when leftBorder is true', () => {
            // Act
            const { container } = render(SToast, {
                props: { leftBorder: true },
                slots: { default: 'Toast test' },
            });

            // Assert
            expect(container.firstElementChild).toHaveClass('border-l-4');
        });

        test('Does not render left border by default', () => {
            // Act
            const { container } = render(SToast, { slots: { default: 'Toast test' } });

            // Assert
            expect(container.firstElementChild).not.toHaveClass('border-l-4');
        });
    });

    describe('Closeable', () => {
        test('Shows close button when closeable is true', () => {
            // Act
            render(SToast, {
                props: { closeable: true },
                slots: { default: 'Toast test' },
            });

            // Assert
            expect(screen.getByRole('button')).toBeInTheDocument();
        });

        test('Does not show close button by default', () => {
            // Act
            render(SToast, { slots: { default: 'Toast test' } });

            // Assert
            expect(screen.queryByRole('button')).not.toBeInTheDocument();
        });

        test('Emits closeToast event when close button is clicked', async () => {
            // Arrange
            const user = userEvent.setup();

            // Act
            const { emitted } = render(SToast, {
                props: { closeable: true },
                slots: { default: 'Toast test' },
            });

            await user.click(screen.getByRole('button'));

            // Assert
            expect(emitted()).toHaveProperty('closeToast');
            expect(emitted().closeToast).toHaveLength(1);
        });
    });

    describe('Accessibility', () => {
        test('Has aria-live attribute', () => {
            // Act
            const { container } = render(SToast, { slots: { default: 'Toast test' } });

            // Assert
            expect(container.firstElementChild).toHaveAttribute('aria-live', 'assertive');
        });

        test('Close button has sr-only text', () => {
            // Act
            render(SToast, {
                props: { closeable: true },
                slots: { default: 'Toast test' },
            });

            // Assert
            expect(screen.getByText('Close')).toHaveClass('sr-only');
        });

        test('Icon has aria-hidden attribute', () => {
            // Act
            const { container } = render(SToast, { slots: { default: 'Toast test' } });
            const icon = container.querySelector('[aria-hidden="true"]');

            // Assert
            expect(icon).toBeInTheDocument();
        });
    });

    describe('Class prop', () => {
        test('Applies custom class to the container', () => {
            // Act
            const { container } = render(SToast, {
                props: { class: 'custom-class' },
                slots: { default: 'Toast test' },
            });

            // Assert
            expect(container.firstElementChild).toHaveClass('custom-class');
        });
    });

    // The imperative entrypoint. It is what consumers call, and it was the least
    // covered part of the component.
    describe('toast()', () => {
        beforeEach(() => vi.mocked(vsToast.custom).mockClear());

        test('Renders SToast through vue-sonner', () => {
            // Act
            toast({ title: 'Saved' });

            // Assert
            expect(vsToast.custom).toHaveBeenCalledTimes(1);
            expect(vi.mocked(vsToast.custom).mock.calls[0][0]).toBe(SToast);
        });

        test('Routes the component props into componentProps', () => {
            // Act
            toast({
                type: 'error',
                title: 'Failed',
                description: 'Try again',
                closeable: true,
                leftBorder: true,
            });

            // Assert
            const [, options] = vi.mocked(vsToast.custom).mock.calls[0];
            expect(options).toMatchObject({
                componentProps: {
                    type: 'error',
                    title: 'Failed',
                    description: 'Try again',
                    closeable: true,
                    leftBorder: true,
                },
            });
        });

        test('Routes every other prop to vue-sonner as toast options', () => {
            // Act
            toast({ title: 'Saved', duration: 5000, position: 'top-center' } as never);

            // Assert
            const [, options] = vi.mocked(vsToast.custom).mock.calls[0] as [unknown, Record<string, unknown>];
            expect(options).toMatchObject({ duration: 5000, position: 'top-center' });
            // The split must be exhaustive: component props never leak into the options.
            expect(options).not.toHaveProperty('title');
            expect(options.componentProps).toMatchObject({ title: 'Saved' });
        });

        test('Marks the component raw, so Vue does not make it reactive', () => {
            // Act
            toast({ title: 'Saved' });

            // Assert
            const [component] = vi.mocked(vsToast.custom).mock.calls[0] as [Record<string, unknown>, unknown];
            expect(component.__v_skip).toBe(true);
        });

        test('Re-exports vue-sonner Toaster as SToaster', () => {
            expect(SToaster).toBe(vsToaster);
        });
    });
});
