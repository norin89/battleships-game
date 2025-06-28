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
				position: { column: 2, row: 4 },
				orientation: 'horizontal',
			},
			{
				size: 4,
				orientation: 'horizontal',
				position: { row: 2, column: 5 },
			},
			{
				size: 4,
				orientation: 'vertical',
				position: { row: 7, column: 7 },
			},
			{
				size: 3,
				orientation: 'horizontal',
				position: { row: 8, column: 1 },
			},
			{
				size: 2,
				orientation: 'vertical',
				position: { row: 1, column: 1 },
			},
			{
				size: 1,
				orientation: 'horizontal',
				position: { row: 6, column: 10 },
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
			{ position: { row: 1, column: 8 }, status: 'miss' },
		],
	},
};

export const Combined: Story = {
	args: {
		ships: WithShips.args!.ships!.map((ship, idx) => ({
			...ship,
			// make last ship sunk for demo
			isSunk: idx + 1 === WithShips.args!.ships!.length,
		})),
		...WithShots.args,
	},
};
