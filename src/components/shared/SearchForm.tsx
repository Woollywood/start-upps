import React from 'react';
import Form from 'next/form';
import { SearchFormReset } from './SearchFormReset';
import { Search } from 'lucide-react';

interface Props {
	query?: string;
}

export const SearchForm: React.FC<Props> = async ({ query }) => {
	return (
		<Form action='/' className='search-form'>
			<input name='query' defaultValue={query} className='search-input' placeholder='Search Startups' />
			<div className='flex gap-2'>
				{query && <SearchFormReset />}
				<button className='search-btn text-white'>
					<Search className='size-5' />
				</button>
			</div>
		</Form>
	);
};
