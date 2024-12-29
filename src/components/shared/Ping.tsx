import { NextPage } from 'next';

const Ping: NextPage = () => {
	return (
		<div className='relative'>
			<div className='absolute -left-4 top-1'>
				<span className='flex size-[0.6875rem]'>
					<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75'></span>
					<span className='relative inline-flex size-[0.6875rem] rounded-full bg-primary'></span>
				</span>
			</div>
		</div>
	);
};

export default Ping;
