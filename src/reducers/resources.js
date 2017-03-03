import theSixtyFive from '../assets/images/resources/the-sixty-five.jpg'
import fiveCalls from '../assets/images/resources/5-calls.jpg'
import resistHere from '../assets/images/resources/resist-here.jpg'
import resistanceRecess from '../assets/images/resources/resistance-recess.jpg'
import swingLeft from '../assets/images/resources/swing-left.jpg'
import townHallProject from '../assets/images/resources/town-hall-project.jpg'
import countable from '../assets/images/resources/countable.jpg'
import faxZero from '../assets/images/resources/faxZero.jpg'

const defaultState = [
	{color: '#164768', img: townHallProject, url: "https://townhallproject.com"},
	{color: '#042952', img: swingLeft, url: "https://swingleft.org"},
	{color: '#753a95', img: theSixtyFive, url: "https://thesixtyfive.org"},
	{color: '#1c75d1', img: fiveCalls, url: "https://5calls.org"},
	{color: '#d0383c', img: resistHere, url: "http://resisthere.org"},
	{color: '#08192a', img: resistanceRecess, url: "https://resistancerecess.com"},
	{color: '#eb0627', img: countable, url: "https://www.countable.us"},
	{color: '#b8d860', img: faxZero, url: "https://faxzero.com/fax_congress.php"}
];

const resources = (state = defaultState, action) => {
	switch(action.type) {
		default:
			return state;
	}
};

export default resources