'use client';

import { Board } from '@/components/molecules';
import { BoardType } from '@/types';

export const Game = ({
	boardSize,
	ships,
}: {
	boardSize: BoardType['size'];
	ships: BoardType['ships'];
}) => (
	<>
		<Board
			style={{ width: '60vh', maxWidth: '100%', minWidth: 320 }}
			size={boardSize}
			ships={ships}
		/>
		<form
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<input type="text" placeholder="e.g. E3" />
			<button type="submit">Hit!</button>
		</form>
	</>
);
