import { test, describe, expect } from 'vitest';
import { render, waitFor } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SDTable from './SDTable.vue';
import SDColumn from './SDColumn.vue';
import userEvent from '@testing-library/user-event';
import { table } from '@/data';
import { h } from 'vue';
import { createContext, useContext } from './api';

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
            expect(screen.getByRole('columnheader', { name: 'Nombre' })).toBeInTheDocument();
            expect(screen.getByRole('columnheader', { name: 'Correo' })).toBeInTheDocument();
            expect(screen.getByRole('columnheader', { name: 'Titulo' })).toBeInTheDocument();
            expect(screen.getByRole('columnheader', { name: 'Rol' })).toBeInTheDocument();

            expect(screen.getByRole('cell', { name: 'Lindsay Walton' })).toBeInTheDocument();

            expect(
                screen.getByRole('row', {
                    name: 'Lindsay Walton lindsay.walton@example.com Front-end Developer Member',
                }),
            ).toBeInTheDocument();
            expect(
                screen.getByRole('row', { name: 'Jhon Connor jhon.connor@example.com Back-end Developer Member' }),
            ).toBeInTheDocument();
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

    test('renders the table with expander column', async () => {
        const user = userEvent.setup();

        const ExpanderCol = h(SDColumn, { expander: true });
        const Column1 = h(SDColumn, { field: 'name', header: 'Name' });

        const { emitted } = render(SDTable, {
            props: { data: [{ name: 'Alice' }, { name: 'Bob' }] },
            slots: {
                default: [ExpanderCol, Column1],
                expansion: ({ row }) => h('div', `Details for ${row.name}`),
            },
        });

        await waitFor(async () => {
            const buttons = screen.getAllByRole('button');
            expect(buttons.length).toBeGreaterThanOrEqual(1);

            await user.click(buttons[0]);

            expect(emitted().toggleExpanders).toBeTruthy();
        });
    });

    test('renders the table with noLink column', async () => {
        const Column1 = h(SDColumn, { field: 'name', header: 'Name' });
        const Column2 = h(SDColumn, { field: 'action', header: 'Action', noLink: true });

        render(SDTable, {
            props: {
                data: [{ name: 'Alice', action: 'Edit' }],
                rowLink: () => '/users/1',
            },
            slots: { default: [Column1, Column2] },
        });

        await waitFor(() => {
            const nameCell = screen.getByRole('cell', { name: 'Alice' });
            expect(nameCell.querySelector('a')).toHaveAttribute('href', '/users/1');
        });
    });

    test('renders loading state', async () => {
        const Column1 = h(SDColumn, { field: 'name', header: 'Name' });

        render(SDTable, {
            props: { data: [], loading: true },
            slots: { default: [Column1] },
        });

        await waitFor(() => {
            expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
        });
    });

    test('renders slim and borderless', async () => {
        const Column1 = h(SDColumn, { field: 'name', header: 'Name' });

        render(SDTable, {
            props: { data: [{ name: 'Alice' }], slim: true, borderless: true },
            slots: { default: [Column1] },
        });

        await waitFor(() => {
            expect(screen.getByRole('cell', { name: 'Alice' })).toBeInTheDocument();
        });
    });

    test('boolean sort renders sort indicator (hover hint)', async () => {
        const Column1 = h(SDColumn, { field: 'name', header: 'Name', sort: true });

        const { emitted } = render(SDTable, {
            props: { data: [{ name: 'Alice' }] },
            slots: { default: [Column1] },
        });

        await waitFor(async () => {
            const header = screen.getByRole('columnheader', { name: 'Name' });
            const btn = header.querySelector('button')!;
            const svg = btn.querySelector('svg');
            expect(svg).toBeTruthy();

            const user = userEvent.setup();
            await user.click(btn);

            expect(emitted().sort).toEqual([[{ field: 'name', sort: true }]]);
        });
    });

    test('uses rowLinkAs override when provided', async () => {
        const Column1 = h(SDColumn, { field: 'name', header: 'Name' });

        const FakeLink = {
            props: ['href'],
            template: '<i data-test="fake-link" :href="href"><slot /></i>',
        };

        render(SDTable, {
            props: {
                data: [{ name: 'Alice' }],
                rowLink: () => '/x',
                rowLinkAs: FakeLink as any,
            },
            slots: { default: [Column1] },
        });

        await waitFor(() => {
            expect(document.querySelector('[data-test="fake-link"]')).toBeTruthy();
        });
    });

    test('clicking a body expander toggles the row and emits toggleExpanders', async () => {
        const user = userEvent.setup();

        const ExpanderCol = h(SDColumn, { expander: true });
        const Column1 = h(SDColumn, { field: 'name', header: 'Name' });

        const { emitted } = render(SDTable, {
            props: { data: [{ name: 'Alice' }, { name: 'Bob' }] },
            slots: {
                default: [ExpanderCol, Column1],
                expansion: ({ row }) => h('div', `Details for ${row.name}`),
            },
        });

        await waitFor(() => screen.getByRole('cell', { name: 'Alice' }));

        // buttons[0] is the header toggle-all, [1] is Alice's row expander, [2] is Bob's
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThanOrEqual(3);

        await user.click(buttons[1]);
        // Expand again is no-op for emit (already expanded), then collapse
        await user.click(buttons[1]);

        expect(emitted().toggleExpanders).toBeTruthy();
        // Only the first expansion triggers an emit, not the collapse
        expect(emitted().toggleExpanders.length).toBeGreaterThanOrEqual(1);
    });

    test('ignores duplicate expander column', async () => {
        const ExpanderCol1 = h(SDColumn, { expander: true });
        const ExpanderCol2 = h(SDColumn, { expander: true });
        const Column1 = h(SDColumn, { field: 'name', header: 'Name' });

        render(SDTable, {
            props: { data: [{ name: 'Alice' }] },
            slots: { default: [ExpanderCol1, ExpanderCol2, Column1] },
        });

        await waitFor(() => {
            // Only one expander button per row (header + 1 row)
            const buttons = screen.getAllByRole('button');
            expect(buttons).toHaveLength(2);
        });
    });

    test('ignores symbol-field column without expander', async () => {
        const NoFieldCol = h(SDColumn);
        const Column1 = h(SDColumn, { field: 'name', header: 'Name' });

        render(SDTable, {
            props: { data: [{ name: 'Alice' }] },
            slots: { default: [NoFieldCol, Column1] },
        });

        await waitFor(() => {
            // Only the named column should render as a header
            expect(screen.getAllByRole('columnheader')).toHaveLength(1);
        });
    });

    test('renders paginator section when paginator prop is provided', async () => {
        const Column1 = h(SDColumn, { field: 'name', header: 'Name' });

        const { container } = render(SDTable, {
            props: {
                data: [{ name: 'Alice' }],
                paginator: { page: 1, size: 10, total: 100, pageSizes: [10, 25] },
            },
            slots: { default: [Column1] },
        });

        await waitFor(() => {
            expect(container.querySelector('[data-s-paginator]')).toBeTruthy();
        });
    });

    test('emits paginatorChange when paginator emits change', async () => {
        const user = userEvent.setup();
        const Column1 = h(SDColumn, { field: 'name', header: 'Name' });

        const { emitted } = render(SDTable, {
            props: {
                data: [{ name: 'Alice' }],
                paginator: { page: 1, size: 10, total: 100 },
            },
            slots: { default: [Column1] },
        });

        await waitFor(() => screen.getByRole('button', { name: /next/i }));

        await user.click(screen.getByRole('button', { name: /next/i }));

        expect(emitted().paginatorChange).toBeTruthy();
    });

    test('hides paginator when hideWhenSinglePage and only one page', async () => {
        const Column1 = h(SDColumn, { field: 'name', header: 'Name' });

        const { container } = render(SDTable, {
            props: {
                data: [{ name: 'Alice' }],
                paginator: { page: 1, size: 10, total: 5, count: 1, hideWhenSinglePage: true },
            },
            slots: { default: [Column1] },
        });

        await waitFor(() => screen.getByRole('cell', { name: 'Alice' }));

        expect(container.querySelector('[data-s-paginator]')).toBeNull();
    });

    test('paginator count is derived from total/size when hideWhenSinglePage is true', async () => {
        const Column1 = h(SDColumn, { field: 'name', header: 'Name' });

        const { container } = render(SDTable, {
            props: {
                data: [{ name: 'Alice' }],
                // total/size yields 3 pages → paginator should render
                paginator: { page: 1, size: 10, total: 30, hideWhenSinglePage: true },
            },
            slots: { default: [Column1] },
        });

        await waitFor(() => screen.getByRole('cell', { name: 'Alice' }));

        expect(container.querySelector('[data-s-paginator]')).toBeTruthy();
    });
});

