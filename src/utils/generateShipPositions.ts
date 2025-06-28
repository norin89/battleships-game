import settings from '@/settings.json';
import { getRandomInteger } from '@/utils';
import { BoardProps } from '@/componenta/molecules';
import { ShipProps } from '@/componenta/atoms';

type generateShipPositionsProps = {
	shipSizes: Array<ShipProps['size']>;
};

export const generateShipPositions = ({
	shipSizes,
}: generateShipPositionsProps): BoardProps['ships'] =>
	shipSizes.map((size) => {
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
	});
