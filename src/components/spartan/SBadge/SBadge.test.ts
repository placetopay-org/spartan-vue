import { expect, test, describe, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SBadge from './SBadge.vue';

describe('SBadge', () => {
    test('No throw warning for required props', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        mount(SBadge);

        // Assert
        expect(warn).not.toHaveBeenCalled();
    });

    test('Can be rendered', () => {
        // Act
        const wrapper = mount(SBadge, {
            slots: {
                default: 'Test Content',
            },
        });

        // Assert
        expect(wrapper.text()).toContain('Test Content');
    });

    test('Can be rendered as pill', () => {
        // Act
        const wrapper = mount(SBadge, {
            props: { pill: true },
            slots: {
                default: 'Test Content',
            },
        });

        // Assert
        expect(wrapper.html()).toContain('rounded-xl');
    });

    test('Can be rendered with border', () => {
        // Act
        const wrapper = mount(SBadge, {
            props: { border: true },
            slots: {
                default: 'Test Content',
            },
        });

        // Assert
        expect(wrapper.html()).toContain('border border-gray-300');
    });

    test('Can be rendered in outline mode', () => {
        // Act
        const wrapper = mount(SBadge, {
            props: { outline: true },
            slots: {
                default: 'Test Content',
            },
        });

        // Assert
        expect(wrapper.html()).toContain('outline outline-1 -outline-offset-1 outline-gray-800');
    });

    test('Can be rendered in removable mode', async () => {
        // Act
        const wrapper = mount(SBadge, {
            props: { removable: true },
            slots: {
                default: 'Test Content',
            },
        });

        await wrapper.find('button').trigger('click');

        // Assert
        expect(wrapper.html()).toContain('<span class="sr-only">Remove</span>');
        expect(wrapper.emitted()).toHaveProperty('removed');
    });
});
