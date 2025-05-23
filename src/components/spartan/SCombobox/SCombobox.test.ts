import { test, describe } from 'vitest';
import { render, waitFor } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SCombobox from './SCombobox.vue';
import SComboboxOption from './SComboboxOption.vue';
import SComboboxOptionGroup from './SComboboxOptionGroup.vue';
import userEvent from '@testing-library/user-event';
import { h } from 'vue';

describe('SCombobox', () => {
    test('Can be rendered', () => {
        // Act
        render(SCombobox);

        // Assert
        screen.getByRole('button');
    });

    test('Can be rendered with options', async () => {
        // Arrange
        const user = userEvent.setup();
        const option1 = h(SComboboxOption, { value: '1' }, { default: () => 'Option 1' });
        const option2 = h(SComboboxOption, { value: '2' }, { default: () => 'Option 2' });
        const option3 = h(SComboboxOption, { value: '3' }, { default: () => 'Option 3' });

        // Act
        render(SCombobox, { slots: { default: [option1, option2, option3] } });
        const combobox = screen.getByRole('button');
        await user.click(combobox);

        const list = screen.getByRole('listbox');
        const listItem1 = screen.getByRole('option', { name: 'Option 1' });
        const listItem2 = screen.getByRole('option', { name: 'Option 2' });
        const listItem3 = screen.getByRole('option', { name: 'Option 3' });

        // Assert
        expect(list.childElementCount).toBe(3);
        expect(listItem1).toBeInTheDocument();
        expect(listItem1.children[0]).toHaveClass('font-normal block truncate');
        expect(listItem2).toBeInTheDocument();
        expect(listItem2.children[0]).toHaveClass('font-normal block truncate');
        expect(listItem3).toBeInTheDocument();
        expect(listItem3.children[0]).toHaveClass('font-normal block truncate');
    });

    test('Can select an option', async () => {
        // Arrange
        const user = userEvent.setup();
        const option1 = h(SComboboxOption, { value: '1' }, { default: () => 'Option 1' });
        const option2 = h(SComboboxOption, { value: '2' }, { default: () => 'Option 2' });
        const option3 = h(SComboboxOption, { value: '3' }, { default: () => 'Option 3' });

        // Act
        const { rerender } = render(SCombobox, {
            slots: { default: [option1, option2, option3] },
            props: {
                modelValue: '1',
                displayButtonText: (i: string) => i,
                'onUpdate:modelValue': (e: string) => rerender({ modelValue: e }),
            },
        });

        const combobox = screen.getByRole('button');
        await user.click(combobox);

        const item = screen.getByRole('option', { name: 'Option 2' });

        await user.click(item);

        // Assert
        expect(item.children[0]).toHaveClass('font-medium');
        expect(combobox.children[0]).toHaveTextContent('2');
    });

    test('Can render a option group', async () => {
        // Arrange
        const user = userEvent.setup();
        const option1 = h(SComboboxOption, { value: '1' }, { default: () => 'Option 1' });
        const option2 = h(SComboboxOption, { value: '2' }, { default: () => 'Option 2' });
        const option3 = h(SComboboxOption, { value: '3' }, { default: () => 'Option 3' });
        const option4 = h(SComboboxOption, { value: '4' }, { default: () => 'Option 4' });
        const option5 = h(SComboboxOption, { value: '5' }, { default: () => 'Option 5' });
        const option6 = h(SComboboxOption, { value: '6' }, { default: () => 'Option 6' });

        const optionGroup1 = h(SComboboxOptionGroup, { label: 'Group 1' }, () => [option1, option2, option3]);
        const optionGroup2 = h(SComboboxOptionGroup, { label: 'Group 2' }, () => [option4, option5, option6]);

        // Act
        const { rerender } = render(SCombobox, {
            slots: { default: [optionGroup1, optionGroup2] },
            props: {
                modelValue: '1',
                displayButtonText: (i: string) => i,
                'onUpdate:modelValue': (e: string) => rerender({ modelValue: e }),
            },
        });

        const combobox = screen.getByRole('button');
        await user.click(combobox);

        const item2 = screen.getByRole('option', { name: 'Option 2' });
        const item4 = screen.getByRole('option', { name: 'Option 4' });

        // Assert
        expect(item2.parentElement?.firstElementChild?.firstElementChild).toHaveClass('font-semibold text-gray-700');
        expect(item2.parentElement?.firstElementChild?.firstElementChild).toHaveTextContent('Group 1');
        expect(item4.parentElement?.firstElementChild?.firstElementChild).toHaveClass('font-semibold text-gray-700');
        expect(item4.parentElement?.firstElementChild?.firstElementChild).toHaveTextContent('Group 2');
    });

    test('Can autosearch', async () => {
        // Arrange
        const options = ['Option 1', 'Option 2', 'Option 3'];
        const user = userEvent.setup();
        const option1 = h(SComboboxOption, { value: options[0] }, () => options[0]);
        const option2 = h(SComboboxOption, { value: options[1] }, () => options[1]);
        const option3 = h(SComboboxOption, { value: options[2] }, () => options[2]);

        // Act
        const { rerender } = render(SCombobox, {
            slots: { default: [option1, option2, option3] },
            props: {
                search: 'auto',
                queryDebounce: 0,
                modelValue: '1',
                displayButtonText: (i: string) => i,
                'onUpdate:modelValue': (e: string) => rerender({ modelValue: e }),
            },
        });

        const comboboxInput = screen.getByRole('combobox');
        await user.type(comboboxInput, 'nothing');

        // Assert
        await waitFor(() => {
            screen.getByText('Nothing found.');
        });
    });
});
