import { NextPage } from 'next';
import { redirect } from 'next/navigation';

const Page: NextPage = () => {
	return redirect('/');
};

export default Page;
