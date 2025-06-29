'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Board } from '@/components/molecules';
import { BoardType, PositionType } from '@/types';
import { hasShotHit } from '@/utils/hasShotHit';
import { updateShipsAfterHit } from '@/utils/updateShipsAfterHit';
import { alphanumericIndexToNumber } from '@/utils/convertIndex';

export const Game = ({
	boardSize,
	ships: boardShips,
}: {
	boardSize: BoardType['size'];
	ships: BoardType['ships'];
}) => {
	const router = useRouter();

	// todo: consider using a Redux for better state management when the game grows
	const [ships, setShips] = useState<BoardType['ships']>(boardShips);
	const [shots, setShots] = useState<BoardType['shots']>([]);
	const [input, setInput] = useState<string>('');

	const handleShot = (position: PositionType) => {
		const isAlreadyShot = shots?.find(
			(s) => s.position.column === position.column && s.position.row === position.row,
		);

		// todo: let the player know that the field has already been shot at
		if (isAlreadyShot) {
			// eslint-disable-next-line no-console
			console.log(`Field ${position.column}, ${position.row} has already been shot at.`);
			return;
		}

		const isHit = hasShotHit({ position, ships });
		setShots((prevShots) => [...(prevShots || []), { status: isHit ? 'hit' : 'miss', position }]);
	};

	const resetGame = (newShips: BoardType['ships']) => {
		setShips(newShips);
		setShots([]);
	};

	// Reset state when ships change
	useEffect(() => {
		resetGame(boardShips);
	}, [boardShips]);

	// Update ships after each shot to check if any ship is sunk
	useEffect(() => {
		setShips(updateShipsAfterHit({ ships, shots }));
	}, [shots]); // eslint-disable-line react-hooks/exhaustive-deps -- we dont want `ships` as the board is reset on ships change

	return (
		<>
			<Board
				style={{ width: '60vh', maxWidth: '100%', minWidth: 300 }}
				size={boardSize}
				// Hide ships until sunk
				ships={ships.filter((ship) => ship.isSunk)}
				shots={shots}
				onFieldClick={(position) => {
					handleShot(position);
				}}
			/>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				{/* todo: decode to `PositionType` and fire shot on submit */}
				<input
					type="text"
					value={input}
					onChange={(e) => {
						// Clean-up input value
						const value = e.target.value.trim();

						setInput(value);

						if (!value) {
							return;
						}

						const position: PositionType = {
							column: alphanumericIndexToNumber(value.toLowerCase()),
							row: 0,
						};

						// eslint-disable-next-line no-console
						console.log(position);
					}}
					placeholder="e.g. E3"
				/>
				<button type="submit">Hit!</button>
				&nbsp;&nbsp;&nbsp;
				<button
					type="button"
					onClick={() => {
						router.refresh();
					}}
				>
					New game
				</button>
			</form>
		</>
	);
};
