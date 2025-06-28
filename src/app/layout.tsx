import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Battleships Game',
	description: 'Battleships game built with Next.js and TypeScript',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body style={{ margin: 0, padding: 0 }}>{children}</body>
		</html>
	);
}
