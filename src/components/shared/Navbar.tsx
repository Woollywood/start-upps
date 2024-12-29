import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

export const Navbar: NextPage = async () => {
	const session = await getServerSession();

	return (
		<header className='bg-foreground px-5 py-3 font-work-sans shadow-sm'>
			<nav className='flex items-center justify-between'>
				<Link href='/'>
					<Image src='/logo.svg' alt='logo' width={144} height={30} />
				</Link>
				<div className='flex items-center gap-5 text-black'>
					{session && session.user && (
						<>
							<Link href='/start-up/create'>
								<span>Create</span>
							</Link>
							<form action='http://localhost:3000/api/auth/signout'>
								<button>Logout</button>
							</form>
							{/* <Link href={`/user/${session?.id}`}>
								<span>{session.user.name}</span>
							</Link> */}
						</>
					)}
				</div>
			</nav>
		</header>
	);
};
