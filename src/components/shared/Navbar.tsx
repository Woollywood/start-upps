import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Userbar } from './Userbar';

export const Navbar: NextPage = () => {
	return (
		<header className='relative h-navbar-height font-work-sans'>
			<nav className='fixed left-0 top-0 z-10 flex h-navbar-height w-full items-center justify-between bg-white px-5 py-3 shadow-sm'>
				<Link href='/' className='flex-shrink-0'>
					<Image src='/logo.svg' alt='logo' width={144} height={30} />
				</Link>
				<Userbar />
			</nav>
		</header>
	);
};
