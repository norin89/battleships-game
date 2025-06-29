import { BoardType } from '@/types';
import { getShipFieldPositions } from '@/utils/getShipFieldPositions';

// Check if ships are sunk after a hit and update their status
export const updateShipsAfterHit = ({
	ships,
	shots,
}: {
	ships: BoardType['ships'];
	shots: BoardType['shots'];
}): BoardType['ships'] =>
	ships.reduce((result: BoardType['ships'], ship) => {
		const shipFieldPositions = getShipFieldPositions({ ship });
		return [
			...result,
			{
				...ship,
				isSunk:
					ship.isSunk ||
					shipFieldPositions.every((shipPosition) =>
						shots?.some(
							(shot) =>
								shot.position.row === shipPosition.row &&
								shot.position.column === shipPosition.column,
						),
					),
			},
		];
	}, []);
