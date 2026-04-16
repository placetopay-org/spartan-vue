import { test, describe } from 'vitest';
import STable from './STable.vue';
import STableHead from './STableHead.vue';
import STableHeadCell from './STableHeadCell.vue';
import STableRow from './STableRow.vue';
import STableBody from './STableBody.vue';
import STableCell from './STableCell.vue';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import { h } from 'vue';

describe('STable', () => {
    test('Can be rendered', async () => {
        // Act
        const Cell1 = h(STableCell, null, { default: () => 'John Doe' });

        const Cell2 = h(STableCell, null, { default: () => 'john.doe@email.com' });

        const BodyRow = h(STableRow, null, { default: () => [Cell1, Cell2] });

        const Body = h(STableBody, null, { default: () => BodyRow });

        const HeadCell1 = h(STableHeadCell, null, { default: () => 'Name' });

        const HeadCell2 = h(STableHeadCell, null, { default: () => 'Email' });

        const HeadRow = h(STableRow, null, { default: () => [HeadCell1, HeadCell2] });

        const Head = h(STableHead, null, { default: () => HeadRow });

        render(STable, { slots: { default: [Head, Body] } });

        // Assert
        screen.getByRole('table');
        screen.getByRole('columnheader', { name: 'Name' });
        screen.getByRole('columnheader', { name: 'Email' });
        screen.getByRole('cell', { name: 'John Doe' });
        screen.getByRole('cell', { name: 'john.doe@email.com' });
    });

    test('Auto-generates table from cols and rows', () => {
        render(STable, {
            props: {
                cols: ['Name', 'Email'],
                rows: [
                    ['Alice', 'alice@test.com'],
                    ['Bob', 'bob@test.com'],
                ],
            },
        });

        screen.getByRole('table');
        screen.getByRole('columnheader', { name: 'Name' });
        screen.getByRole('columnheader', { name: 'Email' });
        screen.getByRole('cell', { name: 'Alice' });
        screen.getByRole('cell', { name: 'bob@test.com' });
    });

    test('Auto-generates table with highlight', () => {
        render(STable, {
            props: {
                cols: ['Name', 'Amount'],
                rows: [['Alice', '$100']],
                highlight: [0],
            },
        });

        const nameCell = screen.getByRole('cell', { name: 'Alice' });
        expect(nameCell.className).toContain('font-medium');
    });

    test('Renders borderless mode', () => {
        const Cell = h(STableCell, null, { default: () => 'data' });
        const Row = h(STableRow, null, { default: () => Cell });
        const Body = h(STableBody, null, { default: () => Row });

        render(STable, {
            props: { borderless: true },
            slots: { default: Body },
        });

        const table = screen.getByRole('table');
        expect(table.className).not.toContain('shadow');
    });

    test('Renders cell with colspan', () => {
        const Cell = h(STableCell, { colspan: 3 }, { default: () => 'Spanning' });
        const Row = h(STableRow, null, { default: () => Cell });
        const Body = h(STableBody, null, { default: () => Row });

        render(STable, { slots: { default: Body } });

        const cell = screen.getByRole('cell', { name: 'Spanning' });
        expect(cell).toHaveAttribute('colspan', '3');
    });

    test('Renders cell with highlight', () => {
        const Cell = h(STableCell, { highlight: true }, { default: () => 'Bold' });
        const Row = h(STableRow, null, { default: () => Cell });
        const Body = h(STableBody, null, { default: () => Row });

        render(STable, { slots: { default: Body } });

        const cell = screen.getByRole('cell', { name: 'Bold' });
        expect(cell.className).toContain('font-medium');
    });
});
