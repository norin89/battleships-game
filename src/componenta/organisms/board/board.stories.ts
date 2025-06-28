import type { Meta, StoryObj } from '@storybook/nextjs';

import { Board } from './board';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Organisms / Board',
	component: Board,
	tags: ['autodocs'],
} satisfies Meta<typeof Board>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
	args: {},
};
