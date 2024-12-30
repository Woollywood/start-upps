import { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { Navbar } from '@/components/shared/Navbar';
import { NextAuthProvider } from '@/providers/NextAuthProvider';

import './globals.css';
import 'easymde/dist/easymde.min.css';

const workSans = Work_Sans({
	subsets: ['latin'],
	variable: '--font-work-sans',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Home',
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
				<NextAuthProvider>
					<Navbar />
					{children}
				</NextAuthProvider>
			</body>
		</html>
	);
}
