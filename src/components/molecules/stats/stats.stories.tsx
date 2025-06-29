import type { Meta, StoryObj } from '@storybook/nextjs';

import { Stats } from './stats';
import { Ship, Shot } from '@/components/atoms';

const meta = {
	title: 'Molecules / Stats',
	component: Stats,
	tags: ['autodocs'],
} satisfies Meta<typeof Stats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		items: [
			<>
				<Shot status="hit" /> <strong>5x</strong> hit
				{` / `}
				<Shot status="miss" /> <strong>12x</strong> miss
			</>,
			<>
				{`Ships count: `}
				<>
					<strong>2x </strong>
					<Ship size={4} orientation="horizontal" showSize />
				</>
				{`  `}
				<>
					<strong>1x </strong>
					<Ship size={5} orientation="horizontal" showSize />
				</>
			</>,
		],
	},
};
