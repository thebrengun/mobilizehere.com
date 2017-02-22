import React from 'react'
import { Link } from 'react-router'

import styles from '../../css/lz-grid.scss'

function ResourcesPage(props) {

	const { itemIsActive, itemsPerPage, makePath, page, pageData, PaginateNav, search} = props;

	return (
		<div>
			<div className="lz-grid lz-grid-wrap">
				{pageData.map(
					({url, img}, i) => 
						<div 
							className="lz-col" 
							key={'resource' + i} 
						>
							<a href={url} target="_blank">
								<img src={img} className="img-responsive" alt={url} />
							</a>
						</div>
				)}
			</div>
			<PaginateNav page={page} />
		</div>
	);
}

export default ResourcesPage