import React from 'react';
import shortid from 'shortid';

class UniqueIDControl extends React.Component {
	render() {
		const {value, onChange} = this.props;
		if(!value) {
			onChange(shortid.generate());
		}
		return (
			<div className="css-1d8xcao">
				<input 
					type="hidden" 
					value={value} 
					onChange={(e) => onChange(e.target.value)} 
				/>
				<span>https://www.mobilizehere.com/{value}</span>
			</div>
		);
	}
}

class UniqueIDPreview extends React.Component {
	render() {
		return 'https://www.mobilizehere.com/' + this.props.value;
	}
}

export default [ "UniqueID", UniqueIDControl, UniqueIDPreview ];