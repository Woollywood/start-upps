'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';

export const Userbar: React.FC = () => {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return (
			<div className='flex items-center gap-4'>
				<Skeleton className='h-6 w-24 bg-primary' />
				<Skeleton className='h-10 w-10 rounded-full bg-primary' />
			</div>
		);
	}

	return (
		<div className='flex items-center gap-5 text-black'>
			{session && session.user && (
				<>
					<Link href='/start-up/create'>
						<span>Create</span>
					</Link>
					<form action='http://localhost:3000/api/auth/signout'>
						<button>Logout</button>
					</form>
					<Link href={`/user/${session.user?.id}`}>
						<span>{session.user.name}</span>
					</Link>
				</>
			)}
		</div>
	);
};
