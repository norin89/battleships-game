import type { NextConfig } from 'next';
import settings from '@/settings.json';

// Variables from `settings.json` converted to Sass variables
const additionalSassData = `${Object.entries(settings)
	.map(([key, value]) => `$${key}: ${value};`)
	.join('\n')}`;

const nextConfig: NextConfig = {
	sassOptions: {
		implementation: 'sass',
		additionalData: additionalSassData,
	},
};

export default nextConfig;
