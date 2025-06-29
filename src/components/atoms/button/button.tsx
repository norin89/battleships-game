import { ButtonHTMLAttributes } from 'react';
import cx from 'clsx';

import s from './button.module.scss';

export type ButtonProps = {
	variant?: 'primary' | 'secondary';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const DEFAULT_VARIANT = 'secondary';

export const Button = ({ variant = DEFAULT_VARIANT, className, ...props }: ButtonProps) => {
	return (
		<button
			className={cx(
				s['button'],
				{
					[s[`button--${variant}`]]: variant !== DEFAULT_VARIANT,
				},
				className,
			)}
			{...props}
		/>
	);
};
