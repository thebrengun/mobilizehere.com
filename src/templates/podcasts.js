import '../css/lz-grid.scss';
import '../css/lz-grid-animations.scss';
import React from 'react';
import TransitionGroup from 'react-addons-css-transition-group';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import ResponsiveGridOrder from '../components/ResponsiveGridOrder.js';
import Layout from '../components/Layout.js';
import Noscript from '../components/Noscript.js';
import PageBtns from '../components/PageBtns.js';
import PlayerBtn from '../components/Player/PlayerBtn';
import closeDrawerImg from '../assets/images/template/nav-close.jpg';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

class Podcast extends ResponsiveGridOrder {
	renderDrawer = () => {
		const { pageContext, activeItem, closeDrawer } = this.props;
		const episodes = pageContext.group.map(({ node }) => node);
		const active = activeItem > -1 && activeItem < episodes.length;
		if(!active) {
			return '';
		}

		const { frontmatter, fields } = episodes[activeItem];
		const { title, description, episodeType, episodeNumber } = frontmatter;
		const { slug } = fields;
		const { col } = this.state;

		return (
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
						<button aria-label="Close Podcast Details" className="close-drawer" onClick={closeDrawer}>
							<img src={closeDrawerImg} alt="Close Podcast Details" />
						</button>
						<div>
							<h4><Link to={slug}>{`${episodeType === 'full' && episodeNumber ? `Episode ${episodeNumber}: ` : ''}${title}`}</Link></h4>
							<div>
								<p>{description}</p>
								<PlayerBtn 
									episode={frontmatter} 
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
			</div>
		);
	}

	renderEpisodes = () => {
		const { pageContext, activeItem, closeDrawer, openDrawer } = this.props;
		const episodes = pageContext.group.map(({ node }) => node);

		return episodes.map(
			({frontmatter, fields, id}, i) => {
				const { image, title } = frontmatter;
				const { slug } = fields;
				const isActive = parseInt(activeItem, 10) === i;
				const classNames = `img-responsive ${isActive ? ' selected' : ''}`;
				const handleClick = isActive ? closeDrawer : (e) => openDrawer(i);
				const altText = `Cover Art for ${title}`;

				return (
					<button className="lz-col" key={'podcast' + i} onClick={handleClick}>
						<Img 
							fluid={image.childImageSharp.fluid} 
							alt={altText} 
							className={`cover-art ${isActive ? ' selected' : ''}`}
						/>
						<Noscript>
							<Link to={slug} className="no-script-tile-link">
								<Img fluid={image.childImageSharp.fluid} alt={altText} className={classNames} />
							</Link>
						</Noscript>
					</button>
				);
			}
		);
	}

	render() {
		const { renderEpisodes, renderDrawer } = this;
		const { path, pageContext } = this.props;
		const { index: pageNumber, pageCount } = pageContext;
		const { row } = this.state;

		return (
			<Layout path={path}>
				<Helmet title={"Podcast"} />
				<h2>Podcast</h2>
				<div className="lz-grid lz-grid-wrap">
					{renderEpisodes()}
					<TransitionGroup 
						transitionName="drawer"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300} 
						className={`lz-drawer-wrapper after-row-${row}`} 
					>
						{renderDrawer()}
					</TransitionGroup>
				</div>
				<PageBtns pathPrefix="/podcast/" pageNumber={pageNumber} pageCount={pageCount} />
			</Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(Podcast);