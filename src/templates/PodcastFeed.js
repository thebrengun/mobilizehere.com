exports.createPodcastFeed = createPodcastFeed

function createPodcastFeed({
  name,
  email,
  website: websiteHttps,
  image,
  itunesArtwork,
  __content,
  podcast,
}) {
  const website = websiteHttps.replace('https://', '//')
  return `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>${name}</title>
    <link>${website}</link>
    <language>en-us</language>
    <copyright>&#x2117; &amp; &#xA9; 2017 ${name}</copyright>
    <itunes:author>${name}</itunes:author>
    <itunes:summary>
    	${removeTagsFromString(__content).replace('\n', ' ')}
    </itunes:summary>
    <description>
    	${removeTagsFromString(__content).replace('\n', ' ')}
    </description>
    <itunes:owner>
    	<itunes:name>${name}</itunes:name>
    	<itunes:email>${email}</itunes:email>
    </itunes:owner>
    <itunes:image href="${itunesArtwork}" />
    <image>
    	<url>${itunesArtwork}</url>
    	<link>${website}</link>
    	<title>${name}</title>
    </image>
    <itunes:category text="News &amp; Politics" />
    <itunes:category text="Society &amp; Culture" />
    <itunes:explicit>no</itunes:explicit>
    ${podcast.episodes
      .map(
        ({
          image,
          url,
          title,
          description,
          date,
          length,
          duration,
          explicit,
        }) =>
          `<item>
      <title>${title}</title>
      <description>
        ${description}

        ${'https://www.mobilizehere.com'}
      </description>
      <itunes:summary>
      	${description}
        
        ${'https://www.mobilizehere.com'}
      </itunes:summary>
      <itunes:image href="${image.replace('https://', 'http://')}" />
      <enclosure length="${length}" type="audio/mpeg" url="${url.replace(
            'https://',
            'http://'
          )}" />
      <guid>${url}</guid>
      <pubDate>${new Date(date).toUTCString()}</pubDate>
      <itunes:duration>${duration}</itunes:duration>
      <itunes:explicit>${explicit}</itunes:explicit>
    </item>`
      )
      .join('\n    ')}
  </channel>
</rss>`
}

function removeTagsFromString(htmlString) {
  const htmlExp = /<[^>]*>/g
  return htmlString.replace(htmlExp, '')
}
