import React from 'react'
import { connect } from 'react-redux'
import GalleryPage from './GalleryPage'
import Paginate from '../Paginate'

function Gallery({data, location}) {
	return (
		<div>
			<h2>Gallery</h2>
			<GalleryPage {...Paginate(data, location)} />
		</div>
	);
}

const mapStateToProps = ({gallery}) => ({
	data: gallery
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)