import { test, describe } from 'vitest';
import SPageTitle from './SPageTitle.vue';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';

describe('SPageTitle', () => {
    test('Can be rendered', async () => {
        // Act
        render(SPageTitle, { slots: { default: 'My Page' }});

        // Assert
        screen.getByRole('heading', { name: 'My Page' });
    });
});
