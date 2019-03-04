import React from 'react'

const styles = {
	ul: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	test: {
		flexBasis: '33%',
		textAlign: 'center',
		listStyle: 'none',
		margin: '15px 0'
	}	
};

class ListControl extends React.Component {
	render() {
		const { value, onChange } = this.props;
		return (
			<input 
				type="text" 
				value={value}
				onChange={(e) => onChange(e.target.value)} 
			/>
		);
	}
}

class ListPreview extends React.Component {
	render() {
		const { value } = this.props;
		const list = value.split(',').map(name => name.trim());

		return (
			<div>
				<strong>Contributors:</strong>
				<ul style={styles.ul}>
					{list.map(
						(name, i) => 
							<li style={styles.test} key={`podcast-contrib-${i}`}>
								{name}
							</li>
					)}
				</ul>
			</div>
		);
	}
}

const listConfig = [ "contribList", ListControl, ListPreview ];

export default listConfig;