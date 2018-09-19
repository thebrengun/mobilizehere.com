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

const breakSmall = 750;

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
				<MakeGrid play={play} {...this.props} />
				<PaginateNav page={page} />
			</div>
		);
	}
}

class MakeGrid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			row: this.calculateRow(props.play),
			col: this.calculateCol(props.play)
		};
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.play !== this.props.play && nextProps.play > -1) {
			this.setState({
				row: this.calculateRow(nextProps.play),
				col: this.calculateCol(nextProps.play)
			});
		}
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
        				body.style['transition-duration'] = '0ms';
        				body.style['transform'] = '';
        				window.scrollBy(window.pageXOffset, top);
        			}, 
        		ms);
			}
		}
	}

	calculateRow = (play) => {
		if(play > -1) {
			const columns = window.innerWidth >= breakSmall ? 4 : 2;
			return Math.ceil((play + 1) / columns);
		} else {
			return 1;
		}
	};

	calculateCol = (play) => {
		if(play > -1) {
			const columns = window.innerWidth >= breakSmall ? 4 : 2;
			const col = (play + 1) % columns;
			return col === 0 ? columns - 1 : col - 1;
		} else {
			return 1;
		}
	};

	render() {
		const { itemIsActive, makePath, page, pageData, play, player, wrapperClassName, openDrawer, closeDrawer } = this.props;
		const { row, col } = this.state;
		let order = 0;

		return (
			<div className="lz-grid lz-grid-wrap">
				{pageData.map(
					({trackId, image, title, permalink}, i) => 
						<div 
							className="lz-col" 
							key={'podcast' + i} 
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
						</div>
				)}
				<TransitionGroup 
					transitionName="drawer"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300} 
					className={`lz-drawer-wrapper after-row-${row}`} 
				>
					{itemIsActive(play) ? 
						<div 
							className="lz-drawer" 
							ref={ref => {this.drawer = ref;}}
						>
							<div className="lz-grid pinch-row">
								<div className={`lz-col after-col-${col}`}>
									<div className="pinch-arrow"></div>
								</div>							
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
											<p>{pageData[play].description}</p>											
											<PlayerBtn 
												episode={pageData[play]} 
												renderStatusText={
													({statusText}) => 
														<span className="podcast-display-btn-text">
															{statusText}
														</span>
												} 
												className="podcast-display-btn-color" 
											/>
										</div>
									</div>
								</div>
							</div>
						</div> : ''
					}
				</TransitionGroup>
			</div>
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