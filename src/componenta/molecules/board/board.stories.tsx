import type { Meta, StoryObj } from '@storybook/nextjs';

import { Board } from './board';

const meta = {
	title: 'Molecules / Board',
	component: Board,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div style={{ maxWidth: 480 }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Board>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
	args: {},
};

export const WithShips: Story = {
	args: {
		ships: [
			{
				size: 5,
				orientation: 'horizontal',
				position: { column: 2, row: 4 },
			},
			{
				size: 4,
				position: { row: 2, column: 5 },
				orientation: 'horizontal',
			},
			{
				size: 4,
				position: { row: 7, column: 7 },
				orientation: 'vertical',
			},
			{
				size: 3,
				position: { row: 8, column: 1 },
				orientation: 'horizontal',
			},
			{
				size: 2,
				position: { row: 1, column: 1 },
				orientation: 'horizontal',
			},
			{
				size: 1,
				position: { row: 6, column: 10 },
				orientation: 'horizontal',
			},
		],
	},
};

export const WithShots: Story = {
	args: {
		shots: [
			{ position: { row: 1, column: 1 }, status: 'hit' },
			{ position: { row: 1, column: 2 }, status: 'miss' },
			{ position: { row: 2, column: 9 }, status: 'miss' },
			{ position: { row: 4, column: 6 }, status: 'hit' },
			{ position: { row: 7, column: 7 }, status: 'hit' },
			{ position: { row: 8, column: 4 }, status: 'miss' },
			{ position: { row: 6, column: 10 }, status: 'hit' },
			{ position: { row: 9, column: 9 }, status: 'miss' },
		],
	},
};

export const Combined: Story = {
	args: {
		...WithShips.args,
		...WithShots.args,
	},
};
