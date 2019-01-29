import '../css/lz-page-btns.scss';
import React from 'react';
import { Link } from 'gatsby';

class PageBtns extends React.PureComponent {
	render() {
		const { pageNumber, pageCount, pathPrefix } = this.props;
		const start = Math.max(pageNumber - 5, 1);
		const end = Math.min(pageCount + 1, start + 11);
		const pageBtnCount = end - start;
		const pageBtns = new Array(pageBtnCount).fill('').map((s, i) => start + i);

		return (
			<div className="lz-pagination-btns">
				{pageBtns[0] !== 1 && <Link to={pathPrefix}>1</Link>}
				{pageBtns[0] !== 1 && <span>{parseInt(pageBtns[0], 10) !== 2 && '...'}</span>}
				{pageBtns.map(
					(n, i) => 
						<Link 
							to={`${pathPrefix}${n > 1 ? n : ''}`} 
							activeClassName="active" 
							key={`pagintated-btn-${i}`}
						>
							{n}
						</Link>
				)}
				{pageBtns[pageBtns.length - 1] !== pageCount && <span>{parseInt(pageBtns[pageBtns.length - 1], 10) !== pageCount - 1 && '...'}</span>}
				{pageBtns[pageBtns.length - 1] !== pageCount && <Link to={`${pathPrefix}${pageCount}`}>{pageCount}</Link>}
			</div>
		);
	}
}

PageBtns.defaultProps = {
	pageNumber: 1,
	pageCount: 1,
	pathPrefix: ''
};

export default PageBtns;