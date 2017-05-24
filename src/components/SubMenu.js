import React from 'react'

class SubMenu extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.listenForClicks = this.listenForClicks.bind(this);
		this.stopListeningForClicks = this.stopListeningForClicks.bind(this);
	}

	componentWillUnmount() {
		this.stopListeningForClicks();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.show) {
			this.listenForClicks();
		} else {
			this.stopListeningForClicks();
		}
	}

	listenForClicks() {
		window.addEventListener('click', this.handleClick);
	}

	stopListeningForClicks() {
		window.removeEventListener('click', this.handleClick);
	}

	handleClick(e) {
		this.props.toggle();
	}

	render() {
		return (
			<span className="sub-menu">
				<button 
					onClick={(e) => {
						e.stopPropagation();
						this.props.toggle();
						this.btn.blur();
					}} 
					ref={ref => {this.btn = ref;}}
				>
					{this.props.control}
				</button>
				<span className={['ctrl-wrapper', this.props.show ? 'visible' : 'hidden'].join (' ')}>
					<span className="ul-wrapper">
						<span className="ul-flex">
							<ul className="sub-menu-menu" onClick={e => e.stopPropagation()}>
								<li className="arrow-wrapper"><span className="sub-menu-pinch-arrow"></span></li>
								{this.props.menu.map(
									({text, href}) => (
										<li key={'link-to-' + text}>
											<a href={href} target="_blank" rel="noopener">{text}</a>
										</li>
									)
								)}
							</ul>
						</span>
					</span>
				</span>
			</span>
		);
	}
}

export default SubMenu