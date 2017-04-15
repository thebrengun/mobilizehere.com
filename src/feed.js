import React from 'react'
import { connect } from 'react-redux'

import mobilizeImage from './assets/images/about/mobilize-logo-big.jpg'

function Feed({ name, email, website, aboutText, podcast }) {
	return (
		<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
			<channel>
				<title>{name}</title>
				<link>{website}</link>
				<language>en-us</language>
				<copyright>&#x2117; &amp; &#xA9; 2017 {name}</copyright>
				<itunes:author>{name}</itunes:author>
				<itunes:summary>{aboutText}</itunes:summary>
				<description>{aboutText}</description>
				<itunes:owner>
					<itunes:name>{name}</itunes:name>
					<itunes:email>{email}</itunes:email>
				</itunes:owner>
				<itunes:image href={mobilizeImage} />
				<itunes:category text="News &amp; Politics" />
				<itunes:category text="Society &amp; Culture" />
				<itunes:explicit>yes</itunes:explicit>
				{podcast.episodes.map(
					({ artwork, url, title, notes }) => 
						<item>
							<title></title>
							<itunes:subtitle></itunes:subtitle>
							<itunes:summary><![CDATA[This week we talk about <a href="https://itunes/apple.com/us/book/antique-trader-salt-pepper/id429691295?mt=11">salt and pepper shakers</a>, comparing and contrasting pour rates, construction materials, and overall aesthetics. Come and join the party!]] ></itunes:summary>
							<itunes:image href={artwork} />
							<enclosure length="8727310" type="audio/x-m4a" url={url} />
							<guid>{url}</guid>
							<pubDate>Tue, 08 Mar 2016 12:00:00 GMT</pubDate>
							<itunes:duration>07:04</itunes:duration>
							<itunes:explicit>no</itunes:explicit>
						</item>
				)}
			</channel>
		</rss>		
	);
}

function mapStateToProps({about, podcast}) {
	const { name, email, website, aboutText } = about;
	return {
		name, email, website, aboutText: aboutText.join(' '), podcast
	};
}

export default connect(stateToProps)(Feed)

<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
	<channel>
		<title>Mobilize Podcast</title>
		<link>https://www.mobilizehere.com</link>
		<language>en-us</language>
		<copyright>&#x2117; &amp; &#xA9; 2017 Mobilize</copyright>
		<itunes:subtitle>A show about everything</itunes:subtitle>
		<itunes:author>Mobilize</itunes:author>
		<itunes:summary>Mobilize is a podcast that puts a spotlight on and is a resource for people, friends, communities, and activists who have decided to stand up, resist, fight back-- mobilize. Each day, together, we shine a light on the truth; we focus on the things that unite us; we pull each other up; we celebrate our shared humanity.</itunes:summary>
		<description>Mobilize is a podcast that puts a spotlight on and is a resource for people, friends, communities, and activists who have decided to stand up, resist, fight back-- mobilize. Each day, together, we shine a light on the truth; we focus on the things that unite us; we pull each other up; we celebrate our shared humanity.</description>
		<itunes:owner>
			<itunes:name>Mobilize</itunes:name>
			<itunes:email>mobilizehere@gmail.com</itunes:email>
		</itunes:owner>
		<itunes:image href="https://mobilizehere.com/images/mobilize-logo-big.jpg"/>
		<itunes:category text="News &amp; Politics" />
		<itunes:category text="Society &amp; Culture" />
		<itunes:explicit>yes</itunes:explicit>
		<item>
			<title></title>
			<itunes:subtitle>A short primer on table spices</itunes:subtitle>
			<itunes:summary><![CDATA[This week we talk about <a href="https://itunes/apple.com/us/book/antique-trader-salt-pepper/id429691295?mt=11">salt and pepper shakers</a>, comparing and contrasting pour rates, construction materials, and overall aesthetics. Come and join the party!]] ></itunes:summary>
			<itunes:image href="http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg"/>
			<enclosure length="8727310" type="audio/x-m4a" url="http://example.com/podcasts/everything/AllAboutEverythingEpisode3.m4a"/>
			<guid>http://example.com/podcasts/archive/aae20140615.m4a</guid>
			<pubDate>Tue, 08 Mar 2016 12:00:00 GMT</pubDate>
			<itunes:duration>07:04</itunes:duration>
			<itunes:explicit>no</itunes:explicit>

			artwork: coverEp4,
			title: 'Episode 4: Protest at JFK',
			notes: <p>How Audrey Sage, a self-described newbie organizer, led thousands of protesters to JFK airport.</p>

			trackId: 314037649,
			artwork: coverEp3,
			<title>Episode 3: Going Out to Cannon Ball</title>
			<itunes:summary><![CDATA[Nick Panken of Spirit Family Reunion gives a thoughtful interview about resistance, vulnerability and honesty, and his protest song Going Out To Cannon Ball.]] ></itunes:summary>

			trackId: 311602489,
			artwork: coverEp2,
			title: 'Episode 2: We\'re His Problem Now',
			notes: <p>Mobilize producer Matt Bockelman tracks down and interviews Kara, author of the famous "We're His Problem Now" online spreadsheet.</p>

			trackId: 310319933,
			artwork: coverEp1,
			title: 'Episode 1: Why We Fight',
			notes: <p>Sound engineer Cory Choy recounts the Mobilize origin story, undocumented DREAMer and DACA holder Cristina tells us why she is fighting and musician Charlottle Littlehales talks about the process of writing and meaning behind our theme song Rise Up.</p>

			trackId: 305459487,
			artwork: riseUp,
			title: 'Mobilize - Rise Up by Charlotte Littlehales',
			notes: <p>Rise Up, written and performed by Charlotte Littlehales and Phil Pardell, is a call for community, unity, and action. Want to sing it in your local choir? <a href={sheetMusic} target="_blank">Click here for sheet music!</a></p>
		</item>
	</channel>
</rss>