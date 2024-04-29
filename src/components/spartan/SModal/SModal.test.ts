import { test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SModal from './SModal.vue';
import { h } from 'vue';

describe('SModal', () => {
    test('Can be rendered', () => {
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));
        // Act
        render(SModal, { props: { open: true, onClose: () => {} }, slots: { default: h('div', 'Hello') } }); 

        // Assert
        screen.debug();
    });
});
