import { Button } from '@/components/ui/button';
import { NextPage } from 'next';
import Link from 'next/link';

const NotFound: NextPage = () => {
	return (
		<div className='flex h-[calc(100svh-var(--navbar-height))] flex-col items-center justify-center gap-6'>
			<h2 className='no-result'>Not found any user</h2>
			<Link href='/'>
				<Button className='text-white'>Back to Start ups</Button>
			</Link>
		</div>
	);
};

export default NotFound;
