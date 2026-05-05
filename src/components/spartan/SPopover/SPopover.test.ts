import { test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SPopover from './SPopover.vue';
import userEvent from '@testing-library/user-event';
import { defineComponent, h, ref, nextTick } from 'vue';

const flushRaf = () =>
    new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
    });

describe('SPopover', () => {
    test('Can be rendered', async () => {
        const user = userEvent.setup();

        render(SPopover, {
            slots: {
                default: 'Hello World!',
                reference: ({ open }) =>
                    h(
                        'button',
                        {
                            onClick() {
                                open();
                            },
                        },
                        'Reference element',
                    ),
            },
        });

        const button = screen.getByRole('button', { name: 'Reference element' });
        await user.click(button);

        screen.getByText('Hello World!');
    });

    test('Toggles via the exposed toggle handler', async () => {
        const user = userEvent.setup();

        render(SPopover, {
            slots: {
                default: 'Toggleable content',
                reference: ({ toggle }) =>
                    h(
                        'button',
                        {
                            onClick() {
                                toggle();
                            },
                        },
                        'Toggle reference',
                    ),
            },
        });

        const button = screen.getByRole('button', { name: 'Toggle reference' });

        expect(screen.queryByText('Toggleable content')).not.toBeInTheDocument();

        await user.click(button);
        expect(screen.getByText('Toggleable content')).toBeInTheDocument();

        await user.click(button);
        expect(screen.queryByText('Toggleable content')).not.toBeInTheDocument();
    });

    test('Emits close event when close handler is invoked', async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();

        render(SPopover, {
            attrs: { onClose },
            slots: {
                default: ({ close }) =>
                    h(
                        'button',
                        {
                            'data-testid': 'inside-close',
                            onClick() {
                                close();
                            },
                        },
                        'Inside close',
                    ),
                reference: ({ open }) =>
                    h(
                        'button',
                        {
                            onClick() {
                                open();
                            },
                        },
                        'Open',
                    ),
            },
        });

        await user.click(screen.getByRole('button', { name: 'Open' }));
        expect(screen.getByTestId('inside-close')).toBeInTheDocument();

        await user.click(screen.getByTestId('inside-close'));
        expect(onClose).toHaveBeenCalledTimes(1);
        expect(screen.queryByTestId('inside-close')).not.toBeInTheDocument();
    });

    test('Does not focus the floating panel when preventFocus is true', async () => {
        const user = userEvent.setup();

        render(SPopover, {
            props: { preventFocus: true },
            slots: {
                default: 'Prevent focus content',
                reference: ({ open }) =>
                    h(
                        'button',
                        {
                            onClick() {
                                open();
                            },
                        },
                        'Open prevent focus',
                    ),
            },
        });

        const button = screen.getByRole('button', { name: 'Open prevent focus' });
        await user.click(button);

        await new Promise((resolve) => setTimeout(resolve, 10));
        await nextTick();

        expect(screen.getByText('Prevent focus content')).toBeInTheDocument();
        expect(document.activeElement).not.toHaveTextContent('Prevent focus content');
    });

    test('focusout closes the popover when focus moves outside', async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();

        const Wrapper = defineComponent({
            components: { SPopover },
            setup() {
                return {};
            },
            template: `
                <SPopover @close="onClose">
                    <template #reference="{ open }">
                        <button @click="open">Open</button>
                    </template>
                    <button data-testid="inner">Inner</button>
                </SPopover>
                <button data-testid="outside">Outside</button>
            `,
            methods: {
                onClose,
            },
        });

        render(Wrapper);

        await user.click(screen.getByRole('button', { name: 'Open' }));
        expect(screen.getByTestId('inner')).toBeInTheDocument();

        screen.getByTestId('outside').focus();
        await flushRaf();
        await nextTick();

        expect(onClose).toHaveBeenCalled();
    });

    test('focusout does not close the popover when preventClose is true', async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();

        const Wrapper = defineComponent({
            components: { SPopover },
            template: `
                <SPopover prevent-close @close="onClose">
                    <template #reference="{ open }">
                        <button @click="open">Open</button>
                    </template>
                    <button data-testid="inner">Inner</button>
                </SPopover>
                <button data-testid="outside">Outside</button>
            `,
            methods: {
                onClose,
            },
        });

        render(Wrapper);

        await user.click(screen.getByRole('button', { name: 'Open' }));
        expect(screen.getByTestId('inner')).toBeInTheDocument();

        screen.getByTestId('outside').focus();
        await flushRaf();
        await nextTick();

        expect(onClose).not.toHaveBeenCalled();
        expect(screen.getByTestId('inner')).toBeInTheDocument();
    });

    test('focusout does not close when focus stays inside the floating panel', async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();

        const Wrapper = defineComponent({
            components: { SPopover },
            template: `
                <SPopover @close="onClose">
                    <template #reference="{ open }">
                        <button @click="open">Open</button>
                    </template>
                    <button data-testid="inner-a">A</button>
                    <button data-testid="inner-b">B</button>
                </SPopover>
            `,
            methods: {
                onClose,
            },
        });

        render(Wrapper);

        await user.click(screen.getByRole('button', { name: 'Open' }));

        screen.getByTestId('inner-a').focus();
        await flushRaf();
        screen.getByTestId('inner-b').focus();
        await flushRaf();
        await nextTick();

        expect(onClose).not.toHaveBeenCalled();
    });

    test('Renders an arrow when the arrow prop is set', async () => {
        const user = userEvent.setup();

        const { container } = render(SPopover, {
            props: { arrow: 'auto', placement: 'top' },
            slots: {
                default: 'Arrow content',
                reference: ({ open }) =>
                    h(
                        'button',
                        {
                            onClick() {
                                open();
                            },
                        },
                        'Open arrow',
                    ),
            },
        });

        await user.click(screen.getByRole('button', { name: 'Open arrow' }));

        const arrow = container.ownerDocument.querySelector('.rounded-sm');
        expect(arrow).not.toBeNull();
        expect(arrow).toHaveClass('bg-white');
        expect(arrow).toHaveClass('dark:bg-[#101828]');
        expect((arrow as HTMLElement).style.transform).toBe('rotate(45deg)');
    });

    test.each([
        ['top', 'light', 'bg-white'],
        ['right', 'dark', 'bg-[#101828]'],
        ['bottom', 'auto', 'bg-white'],
        ['left', 'light', 'bg-white'],
    ] as const)('Renders arrow correctly for placement %s and color %s', async (placement, color, expectedClass) => {
        const user = userEvent.setup();

        const { container } = render(SPopover, {
            props: { arrow: color, placement },
            slots: {
                default: 'Arrow placement content',
                reference: ({ open }) =>
                    h(
                        'button',
                        {
                            onClick() {
                                open();
                            },
                        },
                        'Open arrow placement',
                    ),
            },
        });

        await user.click(screen.getByRole('button', { name: 'Open arrow placement' }));

        const arrow = container.ownerDocument.querySelector('.rounded-sm');
        expect(arrow).not.toBeNull();
        expect(arrow).toHaveClass(expectedClass);
    });

    test('Keeps the floating panel in DOM when useShow is true', async () => {
        render(SPopover, {
            props: { useShow: true },
            slots: {
                default: 'Persistent content',
                reference: () => h('button', {}, 'Trigger'),
            },
        });

        await nextTick();

        expect(screen.getByText('Persistent content')).toBeInTheDocument();
    });

    test('Renders backdrop when responsive and on small screens', async () => {
        const user = userEvent.setup();

        const { container } = render(SPopover, {
            props: { responsive: true },
            slots: {
                default: 'Backdrop content',
                reference: ({ open }) =>
                    h(
                        'button',
                        {
                            onClick() {
                                open();
                            },
                        },
                        'Open backdrop',
                    ),
            },
        });

        await user.click(screen.getByRole('button', { name: 'Open backdrop' }));

        const backdrop = container.ownerDocument.querySelector('.bg-black\\/30');
        expect(backdrop).not.toBeNull();
    });

    test('Does not render backdrop when responsive is false', async () => {
        const user = userEvent.setup();

        const { container } = render(SPopover, {
            props: { responsive: false },
            slots: {
                default: 'No backdrop content',
                reference: ({ open }) =>
                    h(
                        'button',
                        {
                            onClick() {
                                open();
                            },
                        },
                        'Open no backdrop',
                    ),
            },
        });

        await user.click(screen.getByRole('button', { name: 'Open no backdrop' }));

        const backdrop = container.ownerDocument.querySelector('.bg-black\\/30');
        expect(backdrop).toBeNull();
    });

    test('Accepts custom class on the root element', () => {
        const { container } = render(SPopover, {
            props: { class: 'custom-popover-class' },
            slots: {
                default: 'Class content',
                reference: () => h('button', {}, 'Trigger'),
            },
        });

        expect(container.querySelector('.custom-popover-class')).not.toBeNull();
    });

    test('Builds middleware with static and offset props without errors', async () => {
        const user = userEvent.setup();

        render(SPopover, {
            props: { static: true, offset: 12 },
            slots: {
                default: 'Static content',
                reference: ({ open }) =>
                    h(
                        'button',
                        {
                            onClick() {
                                open();
                            },
                        },
                        'Open static',
                    ),
            },
        });

        await user.click(screen.getByRole('button', { name: 'Open static' }));
        expect(screen.getByText('Static content')).toBeInTheDocument();
    });

    test('focusout does not close when the floating panel itself has focus', async () => {
        const onClose = vi.fn();
        const popoverRef: { value: { open: () => void; focus: () => void; focusout: () => void } | null } = {
            value: null,
        };

        const Wrapper = defineComponent({
            components: { SPopover },
            setup() {
                const popover = ref<InstanceType<typeof SPopover>>();
                return { popover };
            },
            mounted() {
                popoverRef.value = this.popover as never;
            },
            template: `
                <SPopover ref="popover" @close="onClose">
                    <template #reference="{ open }">
                        <button @click="open">Open</button>
                    </template>
                    <span>Floating focused content</span>
                </SPopover>
            `,
            methods: {
                onClose,
            },
        });

        render(Wrapper);

        popoverRef.value!.open();
        await nextTick();
        await new Promise((resolve) => setTimeout(resolve, 5));

        popoverRef.value!.focus();
        popoverRef.value!.focusout();

        await flushRaf();
        await nextTick();

        expect(onClose).not.toHaveBeenCalled();
    });

    test('Exposes open, close, toggle, focus and isOpen via ref', async () => {
        const user = userEvent.setup();

        const Wrapper = defineComponent({
            components: { SPopover },
            setup() {
                const popover = ref<InstanceType<typeof SPopover>>();
                const status = ref('closed');
                const updateStatus = () => {
                    status.value = popover.value?.isOpen ? 'open' : 'closed';
                };
                const openPopover = () => {
                    popover.value?.open();
                    updateStatus();
                };
                const closePopover = () => {
                    popover.value?.close();
                    updateStatus();
                };
                const togglePopover = () => {
                    popover.value?.toggle();
                    updateStatus();
                };
                const focusPopover = () => {
                    popover.value?.focus();
                };
                return { popover, status, openPopover, closePopover, togglePopover, focusPopover };
            },
            template: `
                <button data-testid="open" @click="openPopover">Open</button>
                <button data-testid="close" @click="closePopover">Close</button>
                <button data-testid="toggle" @click="togglePopover">Toggle</button>
                <button data-testid="focus" @click="focusPopover">Focus</button>
                <span data-testid="status">{{ status }}</span>
                <SPopover ref="popover" prevent-close>
                    <template #reference>
                        <span>Trigger</span>
                    </template>
                    <span data-testid="content">Exposed content</span>
                </SPopover>
            `,
        });

        render(Wrapper);

        await user.click(screen.getByTestId('open'));
        expect(screen.getByTestId('content')).toBeInTheDocument();
        expect(screen.getByTestId('status')).toHaveTextContent('open');

        await user.click(screen.getByTestId('focus'));

        await user.click(screen.getByTestId('toggle'));
        expect(screen.getByTestId('status')).toHaveTextContent('closed');

        await user.click(screen.getByTestId('toggle'));
        expect(screen.getByTestId('status')).toHaveTextContent('open');

        await user.click(screen.getByTestId('close'));
        expect(screen.getByTestId('status')).toHaveTextContent('closed');
    });
});
