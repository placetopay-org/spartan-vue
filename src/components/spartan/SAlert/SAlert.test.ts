import { test, describe, expect } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { InfoCircleIcon } from '@placetopay/iconsax-vue/outline';
import { NextIcon } from '@placetopay/iconsax-vue/outline';
import SAlert from './SAlert.vue';

describe('SAlert', () => {
    test('Can be rendered', () => {
        // Act
        render(SAlert);
        const alert = screen.getByRole('alert');

        // Assert
        expect(alert).toBeInTheDocument();
    });

    test('Can be rendered with slot content', () => {
        // Act
        render(SAlert, { slots: { default: 'This is an alert message' } });

        // Assert
        screen.getByText('This is an alert message');
    });

    test('Can be rendered with title', () => {
        // Act
        render(SAlert, { props: { title: 'Alert Title' } });

        // Assert
        const title = screen.getByRole('heading', { level: 3 });
        expect(title).toHaveTextContent('Alert Title');
        expect(title).toHaveClass('text-sm font-medium');
    });

    test('Can be rendered with description', () => {
        // Act
        render(SAlert, { props: { description: 'Alert description text' } });

        // Assert
        screen.getByText('Alert description text');
    });

    test('Can be rendered with title and description', () => {
        // Act
        render(SAlert, {
            props: {
                title: 'Alert Title',
                description: 'Alert description text',
            },
        });

        // Assert
        screen.getByRole('heading', { level: 3, name: 'Alert Title' });
        screen.getByText('Alert description text');
    });

    test('Can be rendered with icon', () => {
        // Act
        render(SAlert, {
            props: {
                title: 'Alert with icon',
                icon: InfoCircleIcon,
            },
        });

        // Assert
        const alert = screen.getByRole('alert');
        const icon = alert.querySelector('svg');
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveClass('h-5 w-5');
    });

    test('Can be rendered with different colors', () => {
        const colors = ['neutral', 'primary', 'secondary', 'success', 'info', 'warning', 'error'] as const;

        colors.forEach((color) => {
            // Act
            const { unmount } = render(SAlert, {
                props: {
                    title: `${color} alert`,
                    color,
                },
            });

            // Assert
            const alert = screen.getByRole('alert');
            expect(alert).toBeInTheDocument();

            unmount();
        });
    });

    test('Can be rendered with different variants', () => {
        const variants = ['solid', 'outline', 'soft', 'subtle'] as const;

        variants.forEach((variant) => {
            // Act
            const { unmount } = render(SAlert, {
                props: {
                    title: `${variant} alert`,
                    variant,
                },
            });

            // Assert
            const alert = screen.getByRole('alert');
            expect(alert).toBeInTheDocument();

            unmount();
        });
    });

    test('Can be rendered as closeable without close button by default', () => {
        // Act
        render(SAlert, { props: { title: 'Alert title' } });

        // Assert
        const closeButton = screen.queryByRole('button');
        expect(closeButton).not.toBeInTheDocument();
    });

    test('Can be rendered as closeable with close button', () => {
        // Act
        render(SAlert, {
            props: {
                title: 'Closeable alert',
                closeable: true,
            },
        });

        // Assert
        const closeButton = screen.getByRole('button');
        expect(closeButton).toBeInTheDocument();

        const closeIcon = closeButton.querySelector('svg');
        expect(closeIcon).toBeInTheDocument();
        expect(closeIcon).toHaveClass('size-5');
    });

    test('Can be rendered with custom close icon', () => {
        // Act
        render(SAlert, {
            props: {
                title: 'Alert with custom close icon',
                closeable: true,
                closeIcon: NextIcon,
            },
        });

        // Assert
        const closeButton = screen.getByRole('button');
        expect(closeButton).toBeInTheDocument();

        const closeIcon = closeButton.querySelector('svg');
        expect(closeIcon).toBeInTheDocument();
    });

    test('Emits close event when close button is clicked', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        const { emitted } = render(SAlert, {
            props: {
                title: 'Closeable alert',
                closeable: true,
            },
        });

        const closeButton = screen.getByRole('button');
        await user.click(closeButton);

        // Assert
        expect(emitted().close).toBeTruthy();
        expect(emitted().close).toHaveLength(1);
    });

    test('Can render slot content when no title or description provided', () => {
        // Act
        render(SAlert, {
            slots: { default: 'Slot content only' },
        });

        // Assert
        const slotContent = screen.getByText('Slot content only');
        expect(slotContent.parentElement).toHaveClass('min-w-0 flex-1');
    });

    test('Can render slot content when description is provided but not title', () => {
        // Act
        render(SAlert, {
            props: { description: 'Description text' },
            slots: { default: 'Slot content' },
        });

        // Assert
        screen.getByText('Description text');
        screen.queryByText('Slot content'); // Should not render slot when description exists
    });

    test('Can render slot content when title is provided but not description', () => {
        // Act
        render(SAlert, {
            props: { title: 'Alert Title' },
            slots: { default: 'Slot content instead of description' },
        });

        // Assert
        screen.getByRole('heading', { level: 3, name: 'Alert Title' });
        const slotContent = screen.getByText('Slot content instead of description');
        expect(slotContent.parentElement).toHaveClass('min-w-0 flex-1');
    });

    test('Has correct accessibility attributes', () => {
        // Act
        render(SAlert, {
            props: {
                title: 'Accessible alert',
                closeable: true,
            },
        });

        // Assert
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();

        const closeButton = screen.getByRole('button');
        const srOnly = closeButton.querySelector('.sr-only');
        expect(srOnly).toHaveTextContent('Close');

        const closeIcon = closeButton.querySelector('svg');
        expect(closeIcon).toHaveAttribute('aria-hidden', 'true');
    });

    test('Can be rendered with custom CSS classes', () => {
        // Act
        render(SAlert, {
            props: {
                title: 'Alert with custom class',
                class: 'custom-alert-class',
            },
        });

        // Assert
        const alert = screen.getByRole('alert');
        expect(alert).toHaveClass('custom-alert-class');
    });
});
