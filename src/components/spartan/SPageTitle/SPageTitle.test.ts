import { test, describe } from 'vitest';
import SPageTitle from './SPageTitle.vue';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';

describe('SPageTitle', () => {
    test('Can be rendered', async () => {
        // Act
        render(SPageTitle, { props: { class: 'test-class' }, slots: { default: 'My Page' } });

        const pageTitle = screen.getByRole('heading', { name: 'My Page' });

        // Assert
        expect(pageTitle).toBeInTheDocument();
        expect(pageTitle).toHaveClass('test-class');
    });
});