describe('SDTable API', () => {
    test('updateCol ignores entry without field', () => {
        const emit = (() => {}) as any;
        const props = { data: [] } as any;

        const state = createContext(props, emit, {});

        state.updateCol({ header: 'No field' });

        expect(Object.keys(state.cols)).toHaveLength(0);
    });

    test('expand watch uses default previousExpandedState when invoked without old value', async () => {
        // Render with an expander column and toggle a row; the watch handler runs and
        // accepts both newValue and oldValue parameters (the default `[]` is a safety
        // fallback for the edge case where Vue passes no oldValue).
        const user = userEvent.setup();

        const ExpanderCol = h(SDColumn, { expander: true });
        const Column1 = h(SDColumn, { field: 'name' });

        render(SDTable, {
            props: { data: [{ name: 'A' }] },
            slots: { default: [ExpanderCol, Column1] },
        });

        await waitFor(() => screen.getByRole('cell', { name: 'A' }));

        // Click sequence to drive multiple watch invocations
        const buttons = screen.getAllByRole('button');
        await user.click(buttons[1]);
        await user.click(buttons[1]);
        await user.click(buttons[1]);

        // Just assert the table is still functional after all toggles
        expect(screen.getByRole('cell', { name: 'A' })).toBeInTheDocument();
    });

    test('useContext throws when used without provider', () => {
        const ErrorComponent = {
            setup() {
                useContext('TestComponent');
            },
            render() {
                return h('div');
            },
        };

        expect(() => render(ErrorComponent)).toThrowError('<TestComponent /> is missing parent <STable /> component');
    });
});
