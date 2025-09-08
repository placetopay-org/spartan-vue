import { expect, test, describe, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import STableWithSearch from './STableWithSearch.vue';

describe('SLInk', () => {
    test('Throw warning for required props', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        mount(STableWithSearch);

        // Assert
        expect(warn).toHaveBeenCalledOnce();
    });

    test('Can be rendered', () => {
        // Act
        const wrapper = mount(STableWithSearch, {
            props: { href: 'https://www.test-url.com' },
        });

        // Assert
        expect(wrapper.html()).toContain('href="https://www.test-url.com"');
        expect(wrapper.html()).toContain('class="cursor-pointer font-medium hover:text-gray-700 hover:underline"');
    });

    test('Renders optional properties', () => {
        // Arrange
        const baseProps = { href: 'https://www.test-url.com' };

        // Act
        const noTarget = mount(STableWithSearch, { props: baseProps });
        const withTarget = mount(STableWithSearch, { props: { ...baseProps, target: '_blank' } });

        // Assert
        expect(noTarget.html()).not.toContain('target="_blank"');
        expect(withTarget.html()).toContain('target="_blank"');
    });
});
