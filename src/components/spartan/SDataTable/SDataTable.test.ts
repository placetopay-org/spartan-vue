import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SDataTable from './SDataTable.vue';
import userEvent from '@testing-library/user-event';
import { table } from '@/data';
import { h } from 'vue';

describe('SDataTable', () => {
    test('Throw warning for required cols and data', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        try {
            render(SDataTable);
        } catch (error) {
            // Do nothing
        };

        // Assert
        expect(warn).toHaveBeenCalledTimes(2);
        expect(warn.mock.calls[0][0]).contains('[Vue warn]: Missing required prop: "cols"');
        expect(warn.mock.calls[1][0]).contains('[Vue warn]: Missing required prop: "data"');
    });

    test('Can be rendered', async () => {
        // Act
        render(SDataTable, {
            props: {
                cols: table.colsData,
                data: table.rows,
                // cols: ['name', { id: 'email', header: 'email', sortable: false, sortDescFirst: false }, { id: 'role' }],
                // data: [{name: 'john doe', email: 'john.doe@example.com', role: 'admin'}]
            }
        });

        // Assert
        screen.getByRole('table');
    });

    test('Can be rendered with numeric paginator', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        render(SDataTable, {
            props: {
                pagination: { size: 3, count: 4 },
                numericPaginator: true,
                cols: table.colsData,
                data: table.rows,
            }
        });

        // Assert
        screen.getByRole('table');
        screen.debug();
        screen.getByText('name');
        screen.getByText('email');
        screen.getByText('john doe');
        screen.getByText('john.doe@example.com');
    });
});
