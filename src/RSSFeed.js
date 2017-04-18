import about from './providers/about.provider'
import podcast from './providers/podcast.provider'

export default createFeed({...about, podcast});

function createFeed({ name, email, website, image, __content, podcast }) {
	return (
`<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>${name}</title>
    <link>${website}</link>
    <language>en-us</language>
    <copyright>&#x2117; &amp; &#xA9; 2017 ${name}</copyright>
    <itunes:author>${name}</itunes:author>
    <itunes:summary>
    	<![CDATA[
    		${__content}
    	]]>
    </itunes:summary>
    <description>
    	<![CDATA[
    		${__content}
    	]]>
    </description>
    <itunes:owner>
    	<itunes:name>${name}</itunes:name>
    	<itunes:email>${email}</itunes:email>
    </itunes:owner>
    <itunes:image href="${website}${image}" />
    <image>
    	<url>${website}${image}</url>
    	<link>${website}</link>
    	<title>${name}</title>
    </image>
    <itunes:category text="News &amp; Politics" />
    <itunes:category text="Society &amp; Culture" />
    <itunes:explicit>yes</itunes:explicit>
    ${[...podcast.episodes, ...podcast.extras].map(
    	({ image, url, title, __content: description, date, length, duration, explicit }) => 
    `<item>
      <title>${title}</title>
      <description>
      	<![CDATA[
      		${description}
      	]]>
      </description>
      <itunes:summary>
      	<![CDATA[
      		${description}
      	]]>
      </itunes:summary>
      <itunes:image href="${website}${image}" />
      <enclosure length="${length}" type="audio/mpeg" url="${url}" />
      <guid>${url}</guid>
      <pubDate>${new Date(date).toDateString()}</pubDate>
      <itunes:duration>${duration}</itunes:duration>
      <itunes:explicit>${explicit}</itunes:explicit>
    </item>`
    ).join('\n    ')}
  </channel>
</rss>`
	);
}