import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SFilter from './SFilter.vue';
import userEvent from '@testing-library/user-event';

describe('SFilter', () => {
    test('Can be rendered', async () => {
        // Act
        render(SFilter, {
            props: {
                fields: [],
            }
        });

        // Assert
        screen.getByRole('button', { name: '$spartan.filter.applyBtn' });
        screen.getByRole('button', { name: '$spartan.filter.clearBtn' });
    });

    test('Can be rendered a field', async () => {
        // Act
        render(SFilter, {
            props: {
                immediateApply: true,
                fields: [{
                    id: 'brand',
                    name: 'Brand',
                    interfaces: {
                        options: {
                            multiple: true,
                            operators: ['equal', 'notEqual', 'contains'],
                            options: [{id: '1', label: 'Nike'}, 'Adidas', 'Puma', 'Reebok', 'Under Armour'],
                            customOperators: [{ id: 'custom', label: 'customOper' }],
                        },
                    },
                    state: {
                        operator: 'equal',
                        value: ['Adidas'],
                    },
                }]
            }
        });

        // Assert
        screen.getByText('Brand |');
        screen.getByText('Adidas');
        screen.getByRole('button', { name: 'Remove' });
    });

    test('Can be update a field', async () => {
        // Arrange
        const fields = [];
        const user = userEvent.setup();

        // Act
        render(SFilter, {
            props: {
                onApply: (fields: any) => console.log(fields),
                fields: [{
                    id: 'brand',
                    name: 'Brand',
                    interfaces: {
                        options: {
                            multiple: true,
                            operators: ['equal', 'notEqual', 'contains'],
                            options: [{id: '1', label: 'Nike'}, 'Adidas', 'Puma', 'Reebok', 'Under Armour'],
                            customOperators: [{ id: 'custom', label: 'customOper' }],
                        },
                    },
                    state: {
                        operator: 'equal',
                        value: ['Adidas'],
                    },
                }]
            }
        });

        const filterBadge = screen.getByRole('button', { name: 'Brand | Adidas Remove' });

        await user.click(filterBadge);

        await user.click(screen.getByLabelText('Puma'));

        await user.click(screen.getByRole('button', { name: '$spartan.filter.addBtn' }));

        await user.click(screen.getByRole('button', { name: '$spartan.filter.applyBtn' }));
        

        // Assert
        screen.debug();
        screen.getByText('Adidas,Puma');
    });
});
