import React from 'react'
import TransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Paginate from '../Paginate'

import styles from '../../css/lz-grid.scss'
import animations from '../../css/lz-grid-animations.scss'

import SoundCloudEmbed from '../SoundCloudEmbed'

import podcastEmbed from '../../assets/images/podcast/podcast-embed-placeholder.jpg'
import img from '../../assets/images/about/mobilize-logo-big.jpg'

class PodcastPage extends React.Component {

	constructor() {
		super();
	}

	render() {
		const props = this.props;
		const { itemIsActive, itemsPerPage, makePath, page, pageData, PaginateNav, search} = props;
		const play = search.play ? Math.min(parseInt(search.play, 10), itemsPerPage) : -1;

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
		let order = 0;
		return (
			<TransitionGroup 
				transitionName="drawer"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={300}
				className={`lz-grid lz-grid-wrap ${wrapperClassName}`}
			>
				{pageData.map(
					({trackId}, i) => 
						<div 
							className="lz-col" 
							key={'podcast' + i} 
							style={{order: (i + 1) % columnWrap === 0 ? order++ : order}}
						>
							<Link to={makePath({page, play: i})}>
								<img src={img} className="img-responsive" />
							</Link>
						</div>
				)}
				{itemIsActive(play) ? 
					<div className="lz-drawer" style={{order: Math.floor(play / columnWrap)}} key="drawer">
						<SoundCloudEmbed trackId={pageData[play].trackId} />
					</div> : ''
				}
			</TransitionGroup>
		);
	}
}

export default PodcastPage