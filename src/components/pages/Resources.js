import React from 'react'
import { connect } from 'react-redux'
import ResourcesPage from './ResourcesPage'
import Paginate from '../Paginate'

function Resources({data, location}) {
	return (
		<div>
			<h2>Resources</h2>
			<ResourcesPage {...Paginate(data, location)} />
		</div>
	);
}

const mapStateToProps = ({resources}) => ({
	data: resources
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Resources)