import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SDataTable from './SDataTable.vue';
import userEvent from '@testing-library/user-event';
import { h } from 'vue';

describe('SDataTable', () => {
    // test('Throw warning for required v-model and value', () => {
    //     // Arrange
    //     const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    //     // Act
    //     render(SDataTable);

    //     // Assert
    //     expect(warn).toHaveBeenCalledOnce();
    //     expect(warn.mock.calls[0][0]).contains('[Vue warn]: Missing required prop: "modelValue"');
    // });

    test('Can be rendered', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        render(SDataTable);

        // Assert
        screen.debug();
    });
});
