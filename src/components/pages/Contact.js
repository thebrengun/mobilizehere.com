import React from 'react'
import contactStyles from '../../css/contact.scss'

function Contact() {
	return (
		<div>
			<h2>Contact</h2>
			<div className="contact-info">
				<div>
					<div className="map-wrap">
						<iframe 
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.784390924522!2d-73.99211948459401!3d40.74476957932826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a5c3c2a879%3A0x2f86a18d058e4ec4!2s28+W+27th+St%2C+New+York%2C+NY+10001!5e0!3m2!1sen!2sus!4v1486252844376" 
							allowFullScreen
						>
						</iframe>
					</div>
				</div>
				<div className="address">
					<div>28 W 27th Street</div>
					<div>(212) 757-5147</div>
					<div>info@mobilizehere.com</div>
					<div>Fax: (212) 757-5147</div>
				</div>
			</div>
			{
				// <h2>Donate</h2>
				// <p>Please donate! Texttexttext</p>
				// <div className="donate-form">
				// 	<div>
				// 		{['$5', '$10', '$20'].map(
				// 			(amount, amountIndex) => 
				// 				<div key={'amount' + amountIndex}>
				// 					<div>
				// 						<input type="checkbox" />
				// 						<label>&nbsp;{amount}</label>
				// 					</div>
				// 				</div>
				// 		)}
				// 	</div>
				// 	<div><button className="center-block">Donate</button></div>
				// </div>
			}
		</div>
	);
}

export default Contact