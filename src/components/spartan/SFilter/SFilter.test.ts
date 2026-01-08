import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SFilter from './SFilter.vue';
import userEvent from '@testing-library/user-event';
import type { TOperator } from './types';
import type { Ref } from 'vue';

describe('SFilter', () => {
    test('Can be rendered', async () => {
        // Act
        render(SFilter, {
            props: {
                fields: [],
            },
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
                fields: [
                    {
                        id: 'brand',
                        name: 'Brand',
                        interfaces: {
                            options: {
                                multiple: true,
                                operators: ['equal', 'notEqual', 'contains'],
                                options: [{ id: '1', label: 'Nike' }, 'Adidas', 'Puma', 'Reebok', 'Under Armour'],
                                customOperators: [{ id: 'custom', label: 'customOper' }],
                            },
                        },
                        state: {
                            operator: 'equal',
                            value: ['Adidas'],
                        },
                    },
                ],
            },
        });

        // Assert
        screen.getByText('Brand |');
        screen.getByText('$spartan.filter.operator.equal Adidas');
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
                fields: [
                    {
                        id: 'brand',
                        name: 'Brand',
                        interfaces: {
                            options: {
                                multiple: true,
                                operators: ['equal', 'notEqual', 'contains'],
                                options: [{ id: '1', label: 'Nike' }, 'Adidas', 'Puma', 'Reebok', 'Under Armour'],
                                customOperators: [{ id: 'custom', label: 'customOper' }],
                            },
                        },
                        state: {
                            operator: 'equal',
                            value: ['Adidas'],
                        },
                    },
                ],
            },
        });

        const filterBadge = screen.getByRole('button', {
            name: 'Brand | $spartan.filter.operator.equal Adidas Remove',
        });

        await user.click(filterBadge);

        await user.click(screen.getByLabelText('Puma'));

        await user.click(screen.getByRole('button', { name: '$spartan.filter.addBtn' }));

        await user.click(screen.getByRole('button', { name: '$spartan.filter.applyBtn' }));

        // Assert
        screen.getByText('$spartan.filter.operator.equal Adidas, Puma');
    });

    test('Can be update a field with one input interfaces', async () => {
        // Arrange
        const fields = [];
        const user = userEvent.setup();

        // Act
        render(SFilter, {
            props: {
                onApply: (fields: any) => console.log(fields),
                fields: [
                    {
                        id: 'price',
                        name: 'Price',
                        interfaces: {
                            oneInput: {
                                type: 'amount',
                                currency: 'EUR',
                                currencies: ['USD', 'EUR', 'GBP'],
                                operators: ['equal', 'notEqual'],
                            },
                        },
                        state: {
                            operator: 'equal',
                            value: '100',
                        },
                    },
                ],
            },
        });

        const filterBadge = screen.getByRole('button', { name: 'Price | $spartan.filter.operator.equal 100 Remove' });

        await user.click(filterBadge);

        const input = screen.getByPlaceholderText('$spartan.filter.inputSelectorPlaceholder');

        await user.clear(input);
        await user.type(input, '200');

        await user.click(screen.getByRole('button', { name: '$spartan.filter.addBtn' }));

        await user.click(screen.getByRole('button', { name: '$spartan.filter.applyBtn' }));

        // Assert
        screen.getByRole('button', { name: 'Price | $spartan.filter.operator.equal 200 Remove' });
    });

    test('Can be update a field with two input interfaces', async () => {
        // Arrange
        const fields = [];
        const user = userEvent.setup();

        // Act
        render(SFilter, {
            props: {
                onApply: (fields: any) => console.log(fields),
                fields: [
                    {
                        id: 'price',
                        name: 'Price',
                        interfaces: {
                            twoInputs: {
                                type: 'amount',
                                currency: 'USD',
                                operators: ['between', 'notBetween'],
                            },
                        },
                        state: {
                            operator: 'between',
                            value: ['100', '200'],
                        },
                    },
                ],
            },
        });

        const filterBadge = screen.getByRole('button', {
            name: 'Price | $spartan.filter.operator.between 100, 200 Remove',
        });

        await user.click(filterBadge);

        const inputs = screen.getAllByPlaceholderText('$spartan.filter.inputSelectorPlaceholder');

        await user.clear(inputs[0]);
        await user.type(inputs[0], '300');

        await user.clear(inputs[1]);
        await user.type(inputs[1], '600');

        await user.click(screen.getByRole('button', { name: '$spartan.filter.addBtn' }));

        await user.click(screen.getByRole('button', { name: '$spartan.filter.applyBtn' }));

        // Assert
        screen.getByRole('button', { name: 'Price | $spartan.filter.operator.between 300, 600 Remove' });
    });

    test('Cannot add field due to failed validation', async () => {
        const user = userEvent.setup();
        render(SFilter, {
            props: {
                fields: [
                    {
                        id: 'bin',
                        name: 'Card bin',
                        interfaces: {
                            oneInput: {
                                operators: ['equal'],
                            },
                        },
                        validate: async (value: any, operator: TOperator): Promise<string | null> => {
                            const binRegex = /^\d{6}$/;
                            return !binRegex.test(value) ? 'Invalid bin' : null;
                        },
                    },
                ],
            },
        });

        await user.click(screen.getByRole('button', { name: '$spartan.filter.addFilterBtn' }));

        await user.click(screen.getByRole('button', { name: 'Card bin' }));

        const input = screen.getByPlaceholderText('$spartan.filter.inputSelectorPlaceholder');
        await user.type(input, 'abc');

        await user.click(screen.getByRole('button', { name: '$spartan.filter.addBtn' }));

        screen.getByText('Invalid bin');
    });

    test('Cannot add field with two interfaces due to failed validation', async () => {
        const user = userEvent.setup();
        render(SFilter, {
            props: {
                fields: [
                    {
                        id: 'amount',
                        name: 'Amount',
                        interfaces: {
                            twoInputs: {
                                inputType: 'amount',
                                currency: 'USD',
                                operators: ['between', 'notBetween'],
                            },
                        },
                        validate: (value: any, operator: TOperator): string | null => {
                            return operator == 'between' && parseFloat(value[0]) > parseFloat(value[1])
                                ? 'Invalid amount range'
                                : null;
                        },
                    },
                ],
            },
        });

        await user.click(screen.getByRole('button', { name: '$spartan.filter.addFilterBtn' }));

        await user.click(screen.getByRole('button', { name: 'Amount' }));

        const inputs = screen.getAllByPlaceholderText('$spartan.filter.inputSelectorPlaceholder');
        await user.type(inputs[0], '50');
        await user.type(inputs[1], '20');

        await user.click(screen.getByRole('button', { name: '$spartan.filter.addBtn' }));

        screen.getByText('Invalid amount range');
    });
});
