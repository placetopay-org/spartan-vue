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
        const Cell1 = h(
            STableCell,
            null,
            { default: () => 'John Doe' },
        );

        const Cell2 = h(
            STableCell,
            null,
            { default: () => 'john.doe@email.com' },
        );

        const BodyRow = h(
            STableRow,
            null,
            { default: () => [Cell1, Cell2] },
        );

        const Body = h(
            STableBody,
            null,
            { default: () => BodyRow },
        );

        const HeadCell1 = h(
            STableHeadCell,
            null,
            { default: () => 'Name' },
        );

        const HeadCell2 = h(
            STableHeadCell,
            null,
            { default: () => 'Email' },
        );

        const HeadRow = h(
            STableRow,
            null,
            { default: () => [HeadCell1, HeadCell2] },
        );

        const Head = h(
            STableHead,
            null,
            { default: () => HeadRow },
        );

        render(STable, { slots: { default: [Head, Body] }});

        // Assert
        screen.getByRole('table');
        screen.getByRole('columnheader', { name: 'Name' });
        screen.getByRole('columnheader', { name: 'Email' });
        screen.getByRole('cell', { name: 'John Doe' });
        screen.getByRole('cell', { name: 'john.doe@email.com' });
    });
});
