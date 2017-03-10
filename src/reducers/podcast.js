import React from 'react'
import sheetMusic from '../assets/pdfs/Rise-Up-Choir-Sheet-Music-(Sibelius).pdf'
import coverArt from '../assets/images/about/mobilize-logo-big.jpg'

const defaultState = {
	episodes: [
		{
			trackId: 311602489,
			artwork: coverArt,
			title: 'Episode 2: We\'re His Problem Now',
			notes: <p>Mobilize producer Matt Bockelman tracks down and interviews Kara, author of the famous "We're His Problem Now" online spreadsheet.</p>
		},
		{
			trackId: 310319933,
			artwork: coverArt,
			title: 'Episode 1: Why We Fight',
			notes: <p>Sound engineer Cory Choy recounts the Mobilize origin story, undocumented DREAMer and DACA holder Cristina tells us why she is fighting and musician Charlottle Littlehales talks about the process of writing and meaning behind our theme song Rise Up.</p>
		},
		{
			trackId: 305459487,
			artwork: coverArt,
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