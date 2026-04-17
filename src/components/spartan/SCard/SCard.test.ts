import { test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import SCard from './SCard.vue';
import { defineComponent, h } from 'vue';

describe('SCard', () => {
    test('Can be rendered', () => {
        // Act
        render(SCard, { slots: { default: 'test content' } });

        // Assert
        screen.getByText('test content');
        const card = screen.getByRole('article');
        expect(card).toBeInTheDocument();
    });

    test('Can be render with small size', () => {
        // Act
        render(SCard, { props: { size: 'sm' }, slots: { default: 'test content' } });

        // Assert
        screen.getByText('test content');
        const card = screen.getByRole('article');
        expect(card).toHaveClass('rounded-md');
    });

    test('Can be render with icon', () => {
        // Act
        render(SCard, { props: { icon: 'success' }, slots: { default: 'test content' } });

        // Assert
        screen.getByText('test content');
        const card = screen.getByRole('article');
        expect(card?.firstElementChild?.firstElementChild?.firstElementChild).toHaveClass('h-6 w-6 text-green-600');
    });

    test('Renders title when provided', () => {
        render(SCard, { props: { title: 'Card Title' }, slots: { default: 'content' } });

        expect(screen.getByText('Card Title')).toBeInTheDocument();
    });

    test('Renders description slot', () => {
        render(SCard, {
            slots: { default: 'content', description: 'Card description' },
        });

        expect(screen.getByText('Card description')).toBeInTheDocument();
    });

    test('Renders closable button and emits close', async () => {
        const user = userEvent.setup();

        const { emitted } = render(SCard, {
            props: { icon: 'danger', closable: true },
            slots: { default: 'content' },
        });

        const closeButton = screen.getByRole('button');
        await user.click(closeButton);

        expect(emitted()).toHaveProperty('close');
    });

    test('Renders with different icon types', () => {
        render(SCard, { props: { icon: 'warning' }, slots: { default: 'content' } });

        expect(screen.getByRole('article')).toBeInTheDocument();
    });

    test('Renders actions slot', () => {
        render(SCard, {
            slots: { default: 'content', actions: '<button>Action</button>' },
        });

        expect(screen.getByText('Action')).toBeInTheDocument();
    });

    test('Renders custom FunctionalComponent icon (non-string)', () => {
        const CustomIcon = defineComponent({
            setup(_, { attrs }) {
                return () => h('svg', { ...attrs, 'data-testid': 'custom-icon' });
            },
        });

        render(SCard, {
            props: { icon: CustomIcon, iconType: 'solid' },
            slots: { default: 'content' },
        });

        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    test('Renders icon with overridden iconColor', () => {
        render(SCard, {
            props: { icon: 'danger', iconColor: 'success', iconType: 'solid' },
            slots: { default: 'content' },
        });

        const iconContainer = document.querySelector('[data-s-iconcontainer]');
        expect(iconContainer?.className).toContain('bg-green-100');
    });

    test('Renders icon with ping type', () => {
        render(SCard, {
            props: { icon: 'primary', iconType: 'ping' },
            slots: { default: 'content' },
        });

        const iconContainer = document.querySelector('[data-s-iconcontainer]');
        expect(iconContainer?.className).toContain('radial-gradient-primary');
    });

    test('Renders custom icon with ping type', () => {
        const CustomIcon = defineComponent({
            setup(_, { attrs }) {
                return () => h('svg', { ...attrs, 'data-testid': 'ping-custom' });
            },
        });

        render(SCard, {
            props: { icon: CustomIcon, iconType: 'ping' },
            slots: { default: 'content' },
        });

        expect(screen.getByTestId('ping-custom')).toBeInTheDocument();
    });

    test('Renders actions prop with TAction objects', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();

        const TestIcon = defineComponent({
            setup(_, { attrs }) {
                return () => h('svg', { ...attrs, 'data-testid': 'action-icon' });
            },
        });

        render(SCard, {
            props: {
                actions: [
                    { icon: TestIcon, text: 'Confirm', onClick },
                    { icon: TestIcon, text: 'Cancel', onClick: vi.fn() },
                ],
            },
            slots: { default: 'content' },
        });

        expect(screen.getByText('Confirm')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getAllByTestId('action-icon')).toHaveLength(2);

        await user.click(screen.getByText('Confirm'));
        expect(onClick).toHaveBeenCalledOnce();
    });
});
