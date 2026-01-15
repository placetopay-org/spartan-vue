import { test, describe, expect } from 'vitest';
import { render, waitFor } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SDTable from './SDTable.vue';
import SDColumn from './SDColumn.vue';
import userEvent from '@testing-library/user-event';
import { table } from '@/data';
import { h } from 'vue';

describe('SDTable', () => {
    test('renders the table base', async () => {
        // Arrange
        const Column1 = h(SDColumn, { field: 'name', header: 'Nombre' });
        const Column2 = h(SDColumn, { field: 'email', header: 'Correo' });
        const Column3 = h(SDColumn, { field: 'title', header: 'Titulo' });
        const Column4 = h(SDColumn, { field: 'role', header: 'Rol' });

        // Act
        render(SDTable, {
            props: {
                data: table.rows.slice(0, 2),
            },
            slots: {
                default: [Column1, Column2, Column3, Column4],
            },
        });

        // Assert
        await waitFor(() => {
            screen.getByRole('columnheader', { name: 'Nombre' });
            screen.getByRole('columnheader', { name: 'Correo' });
            screen.getByRole('columnheader', { name: 'Titulo' });
            screen.getByRole('columnheader', { name: 'Rol' });

            screen.getByRole('cell', { name: 'Lindsay Walton' });

            screen.getByRole('row', { name: 'Lindsay Walton lindsay.walton@example.com Front-end Developer Member' });
            screen.getByRole('row', { name: 'Jhon Connor jhon.connor@example.com Back-end Developer Member' });
        });
    });

    test('renders the table with custom cell', async () => {
        // Arrange
        const Column1 = h(SDColumn, { field: 'name', header: 'Nombre' });
        const Column2 = h(
            SDColumn,
            { field: 'email', header: 'Correo' },
            {
                body: ({ value }) =>
                    h('span', { class: 'text-blue-500' }, { default: () => `${value.slice(0, 3)}***` }),
            },
        );
        const Column3 = h(SDColumn, { field: 'title', header: 'Titulo' });
        const Column4 = h(SDColumn, { field: 'role', header: 'Rol' });

        // Act
        render(SDTable, {
            props: {
                data: table.rows.slice(0, 2),
            },
            slots: {
                default: [Column1, Column2, Column3, Column4],
            },
        });

        // Assert
        await waitFor(() => {
            const customCell = screen.getByRole('cell', { name: 'lin***' });

            const spanElement = customCell.querySelector('span');
            expect(spanElement).toHaveClass('text-blue-500');
        });
    });

    test('renders the table with custom header', async () => {
        // Arrange
        const Column1 = h(SDColumn, { field: 'name', header: 'Nombre' });
        const Column2 = h(
            SDColumn,
            { field: 'email', header: 'Correo' },
            {
                header: () => h('span', { class: 'text-blue-500' }, { default: () => 'ALIAS' }),
            },
        );
        const Column3 = h(SDColumn, { field: 'title', header: 'Titulo' });
        const Column4 = h(SDColumn, { field: 'role', header: 'Rol' });

        // Act
        render(SDTable, {
            props: {
                data: table.rows.slice(0, 2),
            },
            slots: {
                default: [Column1, Column2, Column3, Column4],
            },
        });

        // Assert
        await waitFor(() => {
            const customHeader = screen.getByRole('columnheader', { name: 'ALIAS' });

            const spanElement = customHeader.querySelector('span');
            expect(spanElement).toHaveClass('text-blue-500');
        });
    });

    test('renders the table with row link', async () => {
        // Arrange
        const Column1 = h(SDColumn, { field: 'name', header: 'Nombre' });
        const Column2 = h(SDColumn, { field: 'email', header: 'Correo' });
        const Column3 = h(SDColumn, { field: 'title', header: 'Titulo' });
        const Column4 = h(SDColumn, { field: 'role', header: 'Rol' });

        // Act
        render(SDTable, {
            props: {
                data: table.rows.slice(0, 1),
                rowLink: (row) => row.email,
            },
            slots: {
                default: [Column1, Column2, Column3, Column4],
            },
        });

        // Assert
        await waitFor(() => {
            screen.getByRole('row', {
                name: 'Lindsay Walton lindsay.walton@example.com Front-end Developer Member',
            });
            const cell1 = screen.getByRole('cell', { name: 'Lindsay Walton' });
            const link1 = cell1.querySelector('a');

            const cell2 = screen.getByRole('cell', { name: 'lindsay.walton@example.com' });
            const link2 = cell2.querySelector('a');

            const cell3 = screen.getByRole('cell', { name: 'Front-end Developer' });
            const link3 = cell3.querySelector('a');

            const cell4 = screen.getByRole('cell', { name: 'Member' });
            const link4 = cell4.querySelector('a');

            const url = 'lindsay.walton@example.com';

            expect(link1).toHaveAttribute('href', url);
            expect(link2).toHaveAttribute('href', url);
            expect(link3).toHaveAttribute('href', url);
            expect(link4).toHaveAttribute('href', url);
        });
    });

    test('renders the table with sort', async () => {
        // Arrange
        const user = userEvent.setup();

        const Column1 = h(SDColumn, { field: 'name', header: 'Nombre', sort: 'asc' });
        const Column2 = h(SDColumn, { field: 'email', header: 'Correo', sort: 'des' });
        const Column3 = h(SDColumn, { field: 'title', header: 'Titulo' });
        const Column4 = h(SDColumn, { field: 'role' });

        // Act
        const { emitted } = render(SDTable, {
            props: {
                data: table.rows.slice(0, 2),
            },
            slots: {
                default: [Column1, Column2, Column3, Column4],
            },
        });

        // Assert
        await waitFor(async () => {
            const col1 = screen.getByRole('columnheader', { name: 'Nombre' });
            const col2 = screen.getByRole('columnheader', { name: 'Correo' });
            const col3 = screen.getByRole('columnheader', { name: 'Titulo' });

            const btn1 = col1.querySelector('button')!;
            const btn2 = col2.querySelector('button')!;
            const div = col3.querySelector('div')!;

            const svg1 = btn1.querySelector('svg');
            const svg2 = btn2.querySelector('svg');

            const path1 = svg1.querySelector('path')!;
            expect(path1).toHaveAttribute(
                'd',
                'M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z',
            );

            const path2 = svg2.querySelector('path')!;
            expect(path2).toHaveAttribute(
                'd',
                'M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z',
            );

            await user.click(btn1);
            await user.click(btn2);
            await user.click(div);

            expect(emitted().sort).toHaveLength(2);
            expect(emitted().sort[0]).toEqual([{ field: 'name', sort: 'asc' }]);
            expect(emitted().sort[1]).toEqual([{ field: 'email', sort: 'des' }]);
        });
    });
});
