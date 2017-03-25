import React from 'react'
import sheetMusic from '../assets/pdfs/Rise-Up-Choir-Sheet-Music-(Sibelius).pdf'
import coverEp1 from '../assets/images/podcast/cover-ep-1.jpg'
import coverEp2 from '../assets/images/podcast/cover-ep-2.jpg'
import riseUp from '../assets/images/podcast/rise-up.jpg'
import defaultArt from '../assets/images/about/mobilize-logo-big.jpg'

const defaultState = {
	episodes: [
		{
			trackId: 314037649,
			artwork: defaultArt,
			title: 'Episode 3: Going Out to Cannon Ball',
			notes: <p>Nick Panken of Spirit Family Reunion gives a thoughtful interview about resistance, vulnerability and honesty, and his protest song Going Out To Cannon Ball.</p>
		},
		{
			trackId: 311602489,
			artwork: coverEp2,
			title: 'Episode 2: We\'re His Problem Now',
			notes: <p>Mobilize producer Matt Bockelman tracks down and interviews Kara, author of the famous "We're His Problem Now" online spreadsheet.</p>
		},
		{
			trackId: 310319933,
			artwork: coverEp1,
			title: 'Episode 1: Why We Fight',
			notes: <p>Sound engineer Cory Choy recounts the Mobilize origin story, undocumented DREAMer and DACA holder Cristina tells us why she is fighting and musician Charlottle Littlehales talks about the process of writing and meaning behind our theme song Rise Up.</p>
		},
		{
			trackId: 305459487,
			artwork: riseUp,
			title: 'Mobilize - Rise Up by Charlotte Littlehales',
			notes: <p>Rise Up, written and performed by Charlotte Littlehales and Phil Pardell, is a call for community, unity, and action. Want to sing it in your local choir? <a href={sheetMusic} target="_blank">Click here for sheet music!</a></p>
		}
	],
	extras: [
		{trackId: 310269959},
		{trackId: 310268784},
		{trackId: 309923031},
		{trackId: 309922628}
	]
};

const podcast = (state = defaultState, action) => {
	switch(action.type) {
		default:
			return state;
	}
};

export default podcast