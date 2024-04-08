import { expect, test, describe, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SBreadcrumbs from './SBreadcrumbs.vue';

describe('SBreadcrumbs', () => {
    test('No throw warning for required props', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        mount(SBreadcrumbs);

        // Assert
        expect(warn).not.toHaveBeenCalled();
    });

    test('Can be rendered', () => {
        // Act
        const wrapper = mount(SBreadcrumbs);

        // Assert
        expect(wrapper.text()).toContain('Test Content');
    });
});
