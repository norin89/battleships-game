import { Board } from '@/componenta/molecules';
import { generateShipPositions } from '@/utils/generateShipPositions';

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
					ships={generateShipPositions({ shipSizes: [5, 4, 4] })}
				/>
			</main>
		</>
	);
}
