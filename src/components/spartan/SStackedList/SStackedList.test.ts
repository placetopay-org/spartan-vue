import { test, describe, vi } from 'vitest';
import SStackedList from './SStackedList.vue';
import SStackedListItem from './SStackedListItem.vue';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import { h } from 'vue';

describe('SStackedList', () => {
    const setup = () => {
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation((query) => ({
                matches: true,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });
    };

    test('Can be rendered', async () => {
        const Item1 = h(SStackedListItem, null, { default: () => 'Item 1' });
        const Item2 = h(SStackedListItem, null, { default: () => 'Item 2' });
        const Item3 = h(SStackedListItem, null, { default: () => 'Item 3' });

        render(SStackedList, {
            slots: {
                default: [Item1, Item2, Item3],
            },
        });

        screen.getByRole('list');
        expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });

    test('Renders item with dropdown slot', () => {
        setup();

        const ItemWithDropdown = h(SStackedListItem, null, {
            default: () => 'Item content',
            dropdown: () => h('button', 'Edit'),
        });

        render(SStackedList, {
            slots: {
                default: [ItemWithDropdown],
            },
        });

        expect(screen.getByText('Item content')).toBeInTheDocument();
        expect(screen.getByText('Open options')).toBeInTheDocument();
    });

    test('Renders items with custom class', () => {
        const Item = h(SStackedListItem, { class: 'custom-class' }, { default: () => 'Styled item' });

        render(SStackedList, {
            slots: { default: [Item] },
        });

        expect(screen.getByText('Styled item')).toBeInTheDocument();
    });
});
