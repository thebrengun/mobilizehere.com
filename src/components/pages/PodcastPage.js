import React from 'react'
import TransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import Link from 'react-router/lib/Link'
import Noscript from '../Noscript'

import Paginate from '../Paginate'
import PlayerBtn from '../Player/PlayerBtn'

import styles from '../../css/lz-grid.scss'
import animations from '../../css/lz-grid-animations.scss'

import closeDrawerImg from '../../assets/images/template/nav-close.jpg'

import linkIconSm from '../../assets/md-icons/ic_link_black_24dp_1x.png'
import linkIconLg from '../../assets/md-icons/ic_link_black_24dp_2x.png'

class PodcastPage extends React.Component {

	constructor() {
		super();
	}

	componentWillReceiveProps(nextProps) {
		const { page:currentPage, closeDrawer } = this.props;
		const { page:nextPage } = nextProps;
		if(currentPage !== nextPage) {
			closeDrawer();
		}
	}

	render() {
		const props = this.props;
		const { itemIsActive, itemsPerPage, makePath, page, pageData, PaginateNav, search} = props;
		const play = this.props.activeItem;
		return (
			<div>
				<div className="lz-grid-with-drawer-mobile">
					<MakeGrid columnWrap={2} play={play} {...this.props} />
				</div>
				<div className="lz-grid-with-drawer-desktop">
					<MakeGrid columnWrap={4} play={play} {...this.props} />
				</div>
				<PaginateNav page={page} />
			</div>
		);
	}
}

class MakeGrid extends React.Component {
	constructor() {
		super();
	}

	componentWillUnmount() {
		clearTimeout(this.scroll);
	}

	componentDidUpdate() {
		if(this.props.play > -1) {
			let { top } = this.selectedCover.getBoundingClientRect();
			const { top: drawerTop, bottom: drawerBottom } = this.drawer.getBoundingClientRect();
			if(drawerBottom > window.innerHeight || top < 0) {
				const body = window.document.body;
				const ms = 500;
				top -= 15;
				top = Math.min(body.clientHeight - window.innerHeight, window.pageYOffset + top) - window.pageYOffset;
				body.style['transition'] = 'transform';
        		body.style['transition-duration'] = ms + 'ms';
        		body.style['transform'] = `translateY(${top * -1}px)`;
        		this.scroll = setTimeout(
        			() => {
        				body.style['transition'] = '';
        				body.style['transform'] = '';
        				window.scrollBy(window.pageXOffset, top);
        			}, 
        		ms);
			}
		}
	}

	render() {
		const { columnWrap, itemIsActive, makePath, page, pageData, play, player, wrapperClassName, openDrawer, closeDrawer } = this.props;
		const playRow = Math.floor(play / columnWrap);
		const playCol = (play + 1) - (playRow * columnWrap);
		const emptyCells = new Array(Math.max((Math.ceil(pageData.length / columnWrap) * columnWrap) - pageData.length, 0)).fill({});
		let order = 0;
		return (
			<TransitionGroup 
				transitionName="drawer"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={300}
				className="lz-grid lz-grid-wrap"
			>
				{pageData.concat(emptyCells).map(
					({trackId, image, title, permalink}, i) => 
						trackId || image || title ? 
							<div 
								className="lz-col" 
								key={'podcast' + i} 
								style={{order: (i + 1) % columnWrap === 0 ? order++ : order}}
								ref={ref => {
									if(play === i) {
										this.selectedCover = ref;
									}
								}}
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
					<div className="lz-drawer" style={{order: Math.floor(play / columnWrap)}} ref={ref => {this.drawer = ref;}}>
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