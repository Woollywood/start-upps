import { Button } from '@/components/ui/button';
import { NextPage } from 'next';
import Link from 'next/link';

const NotFound: NextPage = () => {
	return (
		<div>
			<h2>Not found startup</h2>
			<Link href='/'>
				<Button>Back to Start ups</Button>
			</Link>
		</div>
	);
};

export default NotFound;
