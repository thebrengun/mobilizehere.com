import React from 'react'
import Link from 'react-router/lib/Link'

function GalleryModal({img, itemIsFirst, itemIsLast, itemsPerPage, makePath, page, pageData, view}) {
	return (
		<Link to={makePath({page})}>
			<div className="lz-modal">
				<div className="lz-grid">
					<div className="lz-modal-col-side">
						{!itemIsFirst(view) ? 
							<Link 
								to={
									(view - 1 < 0) ? 
										makePath({page: parseInt(page, 10) - 1, view: itemsPerPage - 1}) : 
										makePath({page, view: view - 1})
								}
							>
								&lt;&lt;
							</Link> : 
							<span className="a-disabled">&lt;&lt;</span>
						}
					</div>
					<div className="lz-modal-col-center">
						<img 
							src={pageData[view].full} 
							className="img-responsive lz-modal-img" 
						/>
					</div>
					<div className="lz-modal-col-side">
						{!itemIsLast(view) ? 
							<Link 
								to={
									(view + 1 === pageData.length) ? 
										makePath({page: parseInt(page, 10) + 1, view: 0}) : 
										makePath({page, view: view + 1})
								}
							>
								&gt;&gt;
							</Link> : 
							<span className="a-disabled">&gt;&gt;</span>
						}
					</div>
				</div>
			</div>
		</Link>
	);
}

export default GalleryModal