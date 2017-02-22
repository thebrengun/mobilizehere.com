import React from 'react'
import { connect } from 'react-redux'

function AboutText({about}) {
	return (
		<div>
			{about.map(
				(text, aboutIndex) => 
					<p key={'about-text-' + aboutIndex}>
						{text}
					</p>
			)}
		</div>
	);
}

export default connect(({about}) => ({about}))(AboutText)