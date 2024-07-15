import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SSteps from './SSteps.vue';
import SStepsItem from './SStepsItem.vue';

describe('SSteps', () => {
    test('Can be rendered', async () => {
        // Act
        render(SSteps);

        // Assert
        screen.debug();
    });
});
