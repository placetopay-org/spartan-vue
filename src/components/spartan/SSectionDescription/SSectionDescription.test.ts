import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SSectionDescription from './SSectionDescription.vue';

describe('SSectionDescription', () => {
    test('Throw warning for required "as" prop', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        render(SSectionDescription);

        // Assert
        expect(warn).toHaveBeenCalledOnce();
        expect(warn.mock.calls[0][0]).contains('[Vue warn]: Missing required prop: "as"');
    });

    test('Can be rendered', () => {
        // Act
        render(SSectionDescription, { props: { as: 'p' }, slots: { default: 'My test description' } });

        // Assert
        screen.getByText('My test description');
    });
});
