'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { LogOut, Plus, User } from 'lucide-react';

export const Userbar: React.FC = () => {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return (
			<div className='flex items-center gap-1'>
				<Skeleton className='h-9 w-20 bg-primary' />
				<Skeleton className='h-9 w-20 bg-primary' />
				<Skeleton className='h-9 w-20 bg-primary' />
			</div>
		);
	}

	return (
		<div className='flex items-center gap-1 text-white'>
			{session && session.user && (
				<>
					<Link href='/start-up/create' className='userbar-item--desktop'>
						<Button>Create</Button>
					</Link>
					<form action='http://localhost:3000/api/auth/signout' className='userbar-item--desktop'>
						<Button>Logout</Button>
					</form>
					<Link href={`/user/${session.user?.id}`} className='userbar-item--desktop'>
						<Button>Profile</Button>
					</Link>

					<Link href='/start-up/create' className='flex sm:hidden'>
						<Button size='icon'>
							<Plus className='!size-5' />
						</Button>
					</Link>
					<form action='http://localhost:3000/api/auth/signout' className='flex sm:hidden'>
						<Button size='icon'>
							<LogOut className='!size-5' />
						</Button>
					</form>
					<Link href={`/user/${session.user?.id}`} className='flex sm:hidden'>
						<Button size='icon'>
							<User className='!size-5' />
						</Button>
					</Link>
				</>
			)}
		</div>
	);
};
