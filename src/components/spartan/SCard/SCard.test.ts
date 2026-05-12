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
            props: { icon: 'success', iconType: 'ping' },
            slots: { default: 'content' },
        });

        const iconContainer = document.querySelector('[data-s-iconcontainer]');
        expect(iconContainer?.className).toContain('radial-gradient-green');
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

    test.each(['success', 'danger', 'warning', 'info'] as const)(
        'Ping mode renders 4 ring divs for the %s status preset at md size',
        (variant) => {
            render(SCard, {
                props: { icon: variant, iconType: 'ping' },
                slots: { default: 'content' },
            });

            const iconContainer = document.querySelector('[data-s-iconcontainer]');
            const ringDivs = iconContainer?.querySelectorAll(':scope > div.border');
            expect(ringDivs?.length).toBe(4);
        },
    );

    test('Ping mode renders 3 ring divs at size=sm (one fewer than md)', () => {
        render(SCard, {
            props: { icon: 'success', iconType: 'ping', size: 'sm' },
            slots: { default: 'content' },
        });

        const iconContainer = document.querySelector('[data-s-iconcontainer]');
        const ringDivs = iconContainer?.querySelectorAll(':scope > div.border');
        expect(ringDivs?.length).toBe(3);
    });

    test('Ping rings do not use the deprecated Tailwind v3 border-opacity utility', () => {
        render(SCard, {
            props: { icon: 'success', iconType: 'ping' },
            slots: { default: 'content' },
        });

        const iconContainer = document.querySelector('[data-s-iconcontainer]');
        const offenders = iconContainer?.querySelectorAll('[class*="border-opacity-"]');
        expect(offenders?.length).toBe(0);
    });

    test('iconColor applies palette to a custom FunctionalComponent icon', () => {
        const CustomIcon = defineComponent({
            setup(_, { attrs }) {
                return () => h('svg', { ...attrs, 'data-testid': 'custom-shield' });
            },
        });

        render(SCard, {
            props: { icon: CustomIcon, iconColor: 'primary', iconType: 'solid' },
            slots: { default: 'content' },
        });

        const iconContainer = document.querySelector('[data-s-iconcontainer]');
        expect(iconContainer?.className).toContain('bg-spartan-primary-100');

        const customIcon = screen.getByTestId('custom-shield');
        expect(customIcon.getAttribute('class') ?? '').toContain('text-spartan-primary-600');
    });

    test('iconColor=secondary applies gray palette to a custom icon in ping mode', () => {
        const CustomIcon = defineComponent({
            setup(_, { attrs }) {
                return () => h('svg', { ...attrs, 'data-testid': 'custom-secondary' });
            },
        });

        render(SCard, {
            props: { icon: CustomIcon, iconColor: 'secondary', iconType: 'ping' },
            slots: { default: 'content' },
        });

        const iconContainer = document.querySelector('[data-s-iconcontainer]');
        expect(iconContainer?.className).toContain('radial-gradient-gray');
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
