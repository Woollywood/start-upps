import { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { Navbar } from '@/components/shared/Navbar';

import './globals.css';
import 'easymde/dist/easymde.min.css';

const workSans = Work_Sans({
	subsets: ['latin'],
	variable: '--font-work-sans',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Start Upps',
	description: 'Pitch, Vote and Grow',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={workSans.variable}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
