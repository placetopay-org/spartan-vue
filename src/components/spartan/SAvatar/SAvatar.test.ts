import { expect, test, describe, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SAvatar from './SAvatar.vue';

describe('SAvatar', () => {
    test('No throw warning for required props', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        mount(SAvatar);

        // Assert
        expect(warn).not.toHaveBeenCalled();
    });

    test('Can be rendered', () => {
        // Act
        const wrapper = mount(SAvatar);

        // Assert
        expect(wrapper.text()).toContain('?');
    });

    test('Shows "?" if name is ""', () => {
        // Act
        const wrapper = mount(SAvatar, { props: { name: '' } });

        // Assert
        expect(wrapper.text()).toContain('?');
    });

    describe('Shows the name alias well', () => {
        test.each([
            ['Jhon Doe', 'JD'],
            ['Mary-Smith', 'MS'],
            ['sarah.adams', 'SA'],
            ['bob', 'B'],
        ])('%s showed as %s', (name, expected) => {
            // Act
            const wrapper = mount(SAvatar, { props: { name } });

            // Assert
            expect(wrapper.text()).toEqual(expected);
        });
    });

    test('Can be rendered borderless', () => {
        // Act
        const wrapper = mount(SAvatar, { props: { borderless: true } });

        // Assert
        expect(wrapper.html()).not.toContain('outline outline-1 outline-gray-800/20 -outline-offset-1');
    });

    test('It can display an image', () => {
        // Act
        const wrapper = mount(SAvatar, {
            props: {
                name: '',
                src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256',
            },
        });

        // Assert
        expect(wrapper.html()).toContain('?');
        expect(wrapper.html()).toContain('<img');
        expect(wrapper.html()).toContain('src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256"');
    });
});
