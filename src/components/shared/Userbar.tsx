'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { LogOut, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export const Userbar: React.FC = () => {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return (
			<div className='flex items-center gap-1'>
				<Skeleton className='hidden h-10 w-20 bg-primary sm:block' />
				<Skeleton className='hidden h-10 w-20 bg-primary sm:block' />
				<Skeleton className='hidden h-10 w-10 rounded-full bg-primary sm:block' />

				<Skeleton className='block h-10 w-10 bg-primary sm:hidden' />
				<Skeleton className='block h-10 w-10 bg-primary sm:hidden' />
				<Skeleton className='block h-10 w-10 rounded-full bg-primary sm:hidden' />
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

					<Link href={`/user/${session.user?.id}`}>
						<Avatar>
							<AvatarImage src={session.user.image || ''} alt={session.user.name || 'profile avatar'} />
							<AvatarFallback>{session.user.name?.[0].toUpperCase()}</AvatarFallback>
						</Avatar>
					</Link>
				</>
			)}
		</div>
	);
};
