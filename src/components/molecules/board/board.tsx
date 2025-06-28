import { Fragment, HTMLAttributes } from 'react';
import cx from 'clsx';

import s from './board.module.scss';
import { numberIndexToAlphanumeric } from '@/utils/numberIndexToAlphanumeric';
import { Ship, Shot } from '@/components/atoms';
import { BoardType } from '@/types';

export type BoardProps = BoardType & HTMLAttributes<HTMLDivElement>;

/** Battleships game board */
export const Board = ({ size, ships, shots, className, ...props }: BoardProps) => {
	const renderedBoardSize = size + 1; // +1 for the row and column header

	return (
		<div className={cx(s['board'], className)} {...props}>
			<div className={s['board__canvas']}>
				<div className={cx(s['board__layer'], s['board__layer--base'])}>
					{Array.from(Array(renderedBoardSize), (_row, rowIdx) => (
						<Fragment key={rowIdx}>
							{Array.from(Array(renderedBoardSize), (_column, columnIdx) => {
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
										{isHeader ? (rowIdx === 0 ? columnLetter : rowIdx) : ''}
									</div>
								);
							})}
						</Fragment>
					))}
				</div>
				<div className={s['board__layer']}>
					{ships.map((ship, idx) => {
						const { position, ...rest } = ship;
						return (
							<Ship
								className={s['board__ship']}
								{...rest}
								style={{
									// +1 because of headers
									gridColumnStart: position.column + 1,
									gridColumnEnd:
										ship.orientation === 'horizontal' ? ship.size + position.column + 1 : undefined,
									gridRowStart: ship.position.row + 1,
									gridRowEnd:
										ship.orientation === 'vertical' ? ship.size + ship.position.row + 1 : undefined,
								}}
								key={idx}
							/>
						);
					})}
				</div>
				{shots && (
					<div className={s['board__layer']}>
						{shots?.map((shot, idx) => {
							const { position, ...rest } = shot;
							return (
								<Shot
									className={s['board__shot']}
									{...rest}
									style={{
										// +1 because of headers
										gridColumnStart: position.column + 1,
										gridRowStart: position.row + 1,
									}}
									key={idx}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};
