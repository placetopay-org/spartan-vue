import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SDataTable from './SDataTable.vue';

describe('SDataTable', () => {
    test('Can be rendered', async () => {
        // Act
        render(SDataTable, {
            props: {
                cols: ['name', { id: 'email', header: 'email', sortable: false, sortDescFirst: false }, { id: 'role' }],
                data: [{name: 'john doe', email: 'john.doe@example.com', role: 'admin'}]
            }
        });

        // Assert
        screen.getByRole('table');
        screen.getByText('name');
        screen.getByText('email');
        screen.getByText('john doe');
        screen.getByText('john.doe@example.com');
    });
});
