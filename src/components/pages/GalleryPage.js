import React from 'react'
import { Link } from 'react-router'
import GalleryModal from './GalleryModal'

import styles from '../../css/lz-grid.scss'

function GalleryPage(props) {

	const { itemIsActive, itemsPerPage, makePath, page, pageData, PaginateNav, search} = props;

	const view = search.view ? Math.min(parseInt(search.view, 10), itemsPerPage) : -1;

	return (
		<div>
			{itemIsActive(view) ? <GalleryModal {...props} view={view} /> : '' }
			<div className="lz-grid lz-grid-wrap">
				{pageData.map(
					({img}, i) => 
						<div 
							className="lz-col" 
							key={'gallery-img-' + i} 
						>
							<Link to={makePath({page, view: i})}>
								<img src={img} className="img-responsive" />
							</Link>
						</div>
				)}
			</div>
			<PaginateNav page={page} />
		</div>
	);
}

export default GalleryPage