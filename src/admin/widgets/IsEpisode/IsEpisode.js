import React from 'react'

const styles = {
	preview: {
		background: '#f00',
		color: '#fff',
		padding: '.15em',
		border: 'solid 1px #900'
	}
};

function IsEpisodeControl({value, onChange}) {
	return (
		<input 
			type="checkbox" 
			checked={value} 
			onChange={(e) => onChange(e.target.checked)} 
		/>
	);
}

function IsEpisodePreview({value}) {
	return <span style={styles.preview}>Type: {value ? 'Full Episode' : 'Extra'}</span>
}

const isEpisodeConfig = [ "isEpisode", IsEpisodeControl, IsEpisodePreview ];

export default isEpisodeConfig;