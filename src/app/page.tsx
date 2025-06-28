import { Game } from '@/templates/Game';
import settings from '@/settings.json';
import { generateShipPositions } from '@/utils/generateShipPositions';

const SHIP_SIZES = Object.entries(settings['ships-on-board'])
	.reduce(
		(result: number[], [size, count]) => [
			...result,
			...Array.from(Array(count), () => parseInt(size)),
		],
		[],
	) // Sort from largest to smallest for easier placement
	.sort((a, b) => b - a);

const BOARD_SIZE = settings['board-size'];

export default function Home() {
	return (
		<>
			<main
				style={{
					display: 'flex',
					minHeight: '100svh',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '2em',
				}}
			>
				<h1>Welcome to the Battleships Game!</h1>
				<Game boardSize={BOARD_SIZE} ships={generateShipPositions({ shipSizes: SHIP_SIZES })} />
			</main>
		</>
	);
}
