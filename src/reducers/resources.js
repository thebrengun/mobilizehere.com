import theSixtyFive from '../assets/images/resources/the-sixty-five.jpg'
import fiveCalls from '../assets/images/resources/5-calls.jpg'
import resistHere from '../assets/images/resources/resist-here.jpg'
import resistanceRecess from '../assets/images/resources/resistance-recess.jpg'
import swingLeft from '../assets/images/resources/swing-left.jpg'
import townHallProject from '../assets/images/resources/town-hall-project.jpg'

const defaultState = [
	{img: townHallProject, url: "https://townhallproject.com"},
	{img: swingLeft, url: "https://swingleft.org"},
	{img: theSixtyFive, url: "https://thesixtyfive.org"},
	{img: fiveCalls, url: "https://5calls.org"},
	{img: resistHere, url: "http://resisthere.org"},
	{img: resistanceRecess, url: "https://resistancerecess.com"}
];

const resources = (state = defaultState, action) => {
	switch(action.type) {
		default:
			return state;
	}
};

export default resources