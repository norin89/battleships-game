import type { Preview } from '@storybook/nextjs';

const preview: Preview = {
	parameters: {
		options: {
			storySort: {
				order: ['Atoms', 'Molecules', 'Organisms'],
			},
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
