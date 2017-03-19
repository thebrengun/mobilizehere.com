import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import ResourcesPage from './ResourcesPage'
import Paginate from '../Paginate'

function TakeAction({data, location, route}) {
	return (
		<div>
			<Helmet title={route.title} />
			<h2>Take Action</h2>
			<ResourcesPage {...Paginate(data, location, 12)} />
		</div>
	);
}

const mapStateToProps = ({resources}) => ({
	data: resources
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TakeAction)