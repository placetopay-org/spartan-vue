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
        } catch (error) {}

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
            },
        });

        // Assert
        screen.getByRole('table');
    });

    test('Can be rendered col name variants', async () => {
        // Act
        render(SDataTable, {
            props: {
                cols: [{ id: 'withoutName', sortable: false, sortDescFirst: false }, 'stringName'],
                data: [],
            },
        });

        // Assert
        screen.getByRole('table');
    });

    test('Can change pages', async () => {
        // Arrange
        const user = await userEvent.setup();

        // Act
        const { emitted } = render(SDataTable, {
            props: {
                cols: table.colsData,
                data: table.rows,
                pageSizes: [1, 5, 10],
                pagination: { page: 2, size: 3, count: 4 },
            },
        });

        const firstButton = screen.getByRole('button', { name: 'First' });
        const lastButton = screen.getByRole('button', { name: 'Last' });
        await user.click(firstButton);
        await user.click(lastButton);

        const nextButton = screen.getByRole('button', { name: 'Next' });
        await user.click(nextButton);
        await user.click(nextButton);

        const prevButton = screen.getByRole('button', { name: 'Prev' });
        await user.click(prevButton);

        // Assert
        screen.getByRole('table');
        expect(emitted().paginationChange).toEqual([
            [{ page: 1, size: 3 }],
            [{ page: 4, size: 3 }],
            [{ page: 3, size: 3 }],
            [{ page: 3, size: 3 }],
            [{ page: 1, size: 3 }],
        ]);
        screen.debug();
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
            },
        });

        const nextButton = screen.getByRole('button', { name: 'Next' });
        await user.click(nextButton);
        await user.click(nextButton);

        const prevButton = screen.getByRole('button', { name: 'Prev' });
        await user.click(prevButton);

        // Assert
        screen.getByRole('table');
        screen.getByText('Name');
        screen.getByText('Email');
        screen.getByText('Jhon Connor');
        screen.getByText('jhon.connor@example.com');
    });

    test('Can be sort items', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        const { emitted } = render(SDataTable, {
            props: {
                pagination: { size: 3, count: 4 },
                numericPaginator: true,
                cols: [
                    { id: 'name', header: 'Name', sortable: true, sortDescFirst: false },
                    { id: 'email', header: 'Email', sortable: false, sortDescFirst: false },
                ],
                data: [
                    { name: 'Abby Lane', email: 'abby.lane@email.com' },
                    { name: 'Zimba Doe', email: 'zimba.doe@email.com' },
                ],
            },
        });

        const nameButton = screen.getByRole('button', { name: 'Name' });
        await user.click(nameButton);

        // Assert
        screen.getByRole('table');
        screen.getByText('Name');
        screen.getByText('Email');
        expect(emitted().sortingChange).toHaveLength(1);
        expect(emitted().sortingChange[0]).toEqual([{ id: 'name', desc: false }]);
        expect(emitted().change[0]).toEqual([
            {
                type: 'sorting',
                value: {
                    desc: false,
                    id: 'name',
                },
            },
        ]);
    });
});
