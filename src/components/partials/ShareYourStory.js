import React from 'react'
import fetch from 'isomorphic-fetch'
import '../../css/share-your-story.scss'

class ShareYourStory extends React.Component {
  constructor() {
    super()
    this.state = {
      formData: {
        _subject: 'Story Submission',
        name: '',
        email: '',
        phone: '',
        story: '',
      },
      status: 'UNSENT',
      message: 'Share your story with the Mobilize Podcast.',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value,
      },
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    this.setState({ status: 'SENDING', message: 'Sending your story...' })

    fetch('https://formspree.io/f/mobilizehere@gmail.com', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.formData),
    })
      .then((response) => this.setState({ status: 'SENT', message: 'Thanks!' }))
      .catch((error) =>
        this.setState({
          status: 'ERROR',
          message: 'Hmm...Something went wrong.',
        })
      )
  }

  render() {
    return (
      <div
        className={[
          'share-your-story',
          this.state.status === 'SENDING' ? 'sending' : '',
          this.state.status === 'SENT' ? 'sent' : '',
          this.state.status === 'ERROR' ? 'error' : '',
        ].join(' ')}
      >
        <h2>
          {this.state.status === 'SENT'
            ? 'Thanks For Sharing!'
            : 'Share Your Story'}
        </h2>
        <form onSubmit={this.handleSubmit}>
          <div className="message">{this.state.message}</div>
          <div className="story-form">
            <div>
              <span>
                <label htmlFor="form-name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="form-name"
                  title="Let us know who you are"
                  autoComplete="name"
                  required
                  value={this.state.formData.name}
                  onChange={this.handleChange}
                />
              </span>
              <span>
                <label htmlFor="form-email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="form-email"
                  title="Please provide a way to contact you"
                  autoComplete="email"
                  required
                  value={this.state.formData.email}
                  onChange={this.handleChange}
                />
              </span>
              <span>
                <label htmlFor="form-phone">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  id="form-phone"
                  title="We can chat by phone if you prefer"
                  autoComplete="tel"
                  value={this.state.formData.phone}
                  onChange={this.handleChange}
                />
              </span>
            </div>
            <div>
              <label htmlFor="form-story" className="textarea-label">
                Story
              </label>
              <textarea
                name="story"
                id="form-story"
                required
                title="What do you want to share?"
                value={this.state.formData.story}
                onChange={this.handleChange}
              />
              <span className="align-right">
                <input
                  type="submit"
                  value={
                    this.state.status === 'SENDING' ? 'Sending...' : 'Send'
                  }
                />
              </span>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default ShareYourStory
