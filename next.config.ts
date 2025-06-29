import type { NextConfig } from 'next';
import settings from '@/settings.json';

// Variables from `settings.json` converted to Sass variables
const createSassVariables = (data: object, prefix = ''): string =>
	`${Object.entries(data)
		.reduce(
			(result: string[], [key, value]) => [
				...result,
				typeof value === 'object' ? createSassVariables(value, `${key}-`) : `$${prefix}${key}: ${value};`,
			],
			[],
		)
		.join('\n')}`;

const nextConfig: NextConfig = {
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
	},
	sassOptions: {
		implementation: 'sass',
		additionalData: createSassVariables(settings),
	},
};

export default nextConfig;
