import { Board } from '@/components/molecules';
import { generateShipPositions } from '@/utils/generateShipPositions';
import settings from '@/settings.json';

const SHIP_SIZES = Object.entries(settings['ships-on-board']).reduce(
	(result: number[], [size, count]) => [
		...result,
		...Array.from(Array(count), () => parseInt(size)),
	],
	[],
);

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
				}}
			>
				<h1>Welcome to the Battleships Game!</h1>
				<Board
					style={{ width: '60vh', maxWidth: '100%', minWidth: 320 }}
					ships={generateShipPositions({ shipSizes: SHIP_SIZES })}
				/>
			</main>
		</>
	);
}
