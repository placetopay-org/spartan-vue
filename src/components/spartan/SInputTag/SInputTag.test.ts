import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SInputTag from './SInputTag.vue';
import userEvent from '@testing-library/user-event';

// describe('SInputTag', () => {
//     test('renders with default props', async () => {
//         // Act
//         render(SInputTag, {
//             props: { title: 'Tooltip content' },
//             slots: {
//                 default: 'Hover me',
//             },
//         });

//         const triggerElement = screen.getByText('Hover me');

//         // Assert
//         expect(screen.queryByRole('tooltip', { name: 'Tooltip content' })).not.toBeInTheDocument();

//         await userEvent.hover(triggerElement);

//         expect(screen.getByRole('tooltip', { name: 'Tooltip content' })).toBeInTheDocument();
//     });
// });
