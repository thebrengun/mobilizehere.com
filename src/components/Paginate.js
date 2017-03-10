import React from 'react'
import { Link } from 'react-router'
import paginationStyles from '../css/pagination.scss'

function Paginate(data, location, itemsPerPage = 8) {
	const search = searchToObject(location);
	const maxPage = Math.ceil(data.length / itemsPerPage);
	const page = search.page ? Math.max(Math.min(parseInt(search.page, 10), maxPage), 1) : 1;
	const base = location.pathname;
	const pageData = getPageData(data, itemsPerPage)(page);

	return {
		basePath: base,
		itemIsActive: (itemIndex) => (itemIndex > -1 && itemIndex <= pageData.length && page <= maxPage),
		itemIsFirst: (itemIndex) => page === 1 && itemIndex === 0,
		itemIsLast: (itemIndex) => page === maxPage && itemIndex === pageData.length - 1,
		itemsPerPage,
		pageData, 
		maxPage,
		makePath: (newSearch) => `${base}?${Object.keys(newSearch).map(queryKey => `${queryKey}=${newSearch[queryKey]}`).join('&')}`,
		PaginateNav: PaginateNav({maxPage, base}),
		search,
		page
	};

	function searchToObject(location) {
		return location ? 
			location.search.replace('?', '').split('&').map(
				pairs => pairs.split('=')
			).reduce(
				(obj, [key, val]) => 
					({
						...obj, 
						[key]: val
					}), 
				{}
			) : {};
	}

	function getPageData(data, itemsPerPage) {
		return function(page) {
			const startItem = (page - 1) * itemsPerPage;
			const endItem = startItem + itemsPerPage;
			const truncatedData = data.slice(startItem, endItem);
			return truncatedData;
		};
	}

	function PaginateNav({maxPage, base}) {
		return maxPage === 1 ? 
			() => null : 
			function({page}) {
				return (
					<div className="pagination-container">
						{page !== 1 ? 
							<Link to={`${base}?page=1`} activeClassName="activePage">&lt;&lt;</Link> : 
							<span>&lt;&lt;</span>
						}
						{new Array(maxPage).fill('').map(
							(s, i) => 
								<Link to={`${base}?page=${i + 1}`} activeClassName="activePage" key={'page' + i}>
									{i + 1}
								</Link>
						)}
						{page !== maxPage ? 
							<Link to={`${base}?page=${maxPage}`} activeClassName="activePage">&gt;&gt;</Link> : 
							<span>&gt;&gt;</span>
						}
					</div>
				);
			};
	}
}

export default Paginate