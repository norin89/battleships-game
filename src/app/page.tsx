import { Game } from '@/parts/Game';
import settings from '@/settings.json';
import { generateShipPositions } from '@/utils/generateShipPositions';

const SHIP_SIZES = Object.entries(settings['ships-on-board'])
	.reduce((result: number[], [size, count]) => [...result, ...Array.from(Array(count), () => parseInt(size))], []) // Sort from largest to smallest for easier placement
	.sort((a, b) => b - a);

const BOARD_SIZE = settings['board-size'];

export default function Home() {
	return (
		<>
			<main
				style={{
					display: 'flex',
					boxSizing: 'border-box',
					minHeight: '100svh',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 20,
					paddingBlock: 40,
					paddingInline: 20,
				}}
			>
				<h1>Welcome to the Battleships Game!</h1>
				<p>
					Input your shots in the format <code>A1</code>, <code>B2</code>, etc. or click on the board to shoot.
				</p>
				<br />
				<Game boardSize={BOARD_SIZE} ships={generateShipPositions({ shipSizes: SHIP_SIZES })} />
				<br />
				<p>
					Created by Marcin Gościcki &lt;
					<a href="mailot:marcin@goscicki.eu">marcin@goscicki.eu</a>
					&gt; (<a href="https://goscicki.eu">goscicki.eu</a>)
				</p>
			</main>
		</>
	);
}
