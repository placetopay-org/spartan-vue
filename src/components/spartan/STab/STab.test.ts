import { test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import STab from './STab.vue';
import STabItem from './STabItem.vue';
import STabDropdownItem from './STabDropdownItem.vue';
import { h, defineComponent, ref } from 'vue';

describe('STab', () => {
    describe('Rendering', () => {
        test('Throw warning for required "model-value"', () => {
            const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

            render(STab);

            expect(warn).toHaveBeenCalledOnce();
            expect(warn.mock.calls[0][0]).contains('[Vue warn]: Missing required prop: "modelValue"');
        });

        test('Can be rendered with navigation role and Tabs label', () => {
            render(STab, { props: { modelValue: 'tab1' } });

            const nav = screen.getByRole('navigation', { name: 'Tabs' });
            expect(nav).toBeInTheDocument();
        });

        test('Can be rendered with items', () => {
            const items = [
                h(STabItem, { path: 'tab1' }, { default: () => 'Tab 1' }),
                h(STabItem, { path: 'tab2' }, { default: () => 'Tab 2' }),
                h(STabItem, { path: 'tab3' }, { default: () => 'Tab 3' }),
            ];

            render(STab, { props: { modelValue: 'tab1' }, slots: { default: items } });

            const buttons = screen.getAllByRole('button');
            expect(buttons).toHaveLength(3);
            expect(buttons[0]).toHaveTextContent('Tab 1');
            expect(buttons[1]).toHaveTextContent('Tab 2');
            expect(buttons[2]).toHaveTextContent('Tab 3');
        });

        test('Can apply custom class to root element', () => {
            render(STab, { props: { modelValue: 'tab1', class: 'custom-class' } });

            const nav = screen.getByRole('navigation', { name: 'Tabs' });
            expect(nav).toHaveClass('custom-class');
        });
    });

    describe('Variants', () => {
        test('Renders underline variant by default', () => {
            const items = [h(STabItem, { path: 'tab1' }, { default: () => 'Tab 1' })];
            render(STab, { props: { modelValue: 'tab1' }, slots: { default: items } });

            const nav = screen.getByRole('navigation', { name: 'Tabs' });
            expect(nav).toHaveClass('border-b');
        });

        test('Renders pills variant', () => {
            const items = [
                h(STabItem, null, { default: () => 'Item 1' }),
                h(STabItem, null, { default: () => 'Item 2' }),
            ];

            render(STab, { props: { variant: 'pills' }, slots: { default: items } });

            const buttons = screen.getAllByRole('button');
            expect(buttons[0]).toHaveClass('rounded-md');
        });

        test('Renders vetches variant with contained style', () => {
            const items = [
                h(STabItem, null, { default: () => 'Item 1' }),
                h(STabItem, null, { default: () => 'Item 2' }),
            ];

            render(STab, { props: { variant: 'vetches' }, slots: { default: items } });

            screen.getByRole('navigation', { name: 'Tabs' });
            const buttons = screen.getAllByRole('button');
            expect(buttons[0]).toHaveClass('rounded-md');
        });
    });

    describe('Active state', () => {
        test('Sets active tab based on modelValue matching path', () => {
            const items = [
                h(STabItem, { path: 'account' }, { default: () => 'Account' }),
                h(STabItem, { path: 'security' }, { default: () => 'Security' }),
            ];

            render(STab, { props: { modelValue: 'account' }, slots: { default: items } });

            const buttons = screen.getAllByRole('button');
            expect(buttons[0]).toHaveAttribute('aria-current', 'page');
            expect(buttons[1]).not.toHaveAttribute('aria-current');
        });

        test('Sets active tab via active prop override', () => {
            const items = [
                h(STabItem, { path: 'tab1', active: true }, { default: () => 'Tab 1' }),
                h(STabItem, { path: 'tab2' }, { default: () => 'Tab 2' }),
            ];

            render(STab, { props: { modelValue: 'tab2' }, slots: { default: items } });

            const buttons = screen.getAllByRole('button');
            // Both should be active: tab1 via active prop, tab2 via modelValue
            expect(buttons[0]).toHaveAttribute('aria-current', 'page');
            expect(buttons[1]).toHaveAttribute('aria-current', 'page');
        });

        test('Sets active tab via regex matching', () => {
            const items = [
                h(STabItem, { path: 'users', regex: /^users/ }, { default: () => 'Users' }),
                h(STabItem, { path: 'settings' }, { default: () => 'Settings' }),
            ];

            render(STab, { props: { modelValue: 'users/123' }, slots: { default: items } });

            const buttons = screen.getAllByRole('button');
            expect(buttons[0]).toHaveAttribute('aria-current', 'page');
            expect(buttons[1]).not.toHaveAttribute('aria-current');
        });

        test('Inactive tabs do not have aria-current', () => {
            const items = [
                h(STabItem, { path: 'tab1' }, { default: () => 'Tab 1' }),
                h(STabItem, { path: 'tab2' }, { default: () => 'Tab 2' }),
            ];

            render(STab, { props: { modelValue: 'tab1' }, slots: { default: items } });

            const buttons = screen.getAllByRole('button');
            expect(buttons[1]).not.toHaveAttribute('aria-current');
        });

        test('Applies active classes for underline variant', () => {
            const items = [
                h(STabItem, { path: 'active' }, { default: () => 'Active' }),
                h(STabItem, { path: 'inactive' }, { default: () => 'Inactive' }),
            ];

            render(STab, { props: { modelValue: 'active' }, slots: { default: items } });

            const buttons = screen.getAllByRole('button');
            expect(buttons[0]).toHaveClass('border-spartan-primary-500');
            expect(buttons[0]).toHaveClass('text-gray-900');
            expect(buttons[1]).toHaveClass('border-transparent');
            expect(buttons[1]).toHaveClass('text-gray-400');
        });

        test('Applies active classes for pills variant', () => {
            const items = [
                h(STabItem, { path: 'active' }, { default: () => 'Active' }),
                h(STabItem, { path: 'inactive' }, { default: () => 'Inactive' }),
            ];

            render(STab, { props: { modelValue: 'active', variant: 'pills' }, slots: { default: items } });

            const buttons = screen.getAllByRole('button');
            expect(buttons[0]).toHaveClass('bg-spartan-primary-100');
            expect(buttons[0]).toHaveClass('text-spartan-primary-700');
            expect(buttons[1]).toHaveClass('text-gray-500');
        });

        test('Applies active classes for vetches variant', () => {
            const items = [
                h(STabItem, { path: 'active' }, { default: () => 'Active' }),
                h(STabItem, { path: 'inactive' }, { default: () => 'Inactive' }),
            ];

            render(STab, { props: { modelValue: 'active', variant: 'vetches' }, slots: { default: items } });

            const buttons = screen.getAllByRole('button');
            expect(buttons[0]).toHaveClass('bg-white');
            expect(buttons[0]).toHaveClass('text-spartan-primary-600');
            expect(buttons[0]).toHaveClass('shadow');
            expect(buttons[1]).toHaveClass('text-gray-500');
        });

        test('Renders tabs without path prop (fallback to text content)', () => {
            const items = [
                h(STabItem, null, { default: () => 'Account' }),
                h(STabItem, null, { default: () => 'Security' }),
            ];

            render(STab, { props: { modelValue: 'none' }, slots: { default: items } });

            const buttons = screen.getAllByRole('button');
            // Without path and without matching modelValue, none should be active
            expect(buttons[0]).not.toHaveAttribute('aria-current');
            expect(buttons[1]).not.toHaveAttribute('aria-current');
        });
    });

    describe('Events', () => {
        test('Emits update:modelValue on tab click', async () => {
            const user = userEvent.setup();
            const items = [
                h(STabItem, { path: 'tab1' }, { default: () => 'Tab 1' }),
                h(STabItem, { path: 'tab2' }, { default: () => 'Tab 2' }),
            ];

            const { emitted } = render(STab, { props: { modelValue: 'tab1' }, slots: { default: items } });

            await user.click(screen.getByText('Tab 2'));

            expect(emitted()['update:modelValue']).toBeTruthy();
            expect(emitted()['update:modelValue'][0]).toEqual(['tab2']);
        });

        test('Emits correct path when clicking different tabs', async () => {
            const user = userEvent.setup();
            const items = [
                h(STabItem, { path: 'first' }, { default: () => 'First' }),
                h(STabItem, { path: 'second' }, { default: () => 'Second' }),
                h(STabItem, { path: 'third' }, { default: () => 'Third' }),
            ];

            const { emitted } = render(STab, { props: { modelValue: 'first' }, slots: { default: items } });

            await user.click(screen.getByText('Third'));

            expect(emitted()['update:modelValue'][0]).toEqual(['third']);
        });
    });

    describe('Polymorphic rendering', () => {
        test('Renders tab items as buttons by default', () => {
            const items = [h(STabItem, { path: 'tab1' }, { default: () => 'Tab 1' })];

            render(STab, { props: { modelValue: 'tab1' }, slots: { default: items } });

            const button = screen.getByRole('button');
            expect(button.tagName).toBe('BUTTON');
            expect(button).toHaveAttribute('type', 'button');
        });

        test('Renders tab items as anchor when as="a"', () => {
            const items = [h(STabItem, { path: 'tab1', as: 'a' }, { default: () => 'Tab 1' })];

            render(STab, { props: { modelValue: 'tab1' }, slots: { default: items } });

            const link = screen.getByText('Tab 1');
            expect(link.tagName).toBe('A');
            expect(link).not.toHaveAttribute('type');
        });

        test('Does not add type attribute for non-button elements', () => {
            const items = [h(STabItem, { path: 'tab1', as: 'div' }, { default: () => 'Tab 1' })];

            render(STab, { props: { modelValue: 'tab1' }, slots: { default: items } });

            const el = screen.getByText('Tab 1');
            expect(el.tagName).toBe('DIV');
            expect(el).not.toHaveAttribute('type');
        });
    });

    describe('Icons', () => {
        test('Renders icon component when icon prop is provided', () => {
            const TestIcon = defineComponent({
                setup() {
                    return () => h('svg', { 'data-testid': 'test-icon' });
                },
            });

            const items = [h(STabItem, { path: 'tab1', icon: TestIcon }, { default: () => 'Tab 1' })];

            render(STab, { props: { modelValue: 'tab1' }, slots: { default: items } });

            expect(screen.getByTestId('test-icon')).toBeInTheDocument();
        });

        test('Icon has aria-hidden attribute', () => {
            const TestIcon = defineComponent({
                setup(_, { attrs }) {
                    return () => h('svg', { ...attrs, 'data-testid': 'test-icon' });
                },
            });

            const items = [h(STabItem, { path: 'tab1', icon: TestIcon }, { default: () => 'Tab 1' })];

            render(STab, { props: { modelValue: 'tab1' }, slots: { default: items } });

            const icon = screen.getByTestId('test-icon');
            expect(icon).toHaveAttribute('aria-hidden', 'true');
        });

        test('Icon has correct size classes', () => {
            const TestIcon = defineComponent({
                setup(_, { attrs }) {
                    return () => h('svg', { ...attrs, 'data-testid': 'test-icon' });
                },
            });

            const items = [h(STabItem, { path: 'tab1', icon: TestIcon }, { default: () => 'Tab 1' })];

            render(STab, { props: { modelValue: 'tab1' }, slots: { default: items } });

            const icon = screen.getByTestId('test-icon');
            expect(icon).toHaveClass('h-5');
            expect(icon).toHaveClass('w-5');
        });

        test('Icon renders in pills variant', () => {
            const TestIcon = defineComponent({
                setup(_, { attrs }) {
                    return () => h('svg', { ...attrs, 'data-testid': 'test-icon' });
                },
            });

            const items = [h(STabItem, { path: 'tab1', icon: TestIcon }, { default: () => 'Tab 1' })];

            render(STab, { props: { modelValue: 'tab1', variant: 'pills' }, slots: { default: items } });

            expect(screen.getByTestId('test-icon')).toBeInTheDocument();
        });

        test('Icon renders in vetches variant', () => {
            const TestIcon = defineComponent({
                setup(_, { attrs }) {
                    return () => h('svg', { ...attrs, 'data-testid': 'test-icon' });
                },
            });

            const items = [h(STabItem, { path: 'tab1', icon: TestIcon }, { default: () => 'Tab 1' })];

            render(STab, { props: { modelValue: 'tab1', variant: 'vetches' }, slots: { default: items } });

            expect(screen.getByTestId('test-icon')).toBeInTheDocument();
        });
    });

    describe('Custom classes', () => {
        test('Applies custom class to STabItem', () => {
            const items = [h(STabItem, { path: 'tab1', class: 'custom-tab' }, { default: () => 'Tab 1' })];

            render(STab, { props: { modelValue: 'tab1' }, slots: { default: items } });

            const button = screen.getByRole('button');
            expect(button).toHaveClass('custom-tab');
        });
    });

    describe('Full width', () => {
        test('Tab items have full width styling', () => {
            const items = [
                h(STabItem, null, { default: () => 'Item 1' }),
                h(STabItem, null, { default: () => 'Item 2' }),
            ];

            render(STab, { props: { full: true }, slots: { default: items } });

            const buttons = screen.getAllByRole('button');
            expect(buttons[0]).toHaveClass('w-full');
            expect(buttons[1]).toHaveClass('w-full');
        });
    });

    describe('Dark mode classes', () => {
        test('Underline variant has dark mode border class', () => {
            const items = [h(STabItem, { path: 'tab1' }, { default: () => 'Tab 1' })];
            render(STab, { props: { modelValue: 'tab1' }, slots: { default: items } });

            const nav = screen.getByRole('navigation', { name: 'Tabs' });
            expect(nav).toHaveClass('dark:border-gray-700');
        });

        test('Underline active tab has dark text class', () => {
            const items = [
                h(STabItem, { path: 'active' }, { default: () => 'Active' }),
                h(STabItem, { path: 'inactive' }, { default: () => 'Inactive' }),
            ];

            render(STab, { props: { modelValue: 'active' }, slots: { default: items } });

            const buttons = screen.getAllByRole('button');
            expect(buttons[0]).toHaveClass('dark:text-white');
            expect(buttons[1]).toHaveClass('dark:text-gray-400');
        });

        test('Pills active tab has dark mode classes', () => {
            const items = [
                h(STabItem, { path: 'active' }, { default: () => 'Active' }),
                h(STabItem, { path: 'inactive' }, { default: () => 'Inactive' }),
            ];

            render(STab, { props: { modelValue: 'active', variant: 'pills' }, slots: { default: items } });

            const buttons = screen.getAllByRole('button');
            expect(buttons[0]).toHaveClass('dark:bg-spartan-primary-400/10');
            expect(buttons[0]).toHaveClass('dark:text-spartan-primary-400');
            expect(buttons[1]).toHaveClass('dark:text-gray-400');
        });

        test('Vetches container has dark mode classes', () => {
            const items = [h(STabItem, { path: 'tab1' }, { default: () => 'Tab 1' })];
            render(STab, { props: { modelValue: 'tab1', variant: 'vetches' }, slots: { default: items } });

            const nav = screen.getByRole('navigation', { name: 'Tabs' });
            const ul = nav.querySelector('ul');
            expect(ul).toHaveClass('dark:bg-gray-800');
            expect(ul).toHaveClass('dark:border-white/10');
        });

        test('Vetches active tab has dark mode classes', () => {
            const items = [
                h(STabItem, { path: 'active' }, { default: () => 'Active' }),
                h(STabItem, { path: 'inactive' }, { default: () => 'Inactive' }),
            ];

            render(STab, { props: { modelValue: 'active', variant: 'vetches' }, slots: { default: items } });

            const buttons = screen.getAllByRole('button');
            expect(buttons[0]).toHaveClass('dark:text-spartan-primary-400');
            expect(buttons[0]).toHaveClass('dark:bg-gray-900');
            expect(buttons[1]).toHaveClass('dark:text-gray-400');
        });
    });

    describe('Dropdown', () => {
        test('Renders dropdown tab with chevron icon', () => {
            const items = [
                h(
                    STabItem,
                    { path: 'more', dropdown: true },
                    {
                        default: () => 'More',
                        items: () => [h(STabDropdownItem, { path: 'sub1' }, { default: () => 'Sub 1' })],
                    },
                ),
            ];

            render(STab, { props: { modelValue: 'sub1' }, slots: { default: items } });

            expect(screen.getByText('More')).toBeInTheDocument();
        });

        test('Emits update:modelValue when clicking a dropdown item', async () => {
            const user = userEvent.setup();
            const items = [
                h(
                    STabItem,
                    { path: 'more', dropdown: true },
                    {
                        default: () => 'More',
                        items: () => [
                            h(STabDropdownItem, { path: 'sub1' }, { default: () => 'Sub 1' }),
                            h(STabDropdownItem, { path: 'sub2' }, { default: () => 'Sub 2' }),
                        ],
                    },
                ),
            ];

            const { emitted } = render(STab, { props: { modelValue: 'more' }, slots: { default: items } });

            await user.click(screen.getByText('More'));
            await user.click(screen.getByText('Sub 2'));

            expect(emitted()['update:modelValue']).toBeTruthy();
            expect(emitted()['update:modelValue'][0]).toEqual(['sub2']);
        });

        test('Renders dropdown item with custom "as" prop and emits on click', async () => {
            const user = userEvent.setup();
            const items = [
                h(
                    STabItem,
                    { path: 'more', dropdown: true },
                    {
                        default: () => 'More',
                        items: () => [h(STabDropdownItem, { path: 'link', as: 'a' }, { default: () => 'Link Item' })],
                    },
                ),
            ];

            const { emitted } = render(STab, { props: { modelValue: 'more' }, slots: { default: items } });

            await user.click(screen.getByText('More'));

            const link = screen.getByText('Link Item');
            expect(link.tagName).toBe('A');
            expect(link).toHaveAttribute('data-item-path', 'link');
            expect(link).not.toHaveAttribute('type');

            await link.click();

            expect(emitted()['update:modelValue']).toBeTruthy();
            expect(emitted()['update:modelValue'][0]).toEqual(['link']);
        });

        test('Sets type="button" when dropdown item uses as="button"', async () => {
            const user = userEvent.setup();
            const items = [
                h(
                    STabItem,
                    { path: 'more', dropdown: true },
                    {
                        default: () => 'More',
                        items: () => [
                            h(STabDropdownItem, { path: 'btn', as: 'button' }, { default: () => 'Btn Item' }),
                        ],
                    },
                ),
            ];

            render(STab, { props: { modelValue: 'more' }, slots: { default: items } });

            await user.click(screen.getByText('More'));

            const btn = screen.getByText('Btn Item');
            expect(btn.tagName).toBe('BUTTON');
            expect(btn).toHaveAttribute('type', 'button');
            expect(btn).toHaveAttribute('data-item-path', 'btn');
        });

        test('Falls back to innerText as path when no path prop is provided', async () => {
            // jsdom does not implement innerText; polyfill it for this test
            Object.defineProperty(HTMLElement.prototype, 'innerText', {
                configurable: true,
                get() {
                    return this.textContent;
                },
            });

            try {
                const user = userEvent.setup();
                const items = [
                    h(
                        STabItem,
                        { path: 'more', dropdown: true },
                        {
                            default: () => 'More',
                            items: () => [h(STabDropdownItem, null, { default: () => 'Inferred' })],
                        },
                    ),
                ];

                const { emitted } = render(STab, { props: { modelValue: 'more' }, slots: { default: items } });

                await user.click(screen.getByText('More'));
                await user.click(screen.getByText('Inferred'));

                expect(emitted()['update:modelValue']).toBeTruthy();
                expect(emitted()['update:modelValue'][0]).toEqual(['Inferred']);
            } finally {
                delete (HTMLElement.prototype as { innerText?: unknown }).innerText;
            }
        });

        test('Renders dropdown item without path or content (early-returns from addDropdown)', () => {
            const items = [
                h(
                    STabItem,
                    { path: 'more', dropdown: true },
                    {
                        default: () => 'More',
                        items: () => [h(STabDropdownItem)],
                    },
                ),
            ];

            // Should mount without errors even when the dropdown item has no path,
            // exercising the early-return branch of api.ts addDropdown.
            const { container } = render(STab, { props: { modelValue: 'more' }, slots: { default: items } });
            expect(container).toBeTruthy();
        });

        test('Skips addDropdown when the parent dropdown ref starts empty', () => {
            // Parent without `path` provides an empty `dropdown` ref to the child,
            // exercising the watcher's else-branch where `value` is falsy.
            const items = [
                h(
                    STabItem,
                    { dropdown: true },
                    {
                        default: () => 'Parent',
                        items: () => [h(STabDropdownItem, { path: 'child' }, { default: () => 'Child' })],
                    },
                ),
            ];

            const { container } = render(STab, { props: { modelValue: 'child' }, slots: { default: items } });
            expect(container).toBeTruthy();
        });
    });

    describe('Reactive model updates', () => {
        test('Updates active tab when modelValue changes', async () => {
            const Wrapper = defineComponent({
                setup() {
                    const activeTab = ref('tab1');
                    return { activeTab };
                },
                template: `
                    <STab v-model="activeTab">
                        <STabItem path="tab1">Tab 1</STabItem>
                        <STabItem path="tab2">Tab 2</STabItem>
                    </STab>
                    <button data-testid="switch" @click="activeTab = 'tab2'">Switch</button>
                `,
                components: { STab, STabItem },
            });

            const user = userEvent.setup();
            render(Wrapper);

            const buttons = screen.getAllByRole('button');
            expect(buttons[0]).toHaveAttribute('aria-current', 'page');
            expect(buttons[1]).not.toHaveAttribute('aria-current');

            await user.click(screen.getByTestId('switch'));

            expect(buttons[0]).not.toHaveAttribute('aria-current');
            expect(buttons[1]).toHaveAttribute('aria-current', 'page');
        });
    });

    describe('Accessibility', () => {
        test('Navigation has correct aria-label', () => {
            render(STab, { props: { modelValue: 'tab1' } });

            expect(screen.getByRole('navigation', { name: 'Tabs' })).toBeInTheDocument();
        });

        test('Active tab has aria-current=page', () => {
            const items = [h(STabItem, { path: 'tab1' }, { default: () => 'Tab 1' })];

            render(STab, { props: { modelValue: 'tab1' }, slots: { default: items } });

            expect(screen.getByRole('button')).toHaveAttribute('aria-current', 'page');
        });

        test('Items are rendered inside a list', () => {
            const items = [
                h(STabItem, { path: 'tab1' }, { default: () => 'Tab 1' }),
                h(STabItem, { path: 'tab2' }, { default: () => 'Tab 2' }),
            ];

            render(STab, { props: { modelValue: 'tab1' }, slots: { default: items } });

            const listItems = screen.getAllByRole('listitem');
            expect(listItems).toHaveLength(2);
        });

        test('Buttons have correct type attribute', () => {
            const items = [h(STabItem, { path: 'tab1' }, { default: () => 'Tab 1' })];

            render(STab, { props: { modelValue: 'tab1' }, slots: { default: items } });

            expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
        });
    });
});
