import photo1 from '../assets/images/gallery/photo1.jpg'
import photo2 from '../assets/images/gallery/photo2.jpg'
import photo3 from '../assets/images/gallery/photo3.jpg'
import photo4 from '../assets/images/gallery/photo4.jpg'
import photo5 from '../assets/images/gallery/photo5.jpg'
import photo6 from '../assets/images/gallery/photo6.jpg'
import photo7 from '../assets/images/gallery/photo7.jpg'
import photo8 from '../assets/images/gallery/photo8.jpg'
import photo9 from '../assets/images/gallery/photo9.jpg'
import photo10 from '../assets/images/gallery/photo10.jpg'
import photo11 from '../assets/images/gallery/photo11.jpg'
import photo12 from '../assets/images/gallery/photo12.jpg'
import photo13 from '../assets/images/gallery/photo13.jpg'
import photo14 from '../assets/images/gallery/photo14.jpg'
import photo15 from '../assets/images/gallery/photo15.jpg'
import photo16 from '../assets/images/gallery/photo16.jpg'

const defaultState = [
	{img: photo1},
	{img: photo2},
	{img: photo3},
	{img: photo4},
	{img: photo5},
	{img: photo6},
	{img: photo7},
	{img: photo8},
	{img: photo9},
	{img: photo10},
	{img: photo11},
	{img: photo12},
	{img: photo13},
	{img: photo14},
	{img: photo15},
	{img: photo16},
];

const gallery = (state = defaultState, action) => {
	switch(action.type) {
		default:
			return state;
	}
};

export default gallery