import { InputHTMLAttributes } from 'react';
import cx from 'clsx';

import s from './input.module.scss';

export type InputProps = {
	type?: 'text' | 'email' | 'number' | 'password' | 'search';
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const Input = ({ className, ...props }: InputProps) => {
	return <input className={cx(s['input'], className)} {...props} />;
};
