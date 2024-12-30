import StartupForm from '@/components/shared/StartupForm';
import { NextPage } from 'next';

const Page: NextPage = () => {
	return (
		<>
			<section className='pink_container !min-h-[14.375rem]'>
				<h1 className='heading'>Submit Your Startup Pitch</h1>
			</section>
			<StartupForm />
		</>
	);
};

export default Page;
