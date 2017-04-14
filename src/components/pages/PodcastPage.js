import React from 'react'
import TransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import Link from 'react-router/lib/Link'

import Paginate from '../Paginate'

import styles from '../../css/lz-grid.scss'
import animations from '../../css/lz-grid-animations.scss'

import SoundCloudEmbed from '../SoundCloudEmbed'
import closeDrawer from '../../assets/images/template/nav-close.jpg'

class PodcastPage extends React.Component {

	constructor() {
		super();
	}

	render() {
		const props = this.props;
		const { itemIsActive, itemsPerPage, makePath, page, pageData, PaginateNav, search} = props;
		const play = search.play ? Math.min(parseInt(search.play, 10), pageData.length - 1) : -1;
		return (
			<div>
				<MakeGrid wrapperClassName="lz-grid-with-drawer-mobile" columnWrap={2} play={play} {...this.props} />
				<MakeGrid wrapperClassName="lz-grid-with-drawer-desktop" columnWrap={4} play={play} {...this.props} />
				<PaginateNav page={page} />
			</div>
		);
	}
}

class MakeGrid extends React.Component {
	constructor() {
		super();
	}

	render() {
		const {columnWrap, itemIsActive, makePath, page, pageData, play, wrapperClassName} = this.props;
		const playRow = Math.floor(play / columnWrap);
		const playCol = (play + 1) - (playRow * columnWrap);
		const emptyCells = new Array(Math.max((Math.ceil(pageData.length / columnWrap) * columnWrap) - pageData.length, 0)).fill({});
		let order = 0;
		return (
			<TransitionGroup 
				transitionName="drawer"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={300}
				className={`lz-grid lz-grid-wrap ${wrapperClassName}`}
			>
				{pageData.concat(emptyCells).map(
					({trackId, image, title}, i) => 
						trackId ? 
							<div 
								className="lz-col" 
								key={'podcast' + i} 
								style={{order: (i + 1) % columnWrap === 0 ? order++ : order}}
							>
								<Link to={makePath({page, play: i})}>
									<img 
										alt={`Cover Art for ${title}`}
										src={image} 
										className={[
											'img-responsive', 
											play === i ? 
												'selected' : ''
										].join(' ')}  
									/>
								</Link>
							</div> : 
							<div 
								className="lz-col filler" 
								key={'podcast' + i} 
								style={{order: (i + 1) % columnWrap === 0 ? order++ : order}}
							>
							</div>
				)}
				{itemIsActive(play) ? 
					<div className="lz-drawer" style={{order: Math.floor(play / columnWrap)}} key="drawer">
						<div className="pinch-row">
							<div className="lz-col" style={{order: playCol - 1}}>
								<div className="pinch-arrow"></div>
							</div>
							{new Array(columnWrap - 1).fill('').map(
								(empty, fillerIndex) => 
									<div 
										className="lz-col" 
										style={{
											order: fillerIndex
										}} 
										key={`pinch-arrow-empty-${fillerIndex}`}
									>
									</div>
							)}
						</div>
						<div className="inner-drawer">
							<div>
								<Link to={makePath({page, play: -1})} className="close-drawer">
									<img src={closeDrawer} alt="Close Podcast Details" />
								</Link>
								<h4>{pageData[play].title}</h4>
								<div>
									<div dangerouslySetInnerHTML={{__html: pageData[play].__content}} />
								</div>
							</div>
						</div>
					</div> : ''
				}
			</TransitionGroup>
		);
	}
}

export default PodcastPage