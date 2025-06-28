import settings from '@/settings.json';

import { getRandomInteger } from '@/utils/getRandomInteger';
import { BoardProps } from '@/components/molecules';
import { ShipProps } from '@/components/atoms';
import { BoardType, ShipType } from '@/types';

type generateShipPositionsProps = {
	shipSizes: Array<ShipProps['size']>;
};

const findShipPosition = ({
	size,
	ships,
}: {
	size: ShipType['size'];
	ships: BoardType['ships'];
}): BoardType['ships'][number] => {
	const orientation = ['horizontal', 'vertical'][
		getRandomInteger(0, 1)
	] as ShipProps['orientation'];

	const maxStartPosition = settings['board-size'] - size;
	const positionInLength = getRandomInteger(1, maxStartPosition);
	const positionInWidth = getRandomInteger(1, settings['board-size']);

	return {
		size,
		orientation,
		position:
			orientation === 'horizontal'
				? {
						row: positionInWidth,
						column: positionInLength,
					}
				: {
						row: positionInLength,
						column: positionInWidth,
					},
	};
};

export const generateShipPositions = ({
	shipSizes,
}: generateShipPositionsProps): BoardProps['ships'] =>
	shipSizes.reduce((result: BoardProps['ships'], size) => {
		return [...result, findShipPosition({ size, ships: result })];
	}, []);
