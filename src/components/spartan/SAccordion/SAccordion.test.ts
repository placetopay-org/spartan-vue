import { expect, test, describe, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SAccordion from './SAccordion.vue';

describe('SAccordion', () => {
    test('Throw warning for required props', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        mount(SAccordion);

        // Assert
        expect(warn).toHaveBeenCalledOnce();
    });

    test('Can be rendered', () => {
        // Act
        const wrapper = mount(SAccordion, { props: { open: true } });

        // Assert
        expect(wrapper.html()).toContain('appear="true"');
        expect(wrapper.html()).toContain('name="horizontal-accordion"');
        expect(wrapper.html()).toContain('class="max-w-screen overflow-x-hidden"');
    });

    test('It is hidden with open=false', () => {
        // Act
        const wrapper = mount(SAccordion, { props: { open: false } });

        // Assert
        expect(wrapper.html()).toContain('style="display: none;"');
    });

    test('Can be rendered in vertical mode', () => {
        // Act
        const wrapper = mount(SAccordion, { props: { open: true, vertical: true } });

        // Assert
        expect(wrapper.html()).toContain('name="vertical-accordion"');
    });

    test('Can be change his visibility', async () => {
        // Act
        const wrapper = mount(SAccordion, { props: { open: true } });
        await wrapper.setProps({ open: false })

        // Assert
        expect(wrapper.html()).toContain('style="display: none;"');
    });
});
