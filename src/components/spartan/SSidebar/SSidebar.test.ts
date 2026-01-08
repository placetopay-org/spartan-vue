import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SSidebar from './SSidebar.vue';
import SSidebarItem from './SSidebarItem.vue';
import SSidebarItemGroup from './SSidebarItemGroup.vue';
import userEvent from '@testing-library/user-event';
import { h } from 'vue';

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
});
