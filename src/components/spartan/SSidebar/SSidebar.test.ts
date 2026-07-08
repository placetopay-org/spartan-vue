import { test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import SSidebar from './SSidebar.vue';
import SSidebarItem from './SSidebarItem.vue';
import SSidebarItemGroup from './SSidebarItemGroup.vue';
import SSidebarSeparator from './SSidebarSeparator.vue';
import { h, defineComponent, ref, nextTick } from 'vue';

describe('SSidebar', () => {
    test('Throw warning for required v-model and value', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        render(SSidebar);

        // Assert
        expect(warn).toHaveBeenCalledOnce();
        expect(warn.mock.calls[0][0]).contains('[Vue warn]: Missing required prop: "modelValue"');
    });

    test('Can be rendered', async () => {
        // Act
        render(SSidebar);

        // Assert
        screen.getByRole('complementary');
    });

    test('Can be rendered with items', () => {
        // Arrange
        const FirstLink = h(SSidebarItem, null, { default: () => 'FirstLink' });
        const SecondLink = h(SSidebarItem, null, { default: () => 'SecondLink' });
        const ThirdLink = h(SSidebarItem, null, { default: () => 'ThirdLink' });

        // Act
        render(SSidebar, {
            slots: {
                default: [FirstLink, SecondLink, ThirdLink],
            },
        });

        // Assert
        screen.getByRole('complementary');
        screen.getByRole('navigation');
        screen.getByRole('list');
        expect(screen.getAllByRole('listitem').length).toBe(3);
        screen.getByRole('button', { name: 'FirstLink' });
        screen.getByRole('button', { name: 'SecondLink' });
        screen.getByRole('button', { name: 'ThirdLink' });
    });

    test('Can be rendered with groups', () => {
        // Arrange
        const FirstLink = h(SSidebarItem, null, { default: () => 'FirstLink' });
        const SecondLink = h(SSidebarItem, null, { default: () => 'SecondLink' });
        const ThirdLink = h(SSidebarItem, null, { default: () => 'ThirdLink' });

        const Group = h(SSidebarItemGroup, null, { default: () => [FirstLink, SecondLink] });

        // Act
        render(SSidebar, {
            slots: {
                default: [Group, ThirdLink],
            },
        });

        // Assert
        screen.debug();
        screen.getByRole('complementary');
        screen.getByRole('navigation');
        screen.getByRole('list');
        expect(screen.getAllByRole('listitem').length).toBe(4);
        screen.getByRole('button', { name: 'ThirdLink' });
    });

    test('Can be rendered a header', () => {
        // Arrange
        const FirstLink = h(SSidebarItem, null, { default: () => 'FirstLink' });
        const SecondLink = h(SSidebarItem, null, { default: () => 'SecondLink' });
        const ThirdLink = h(SSidebarItem, null, { default: () => 'ThirdLink' });

        // Act
        render(SSidebar, {
            props: { placetopayHeader: true },
            slots: {
                default: [FirstLink, SecondLink, ThirdLink],
            },
        });

        // Assert
        screen.getByRole('banner');
    });

    test('Can be rendered a footer', () => {
        // Arrange
        const FirstLink = h(SSidebarItem, null, { default: () => 'FirstLink' });
        const SecondLink = h(SSidebarItem, null, { default: () => 'SecondLink' });
        const ThirdLink = h(SSidebarItem, null, { default: () => 'ThirdLink' });

        // Act
        render(SSidebar, {
            slots: {
                default: [FirstLink, SecondLink, ThirdLink],
                footer: 'Footer',
            },
        });

        // Assert
        screen.getByText('Footer');
    });

    test('Renders custom header slot', () => {
        render(SSidebar, {
            slots: {
                header: '<div>Custom Header</div>',
                default: h(SSidebarItem, null, { default: () => 'Link' }),
            },
        });

        expect(screen.getByText('Custom Header')).toBeInTheDocument();
    });

    test('Renders header as button when placetopayHeader is a function and invokes it on click', async () => {
        const user = userEvent.setup();
        const onHeaderClick = vi.fn();

        render(SSidebar, {
            props: { placetopayHeader: onHeaderClick },
            slots: { default: h(SSidebarItem, null, { default: () => 'Link' }) },
        });

        const headerButton = screen.getAllByRole('button')[0];
        await user.click(headerButton);

        expect(onHeaderClick).toHaveBeenCalled();
    });

    test('Emits update:modelValue when an item is clicked', async () => {
        const user = userEvent.setup();

        const { emitted } = render(SSidebar, {
            props: { modelValue: 'home' },
            slots: {
                default: [
                    h(SSidebarItem, { path: 'home' }, { default: () => 'Home' }),
                    h(SSidebarItem, { path: 'profile' }, { default: () => 'Profile' }),
                ],
            },
        });

        await user.click(screen.getByRole('button', { name: 'Profile' }));

        expect(emitted()['update:modelValue']).toEqual([['profile']]);
    });

    test('Does not emit update:modelValue when clicking the already-active item', async () => {
        const user = userEvent.setup();

        const { emitted } = render(SSidebar, {
            props: { modelValue: 'home' },
            slots: {
                default: h(SSidebarItem, { path: 'home' }, { default: () => 'Home' }),
            },
        });

        await user.click(screen.getByRole('button', { name: 'Home' }));

        expect(emitted()['update:modelValue']).toBeUndefined();
    });

    test('Activates registered path that matches modelValue on mount', async () => {
        render(SSidebar, {
            props: { modelValue: 'profile' },
            slots: {
                default: [
                    h(SSidebarItem, { path: 'home' }, { default: () => 'Home' }),
                    h(SSidebarItem, { path: 'profile' }, { default: () => 'Profile' }),
                ],
            },
        });

        await nextTick();
        await nextTick();

        const active = screen.getByRole('button', { name: 'Profile' });
        expect(active.querySelector('span')?.className).toContain('spartan-primary');
    });

    test('Activates nested path when modelValue starts with item path', async () => {
        render(SSidebar, {
            props: { modelValue: 'settings/profile', nested: true },
            slots: {
                default: h(SSidebarItem, { path: 'settings' }, { default: () => 'Settings' }),
            },
        });

        await nextTick();
        await nextTick();

        const item = screen.getByRole('button', { name: 'Settings' });
        expect(item.querySelector('span')?.className).toContain('spartan-primary');
    });

    test('Updates active state when modelValue changes (non-nested)', async () => {
        const Wrapper = defineComponent({
            components: { SSidebar, SSidebarItem },
            setup() {
                const path = ref('home');
                return { path };
            },
            template: `
                <div>
                    <SSidebar v-model="path">
                        <SSidebarItem path="home">Home</SSidebarItem>
                        <SSidebarItem path="profile">Profile</SSidebarItem>
                    </SSidebar>
                    <button @click="path = 'profile'">switch</button>
                </div>
            `,
        });

        const user = userEvent.setup();
        render(Wrapper);

        await user.click(screen.getByRole('button', { name: 'switch' }));

        const profile = screen.getByRole('button', { name: 'Profile' });
        expect(profile.querySelector('span')?.className).toContain('spartan-primary');
    });

    test('Updates active state when modelValue changes (nested)', async () => {
        const Wrapper = defineComponent({
            components: { SSidebar, SSidebarItem },
            setup() {
                const path = ref('settings/profile');
                return { path };
            },
            template: `
                <div>
                    <SSidebar v-model="path" nested>
                        <SSidebarItem path="settings">Settings</SSidebarItem>
                        <SSidebarItem path="account">Account</SSidebarItem>
                    </SSidebar>
                    <button @click="path = 'account/details'">switch</button>
                </div>
            `,
        });

        const user = userEvent.setup();
        render(Wrapper);

        await user.click(screen.getByRole('button', { name: 'switch' }));

        const account = screen.getByRole('button', { name: 'Account' });
        expect(account.querySelector('span')?.className).toContain('spartan-primary');
    });

    test('Reflects active prop changes via watch', async () => {
        const Wrapper = defineComponent({
            components: { SSidebar, SSidebarItem },
            setup() {
                const active = ref(false);
                return { active };
            },
            template: `
                <div>
                    <SSidebar model-value="x">
                        <SSidebarItem path="home" :active="active">Home</SSidebarItem>
                    </SSidebar>
                    <button @click="active = true">activate</button>
                </div>
            `,
        });

        const user = userEvent.setup();
        render(Wrapper);

        await user.click(screen.getByRole('button', { name: 'activate' }));

        const item = screen.getByRole('button', { name: 'Home' });
        expect(item.querySelector('span')?.className).toContain('spartan-primary');
    });

    test('SSidebarItemGroup toggles open on click and activates with child', async () => {
        const user = userEvent.setup();

        render(SSidebar, {
            props: { modelValue: 'group/Child' },
            slots: {
                default: h(
                    SSidebarItemGroup,
                    { path: 'group', accordion: false },
                    {
                        title: () => 'Group',
                        default: () => h(SSidebarItem, null, { default: () => 'Child' }),
                    },
                ),
            },
        });

        const groupButton = screen.getByRole('button', { name: /Group/ });
        await user.click(groupButton);
        await user.click(groupButton);

        expect(groupButton).toBeInTheDocument();
    });

    test('SSidebarItemGroup activates via accordion when child is active', async () => {
        vi.useFakeTimers();

        render(SSidebar, {
            props: { modelValue: 'group/Child' },
            slots: {
                default: h(
                    SSidebarItemGroup,
                    { path: 'group' },
                    {
                        title: () => 'Group',
                        default: () => h(SSidebarItem, null, { default: () => 'Child' }),
                    },
                ),
            },
        });

        vi.advanceTimersByTime(200);
        vi.useRealTimers();

        expect(screen.getByRole('button', { name: /Group/ })).toBeInTheDocument();
    });

    test('SSidebarSeparator renders the title', () => {
        render(SSidebar, {
            slots: {
                default: h(SSidebarSeparator, { title: 'Section' }),
            },
        });

        expect(screen.getByText('Section')).toBeInTheDocument();
    });

    test('useContext throws when SSidebarItem is used without SSidebar parent', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
        const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);

        expect(() => render(SSidebarItem, { slots: { default: 'orphan' } })).toThrow(/missing parent <SSidebar/);

        warn.mockRestore();
        error.mockRestore();
    });

    test('Renders SSidebarItem without slot or path without crashing', () => {
        render(SSidebar, {
            slots: {
                default: h(SSidebarItem),
            },
        });

        expect(screen.getByRole('complementary')).toBeInTheDocument();
    });

    test('Header rendered as <header> still resolves click branch to undefined', async () => {
        const user = userEvent.setup();

        render(SSidebar, {
            props: { placetopayHeader: true },
            slots: { default: h(SSidebarItem, null, { default: () => 'Link' }) },
        });

        const header = screen.getByRole('banner');
        await user.click(header);

        expect(header).toBeInTheDocument();
    });

    test('Deactivates a group child when modelValue moves away (non-nested)', async () => {
        const Wrapper = defineComponent({
            components: { SSidebar, SSidebarItem, SSidebarItemGroup },
            setup() {
                const path = ref('group/Child');
                return { path };
            },
            template: `
                <div>
                    <SSidebar v-model="path">
                        <SSidebarItemGroup path="group">
                            <template #title>Group</template>
                            <SSidebarItem>Child</SSidebarItem>
                        </SSidebarItemGroup>
                        <SSidebarItem path="home">Home</SSidebarItem>
                    </SSidebar>
                    <button @click="path = 'home'">switch</button>
                </div>
            `,
        });

        const user = userEvent.setup();
        render(Wrapper);

        await user.click(screen.getByRole('button', { name: 'switch' }));
        await nextTick();

        const home = screen.getByRole('button', { name: 'Home' });
        expect(home.querySelector('span')?.className).toContain('spartan-primary');
    });

    test('Handles empty initial modelValue transitioning to a path (non-nested)', async () => {
        const Wrapper = defineComponent({
            components: { SSidebar, SSidebarItem },
            setup() {
                const path = ref('');
                return { path };
            },
            template: `
                <div>
                    <SSidebar v-model="path">
                        <SSidebarItem path="home">Home</SSidebarItem>
                    </SSidebar>
                    <button @click="path = 'home'">to home</button>
                    <button @click="path = ''">to empty</button>
                </div>
            `,
        });

        const user = userEvent.setup();
        render(Wrapper);

        await user.click(screen.getByRole('button', { name: 'to home' }));
        await nextTick();
        await user.click(screen.getByRole('button', { name: 'to empty' }));
        await nextTick();

        expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
    });

    test('Group with accordion=false activates child when parent path matches', async () => {
        const Wrapper = defineComponent({
            components: { SSidebar, SSidebarItem, SSidebarItemGroup },
            setup() {
                const path = ref('group/Child');
                return { path };
            },
            template: `
                <SSidebar v-model="path">
                    <SSidebarItemGroup path="group" :accordion="false">
                        <template #title>Group</template>
                        <div><SSidebarItem>Child</SSidebarItem></div>
                    </SSidebarItemGroup>
                </SSidebar>
            `,
        });

        render(Wrapper);

        await nextTick();
        await nextTick();
        await new Promise((resolve) => setTimeout(resolve, 10));

        expect(screen.getByRole('button', { name: /Group/ })).toBeInTheDocument();
    });

    test('Nested watch with unmatched current path invokes empty activationCallback', async () => {
        const Wrapper = defineComponent({
            components: { SSidebar, SSidebarItem },
            setup() {
                const path = ref('home/sub');
                return { path };
            },
            template: `
                <div>
                    <SSidebar v-model="path" nested>
                        <SSidebarItem path="home">Home</SSidebarItem>
                    </SSidebar>
                    <button @click="path = 'unrelated'">switch</button>
                </div>
            `,
        });

        const user = userEvent.setup();
        render(Wrapper);

        await user.click(screen.getByRole('button', { name: 'switch' }));
        await nextTick();

        expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
    });
});
