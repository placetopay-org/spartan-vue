import { expect, test, describe, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import STemplateHeaderTable from './STemplateHeaderTable.vue';

describe('STemplateHeaderTable', () => {
    test('Throw warning for required props', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        mount(STemplateHeaderTable);

        // Assert
        expect(warn).toHaveBeenCalledOnce();
    });

    test('Can be rendered with required props', () => {
        // Act
        const wrapper = mount(STemplateHeaderTable, {
            props: { title: 'Test Table Title' },
        });

        // Assert
        expect(wrapper.html()).toContain('Test Table Title');
        expect(wrapper.find('h1').text()).toBe('Test Table Title');
    });

    test('Displays the title correctly', () => {
        // Arrange
        const title = 'My Products Table';

        // Act
        const wrapper = mount(STemplateHeaderTable, {
            props: { title },
        });

        // Assert
        expect(wrapper.find('h1').text()).toBe(title);
        expect(wrapper.find('h1').classes()).toContain('text-2xl');
        expect(wrapper.find('h1').classes()).toContain('font-bold');
    });

    test('Emits search event when button is clicked', async () => {
        // Arrange
        const wrapper = mount(STemplateHeaderTable, {
            props: { title: 'Test Title' },
        });
        const input = wrapper.find('input[type="text"]');
        const button = wrapper.find('button');

        // Act
        await input.setValue('test query');
        await button.trigger('click');

        // Assert
        expect(wrapper.emitted()).toHaveProperty('search');
        expect(wrapper.emitted().search).toHaveLength(1);
        expect(wrapper.emitted().search[0]).toEqual(['test query']);
    });

    test('Emits search event when Enter key is pressed in input', async () => {
        // Arrange
        const wrapper = mount(STemplateHeaderTable, {
            props: { title: 'Test Title' },
        });
        const input = wrapper.find('input[type="text"]');

        // Act
        await input.setValue('search term');
        await input.trigger('keyup.enter');

        // Assert
        expect(wrapper.emitted()).toHaveProperty('search');
        expect(wrapper.emitted().search).toHaveLength(1);
        expect(wrapper.emitted().search[0]).toEqual(['search term']);
    });

    test('Renders table slot correctly', () => {
        // Act
        const wrapper = mount(STemplateHeaderTable, {
            props: { title: 'Test Title' },
            slots: {
                table: '<div class="test-table">Table content</div>',
            },
        });

        // Assert
        expect(wrapper.html()).toContain('<div class="test-table">Table content</div>');
    });

    test('Input has correct placeholder text', () => {
        // Act
        const wrapper = mount(STemplateHeaderTable, {
            props: { title: 'Test Title' },
        });
        const input = wrapper.find('input[type="text"]');

        // Assert
        expect(input.attributes('placeholder')).toBe('Find your product...');
    });

    test('Search button has correct icon and text', () => {
        // Act
        const wrapper = mount(STemplateHeaderTable, {
            props: { title: 'Test Title' },
        });
        const button = wrapper.find('button');

        // Assert
        expect(button.exists()).toBe(true);
        expect(button.text()).toContain('search');
    });
});
