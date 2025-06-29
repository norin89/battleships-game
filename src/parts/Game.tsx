'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { BoardType, PositionType } from '@/types';
import { hasShotHit } from '@/utils/hasShotHit';
import { updateShipsAfterHit } from '@/utils/updateShipsAfterHit';
import { alphanumericIndexToNumber } from '@/utils/convertIndex';
import { checkAllShipsSunk } from '@/utils/checkAllShipsSunk';
import { isPositionValid } from '@/utils/isPositionValid';
import { Stats } from '@/parts/Stats';
import { Board } from '@/components/molecules';
import { Button, Input } from '@/components/atoms';
import { generateShipPositions, generateShipPositionsProps } from '@/utils/generateShipPositions';

const NOTIFICATIONS_TIMER = 2500; // 2.5 seconds

export const Game = ({
	boardSize,
	shipSizes,
}: {
	boardSize: BoardType['size'];
	shipSizes: generateShipPositionsProps['shipSizes'];
}) => {
	const router = useRouter();

	// todo: use Redux or other tool for better state management
	const [ships, setShips] = useState<BoardType['ships']>(generateShipPositions({ shipSizes }));
	const [shots, setShots] = useState<BoardType['shots']>([]);
	const [input, setInput] = useState<string>('');
	const [notifications, setNotifications] = useState<BoardType['notifications'] | null>(null);
	const [lastInvalidShot, setLastInvalidShot] = useState<string>('');
	const [allShipsSunk, setAllShipsSunk] = useState<boolean>(false);

	const hasNotifications = (notifications || []).length > 0;
	const disabledInput = hasNotifications || allShipsSunk;

	const handleShot = (position: PositionType) => {
		const isAlreadyShot = shots?.find((s) => s.position.column === position.column && s.position.row === position.row);

		if (isAlreadyShot) {
			// eslint-disable-next-line no-console
			console.log(`Field ${position.column}, ${position.row} has already been shot at.`);
			return;
		}

		const isHit = hasShotHit({ position, ships });
		setShots((prevShots) => [...(prevShots || []), { status: isHit ? 'hit' : 'miss', position }]);
		setInput('');
	};

	const resetGame = (newShipSizes: generateShipPositionsProps['shipSizes']) => {
		setShips(generateShipPositions({ shipSizes: newShipSizes }));
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
					status: 'warning',
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
		resetGame(shipSizes);
	}, [shipSizes]);

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
			<Stats ships={ships} shots={shots} />
			<Board
				style={{
					width: '50vh',
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
											<strong>Congratulations,</strong>
											<br />
											all ships are sunk!
											<br />
											<br />
											Total shots: <strong>{(shots || []).length}</strong>
											<br />
											<br />
											<Button
												type="button"
												onClick={() => {
													router.refresh();
												}}
											>
												Play again!
											</Button>
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

					// todo: separate below logic to an utility function
					const firstNumberIndex = input.search(/[0-9]/);
					const inputColumn = input.slice(0, firstNumberIndex).toLowerCase();
					const inputRow = input.slice(firstNumberIndex);

					// TODO: we could make sure input is valid with regex `pattern` before submitting
					if (!inputColumn || !inputRow || !/^[0-9]+$/.test(inputRow)) {
						handlePositionError(input);
						return;
					}

					const position: PositionType = {
						column: alphanumericIndexToNumber(inputColumn) + 1, // +1 as first column is header
						row: parseInt(inputRow),
					};

					if (!isPositionValid(position)) {
						handlePositionError(input);
						return;
					}

					handleShot(position);
				}}
			>
				<Input
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
				<Button type="submit" disabled={disabledInput} variant="primary">
					Hit!
				</Button>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<Button
					type="button"
					onClick={() => {
						router.refresh();
					}}
				>
					Restart game
				</Button>
			</form>
		</>
	);
};
