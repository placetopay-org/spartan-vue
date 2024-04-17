import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SSectionTitle from './SSectionTitle.vue';

describe('SSectionTitle', () => {
    test('Throw warning for required "as" prop', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        render(SSectionTitle);

        // Assert
        expect(warn).toHaveBeenCalledOnce();
        expect(warn.mock.calls[0][0]).contains('[Vue warn]: Missing required prop: "as"');
    });

    test('Can be rendered', () => {

        // Act
        render(SSectionTitle, { props: { as: 'h1' }, slots: { default: 'My test title' } });
        
        // Assert
        screen.getByRole('heading', { name: 'My test title' });
    });
});
