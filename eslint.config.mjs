import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import storybook from 'eslint-plugin-storybook';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.config({
		extends: ['next', 'next/core-web-vitals', 'next/typescript', 'plugin:jsx-a11y/recommended'],
		plugins: ['prettier', 'jsx-a11y'],
		rules: {
			'no-console': 'warn',
			'import/order': ['error'],
			'import/namespace': 'off',
			'import/no-mutable-exports': 'error',
			'import/no-cycle': 'error',
			'import/no-default-export': 'error',
			'import/no-duplicates': ['error', { 'prefer-inline': true }],
			'react/no-unescaped-entities': 'off',
			'jsx-a11y/alt-text': 'warn',
			'jsx-a11y/aria-props': 'warn',
			'jsx-a11y/aria-proptypes': 'warn',
			'jsx-a11y/aria-unsupported-elements': 'warn',
			'jsx-a11y/role-has-required-aria-props': 'warn',
			'jsx-a11y/role-supports-aria-props': 'warn',
			'prettier/prettier': 'warn',
			'no-restricted-imports': [
				'error',
				{
					name: 'next/router',
					message: 'Use `next/navigation` instead.',
				},
			],
		},
		overrides: [
			{
				files: [
					// https://nextjs.org/docs/app/api-reference/file-conventions
					'src/app/**/{page,layout,error,not-found,robots}.ts?(x)',
				],
				rules: {
					'import/no-default-export': 'off',
				},
			},
			{
				files: ['*.config.{?(m)js,?(m)ts}', '.storybook/**'],
				rules: {
					'@typescript-eslint/no-var-requires': 'off',
					'import/no-default-export': 'off',
					'import/no-anonymous-default-export': 'off',
				},
			},
			{
				files: ['src/components/**/*.ts?(x)'],
				rules: {
					'no-restricted-imports': ['error', '@/settings.json'],
				},
			},
			{
				files: ['src/**/*.stories.ts?(x)', '.storybook/*.ts?(x)'],
				rules: {
					'import/no-default-export': 'off',
					'@typescript-eslint/ban-ts-comment': 'off',
				},
			},
		],
	}),
	...storybook.configs['flat/recommended'],
];

export default eslintConfig;
