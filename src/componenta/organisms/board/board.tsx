import { Fragment, HTMLAttributes } from 'react';
import cx from 'clsx';

import s from './board.module.scss';
import { numberIndexToAlphanumeric } from '@/utils/numberIndexToAlphanumeric';
import settings from '@/settings.json';

const RENDERED_BOARD_SIZE = settings['board-size'] + 1; // add space for the row and column header

export type BoardProps = HTMLAttributes<HTMLDivElement>;

/** Battleships game board */
export const Board = ({ className, ...props }: BoardProps) => (
	<div className={cx(s['board'], className)} {...props}>
		{Array.from({ length: RENDERED_BOARD_SIZE }, (_row, rowIdx) => (
			<Fragment key={rowIdx}>
				{Array.from({ length: RENDERED_BOARD_SIZE }, (_column, columnIdx) => {
					const isHeader = rowIdx === 0 || columnIdx === 0;
					const columnLetter = columnIdx > 0 ? numberIndexToAlphanumeric(columnIdx - 1) : '';
					const fieldIdx = `${columnLetter}${rowIdx}`;

					return (
						<div
							key={fieldIdx}
							className={cx(s['board__field'], {
								[s['board__field--header']]: isHeader,
							})}
						>
							{isHeader ? (rowIdx === 0 ? columnLetter : rowIdx) : fieldIdx}
						</div>
					);
				})}
			</Fragment>
		))}
	</div>
);
