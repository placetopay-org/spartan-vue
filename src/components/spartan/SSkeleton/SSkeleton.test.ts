import { test, describe } from 'vitest';
import SSkeleton from './SSkeleton.vue';
import { render } from '@testing-library/vue';

describe('SSkeleton', () => {
    test('Can be rendered', async () => {
        // Act
        const {baseElement} = render(SSkeleton);

        // Assert
        expect(baseElement.firstElementChild?.firstElementChild).toHaveClass('skeleton h-6 w-full rounded-md');
    });
});
