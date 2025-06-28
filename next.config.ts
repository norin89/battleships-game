import type { NextConfig } from 'next';
// @ts-expect-error: no types available
import sassJsonImporter from 'node-sass-json-importer';

const nextConfig: NextConfig = {
	sassOptions: {
		importer: sassJsonImporter(),
	},
};

export default nextConfig;
