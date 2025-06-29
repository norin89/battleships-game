'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Board } from '@/components/molecules';
import { BoardType, PositionType } from '@/types';
import { hasShotHit } from '@/utils/hasShotHit';
import { updateShipsAfterHit } from '@/utils/updateShipsAfterHit';
import { alphanumericIndexToNumber } from '@/utils/convertIndex';
import { checkAllShipsSunk } from '@/utils/checkAllShipsSunk';

const NOTIFICATIONS_TIMER = 2500; // 2.5 seconds

export const Game = ({
	boardSize,
	ships: boardShips,
}: {
	boardSize: BoardType['size'];
	ships: BoardType['ships'];
}) => {
	const router = useRouter();

	// todo: use Redux or other tool for better state management
	const [ships, setShips] = useState<BoardType['ships']>(boardShips);
	const [shots, setShots] = useState<BoardType['shots']>([]);
	const [input, setInput] = useState<string>('');
	const [notifications, setNotifications] = useState<BoardType['notifications'] | null>(null);
	const [lastInvalidShot, setLastInvalidShot] = useState<string>('');
	const [allShipsSunk, setAllShipsSunk] = useState<boolean>(false);

	const hasNotifications = (notifications || []).length > 0;
	const disabledInput = hasNotifications || allShipsSunk;

	const handleShot = (position: PositionType) => {
		const isAlreadyShot = shots?.find(
			(s) => s.position.column === position.column && s.position.row === position.row,
		);

		if (isAlreadyShot) {
			// eslint-disable-next-line no-console
			console.log(`Field ${position.column}, ${position.row} has already been shot at.`);
			return;
		}

		const isHit = hasShotHit({ position, ships });
		setShots((prevShots) => [...(prevShots || []), { status: isHit ? 'hit' : 'miss', position }]);
		setInput('');
	};

	const resetGame = (newShips: BoardType['ships']) => {
		setShips(newShips);
		setShots([]);
		setInput('');
		setNotifications([]);
	};

	const handlePositionError = (value: string) => {
		setLastInvalidShot(value);
		setInput('');
	};

	// Show notification after invalid shot and hide after certain time
	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;

		if (lastInvalidShot) {
			setNotifications((prevNotifications) => [
				...(prevNotifications || []),
				{
					message: (
						<>
							Invalid position! <strong>{lastInvalidShot}</strong>
							<br />
							<br />
							Use correct format, e.g. <strong>F7</strong>.
						</>
					),
					status: 'error',
				},
			]);

			timer = setTimeout(() => {
				setLastInvalidShot('');
				setNotifications([]);
			}, NOTIFICATIONS_TIMER);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [lastInvalidShot]);

	// Reset state when ships change
	useEffect(() => {
		resetGame(boardShips);
	}, [boardShips]);

	// todo: consider optimization - both below useEffects could be ran only after a hit

	// Update ships after each shot to check if any ship is sunk
	useEffect(() => {
		setShips(updateShipsAfterHit({ ships, shots }));
	}, [shots]); // eslint-disable-line react-hooks/exhaustive-deps -- we dont want `ships` as the board is reset on ships change

	// Check if all ships are sunk after ships update
	useEffect(() => {
		setAllShipsSunk(checkAllShipsSunk(ships));
	}, [ships]);

	return (
		<>
			<Board
				style={{
					width: '60vh',
					maxWidth: '100%',
					minWidth: 280,
				}}
				size={boardSize}
				// Hide ships until sunk
				// todo: ship positions can be preview in DevTools, consider hiding them completely e.g. with encryption
				ships={ships.filter((ship) => ship.isSunk)}
				shots={shots}
				notifications={
					allShipsSunk
						? [
								{
									message: (
										<>
											<strong>Congratulations!</strong> All ships are sunk!
											<br />
											<br />
											You can restart the game.
										</>
									),
									status: 'success',
								},
							]
						: notifications || []
				}
				onFieldClick={(position) => {
					handleShot(position);
				}}
			/>
			<form
				onSubmit={(e) => {
					e.preventDefault();

					const firstNumberIndex = input.search(/[0-9]/);
					const inputColumn = input.slice(0, firstNumberIndex).toLowerCase();
					const inputRow = input.slice(firstNumberIndex);

					if (!inputColumn || !inputRow || !/^[0-9]+$/.test(inputRow)) {
						handlePositionError(input);
						return;
					}

					const position: PositionType = {
						column: alphanumericIndexToNumber(inputColumn) + 1, // +1 as first column is header
						row: parseInt(inputRow),
					};

					if (
						isNaN(position.column) ||
						isNaN(position.row) ||
						position.column < 1 ||
						position.row < 1 ||
						position.column > boardSize ||
						position.row > boardSize
					) {
						handlePositionError(input);
						return;
					}

					handleShot(position);
				}}
			>
				<input
					type="text"
					value={input}
					onChange={(e) => {
						// Clean-up input value
						const value = e.target.value.trim();
						setInput(value);
					}}
					readOnly={disabledInput}
					placeholder="e.g. E3"
				/>
				<button type="submit" disabled={disabledInput}>
					Hit!
				</button>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<button
					type="button"
					onClick={() => {
						router.refresh();
					}}
				>
					Restart game
				</button>
			</form>
		</>
	);
};
