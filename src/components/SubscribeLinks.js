import React from 'react'
import '../css/subscribe-links.scss'

function SubscribeLinks({className = 'subscribe-links'}) {
	return (
		<div className={className}>
			<strong className="subscribe">Subscribe</strong>
			<ul>
				<li>
					<a 
						href="https://itunes.apple.com/us/podcast/mobilize/id1229280265" 
						target="_blank" 
						rel="noopener"
					>
						iTunes
					</a>
				</li>
				<li>
					<a 
						href="https://playmusic.app.goo.gl/?ibi=com.google.PlayMusic&amp;isi=691797987&amp;ius=googleplaymusic&amp;link=https://play.google.com/music/m/I3jcwhqyumtfgwz3kbwrm7upwlm?t%3DMobilize%26pcampaignid%3DMKT-na-all-co-pr-mu-pod-16" 
						rel="nofollow" 
						target="_blank" 
						rel="noopener"
					>
						Google Play
					</a>
				</li>
				<li>
					<a 
						href="http://www.stitcher.com/podcast/mobilize" 
						target="_blank" 
						rel="noopener"
					>
						Stitcher
					</a>
				</li>
				<li>
					<a 
						href="https://www.mobilizehere.com/podcast.rss" 
						target="_blank" 
						rel="noopener"
					>
						RSS
					</a>
				</li>
			</ul>
		</div>
	);
}

export default SubscribeLinks