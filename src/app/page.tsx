import { Board } from '@/componenta/molecules';

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
				<Board style={{ width: '60vh', maxWidth: '100%', minWidth: 320 }} />
			</main>
		</>
	);
}
