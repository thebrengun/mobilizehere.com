module.exports = {
  siteMetadata: {
    title: 'Mobilize',
    description: '',
    siteUrl: 'https://www.mobilizehere.com'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp', 
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data`,
        name: 'data',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/images`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            about:allMarkdownRemark(filter: {fileAbsolutePath: {regex: "\/src\/data\/info\/"}}) {
              edges {
                node {
                  html
                  frontmatter {
                    name
                    email
                    website
                    image
                    itunesArtwork
                    itunesSummary
                  }
                }
              }
            }
          }
        `,
        setup: ({ query: { about } }) => {
          const { 
            name, email, website, image, itunesArtwork, itunesSummary 
          } = about.edges[0].node.frontmatter;

          return ({
            no_cdata_fields: ['title', 'description', 'copyright', 'language'],
            title: name,
            link: website,
            site_url: website,
            generator: 'GatsbyJS &amp; Node RSS',
            language: 'en',
            copyright: `&#x2117; &amp; &#xA9; 2017 - 1019 ${name}`,
            description: itunesSummary,
            image: {
              url: itunesArtwork,
              link: website,
              title: name,
            },
            custom_namespaces: {
              'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
            },
            custom_elements: [
              {'itunes:author': name},
              {'itunes:summary': itunesSummary},
              {'itunes:owner': [
                {'itunes:name': name},
                {'itunes:email': email}
              ]},
              {'itunes:image': {
                _attr: {
                  href: itunesArtwork
                }
              }},
              {'itunes:category': {
                _attr: {
                  text: 'News &amp; Politics'
                }
              }},
              {'itunes:category': {
                _attr: {
                  text: 'Society &amp; Culture'
                }
              }},
              {'itunes:explicit': 'no'},
            ]
          });
        },
        feeds: [{
          query: `
            {
              episodes: allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { templateKey: { eq: "podcast" } }},
                  limit: 1000
              ) {
                edges {
                  node {
                    frontmatter {
                      title
                      image
                      description
                      date
                      episodeType
                      episodeNumber
                      url
                      length
                      duration
                      explicit
                    }
                  }
                }
              }
            }
          `,
          output: '/podcast.rss',
          serialize: ({ query: { about, episodes } }) => {
            return episodes.edges.map(
              ({node}) => {
                const { 
                  title, image, description, date, 
                  episodeType, episodeNumber, 
                  url, length, duration, explicit 
                } = node.frontmatter;
                return {
                  no_cdata_fields: ['title', 'description'],
                  title: title,
                  description: `
                    ${description}

                    https://www.mobilizehere.com
                  `,
                  enclosure: {
                    __attr: {
                      length: length
                    },
                    url: url.replace('https://', '//'), 
                    length: length,
                    size: length,
                    type: 'audio/mpeg',
                  },
                  guid: url.replace('https://', '//'),
                  pubDate: new Date(date).toUTCString(),
                  custom_elements: [
                    {'itunes:summary': `
                      ${description}

                      https://www.mobilizehere.com
                    `},
                    {'itunes:episodeType': episodeType},
                    {'itunes:episode': episodeNumber},
                    {'itunes:image': {
                      _attr: {
                        href: image.replace('https://', '//')
                      }
                    }},
                    {'itunes:duration': duration},
                    {'itunes:explicit': explicit}
                  ]
                };
              }
            );
          },
        }]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Mobilize",
        short_name: "Mobilize",
        start_url: "/",
        background_color: "#fafeff",
        theme_color: "#2096c3",
        display: "standalone",
        icon: "src/assets/icons/splash.png",
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-93560224-1",
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "mobilizehere.com",
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        /**
         * One convention is to place your Netlify CMS customization code in a
         * `src/cms` directory.
         */
        modulePath: `${__dirname}/src/cms/cms.js`,
        publicPath: `admin`,
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
