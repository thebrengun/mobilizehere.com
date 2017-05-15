import React from 'react'
import '../../css/share-your-story.scss'

function ShareYourStory() {
	return (
		<div className="share-your-story">
			<h2>Share Your Story</h2>
			<div className="story-form">
				<div>
					<span>
						<label>Name</label>
						<input type="text" />
					</span>
					<span>
						<label>Email</label>
						<input type="text" />
					</span>
					<span>
						<label>Phone</label>
						<input type="text" />
					</span>
				</div>
				<div>
					<textarea></textarea>
				</div>
			</div>
			<div className="share-your-story-btns">
				<button type="submit">Send</button>
			</div>
		</div>
	);
}

export default ShareYourStory