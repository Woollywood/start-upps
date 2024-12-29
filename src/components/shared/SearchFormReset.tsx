'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export const SearchFormReset: React.FC = () => {
	const pathname = usePathname();

	return (
		<button type='reset' onClick={(event) => event.currentTarget.form?.reset()}>
			<Link href={pathname} className='search-btn text-white'>
				<X className='size-5' />
			</Link>
		</button>
	);
};
