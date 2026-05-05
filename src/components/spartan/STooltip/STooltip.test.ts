import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import STooltip from './STooltip.vue';
import userEvent from '@testing-library/user-event';
import { defineComponent, ref } from 'vue';

describe('STooltip', () => {
    test('renders with default props', async () => {
        // Act
        render(STooltip, {
            props: { title: 'Tooltip content' },
            slots: {
                default: 'Hover me',
            },
        });

        const triggerElement = screen.getByText('Hover me');

        // Assert
        expect(screen.queryByRole('tooltip', { name: 'Tooltip content' })).not.toBeInTheDocument();

        await userEvent.hover(triggerElement);

        expect(screen.getByRole('tooltip', { name: 'Tooltip content' })).toBeInTheDocument();
    });

    test('closes on mouseleave', async () => {
        const user = userEvent.setup();

        render(STooltip, {
            props: { title: 'Tooltip content' },
            slots: {
                default: 'Hover me',
            },
        });

        const triggerElement = screen.getByText('Hover me');

        await user.hover(triggerElement);
        expect(screen.getByRole('tooltip', { name: 'Tooltip content' })).toBeInTheDocument();

        await user.unhover(triggerElement);
        expect(screen.queryByRole('tooltip', { name: 'Tooltip content' })).not.toBeInTheDocument();
    });

    test('does not auto open or close when manual is true', async () => {
        const user = userEvent.setup();

        render(STooltip, {
            props: { title: 'Tooltip content', manual: true },
            slots: {
                default: 'Hover me',
            },
        });

        const triggerElement = screen.getByText('Hover me');

        await user.hover(triggerElement);
        expect(screen.queryByRole('tooltip', { name: 'Tooltip content' })).not.toBeInTheDocument();

        await user.unhover(triggerElement);
        expect(screen.queryByRole('tooltip', { name: 'Tooltip content' })).not.toBeInTheDocument();
    });

    test('exposes open, close, toggle, focus and isOpen via ref', async () => {
        const user = userEvent.setup();

        const Wrapper = defineComponent({
            components: { STooltip },
            setup() {
                const tooltip = ref<InstanceType<typeof STooltip>>();
                const status = ref('closed');
                const updateStatus = () => {
                    status.value = tooltip.value?.isOpen ? 'open' : 'closed';
                };
                const openTooltip = () => {
                    tooltip.value?.open();
                    updateStatus();
                };
                const closeTooltip = () => {
                    tooltip.value?.close();
                    updateStatus();
                };
                const toggleTooltip = () => {
                    tooltip.value?.toggle();
                    updateStatus();
                };
                const focusTooltip = () => {
                    tooltip.value?.focus();
                };
                return { tooltip, status, openTooltip, closeTooltip, toggleTooltip, focusTooltip };
            },
            template: `
                <button data-testid="open" @click="openTooltip">Open</button>
                <button data-testid="close" @click="closeTooltip">Close</button>
                <button data-testid="toggle" @click="toggleTooltip">Toggle</button>
                <button data-testid="focus" @click="focusTooltip">Focus</button>
                <span data-testid="status">{{ status }}</span>
                <STooltip ref="tooltip" title="Exposed tooltip" manual>
                    Trigger
                </STooltip>
            `,
        });

        render(Wrapper);

        await user.click(screen.getByTestId('open'));
        expect(screen.getByRole('tooltip', { name: 'Exposed tooltip' })).toBeInTheDocument();
        expect(screen.getByTestId('status')).toHaveTextContent('open');

        await user.click(screen.getByTestId('focus'));

        await user.click(screen.getByTestId('close'));
        expect(screen.getByTestId('status')).toHaveTextContent('closed');

        await user.click(screen.getByTestId('toggle'));
        expect(screen.getByTestId('status')).toHaveTextContent('open');

        await user.click(screen.getByTestId('toggle'));
        expect(screen.getByTestId('status')).toHaveTextContent('closed');
    });

    test('renders with light color variant', async () => {
        render(STooltip, {
            props: { title: 'Light tooltip', color: 'light' },
            slots: { default: 'Hover light' },
        });

        await userEvent.hover(screen.getByText('Hover light'));

        const tooltip = screen.getByRole('tooltip', { name: 'Light tooltip' });
        expect(tooltip).toHaveClass('bg-white');
    });

    test('renders with dark color variant', async () => {
        render(STooltip, {
            props: { title: 'Dark tooltip', color: 'dark' },
            slots: { default: 'Hover dark' },
        });

        await userEvent.hover(screen.getByText('Hover dark'));

        const tooltip = screen.getByRole('tooltip', { name: 'Dark tooltip' });
        expect(tooltip).toHaveClass('text-white');
    });

    test('does not render arrow when arrow prop is false', async () => {
        const { container } = render(STooltip, {
            props: { title: 'No arrow', arrow: false },
            slots: { default: 'Hover no arrow' },
        });

        await userEvent.hover(screen.getByText('Hover no arrow'));

        // Arrow element is the sibling div with rotate-45 transform; with arrow disabled
        // the tooltip floating panel should only contain the role="tooltip" element.
        const tooltip = screen.getByRole('tooltip', { name: 'No arrow' });
        expect(tooltip.parentElement?.children.length).toBe(1);
        expect(container).toBeTruthy();
    });
});
