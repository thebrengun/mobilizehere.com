import React from 'react'
import TransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import Link from 'react-router/lib/Link'
import Noscript from '../Noscript'

import Paginate from '../Paginate'
import PlayerBtn from '../Player/PlayerBtn'

import styles from '../../css/lz-grid.scss'
import animations from '../../css/lz-grid-animations.scss'

import SoundCloudEmbed from '../SoundCloudEmbed'
import closeDrawerImg from '../../assets/images/template/nav-close.jpg'

import linkIconSm from '../../assets/md-icons/ic_link_black_24dp_1x.png'
import linkIconLg from '../../assets/md-icons/ic_link_black_24dp_2x.png'

class PodcastPage extends React.Component {

	constructor() {
		super();
	}

	render() {
		const props = this.props;
		const { itemIsActive, itemsPerPage, makePath, page, pageData, PaginateNav, search} = props;
		const play = this.props.activeItem;
		return (
			<div>
				<MakeGrid wrapperClassName="lz-grid-with-drawer-mobile" columnWrap={2} play={play} {...this.props} key="mobile" />
				<MakeGrid wrapperClassName="lz-grid-with-drawer-desktop" columnWrap={4} play={play} {...this.props} key="desktop" />
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
		const { columnWrap, itemIsActive, makePath, page, pageData, play, player, wrapperClassName, openDrawer, closeDrawer, key } = this.props;
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
					({trackId, image, title, permalink}, i) => 
						trackId || image || title ? 
							<div 
								className="lz-col" 
								key={'podcast' + i} 
								style={{order: (i + 1) % columnWrap === 0 ? order++ : order}}
							>
								<img 
									alt={`Cover Art for ${title}`}
									src={image} 
									className={[
										'img-responsive', 
										play === i ? 
											'selected' : ''
									].join(' ')} 
									onClick={play === i ? closeDrawer : (e) => openDrawer(i)}
								/>
								<Noscript>
									<a href={`/${permalink}`} className="no-script-tile-link"></a>
								</Noscript>
							</div> : 
							<div 
								className="lz-col filler" 
								key={'podcast' + i} 
								style={{order: (i + 1) % columnWrap === 0 ? order++ : order}}
							>
							</div>
				)}
				{itemIsActive(play) ? 
					<div className="lz-drawer" style={{order: Math.floor(play / columnWrap)}} key={'drawer-' + key}>
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
								<span className="close-drawer" onClick={closeDrawer}>
									<img src={closeDrawerImg} alt="Close Podcast Details" />
								</span>
								<div>
									<h4>
										<Link to={`/${pageData[play].permalink}`}>
											{pageData[play].title}
										</Link>
									</h4>
									<div>
										<div dangerouslySetInnerHTML={{__html: pageData[play].__content}} />
										<PlayerBtn episode={pageData[play]} />
									</div>
								</div>
							</div>
						</div>
					</div> : ''
				}
			</TransitionGroup>
		);
	}
}

const mapStateToProps = ({drawer}) => ({
	activeItem: drawer.activeDrawerOnPage
});

const mapDispatchToProps = (dispatch) => ({
	openDrawer: (index) => dispatch({type: 'OPEN_DRAWER', index}),
	closeDrawer: () => dispatch({type: 'CLOSE_DRAWER'})
});

export default connect(mapStateToProps, mapDispatchToProps)(PodcastPage)