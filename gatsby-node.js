const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const createPaginatedPages = require('gatsby-paginate');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      pages: allMarkdownRemark(limit: 1000, filter: {fileAbsolutePath: {regex: "\/src\/pages\/"}}) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
      episodes: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] },
          filter: { frontmatter: { templateKey: { eq: "podcast" } }},
          limit: 1000
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              legacyURL
              templateKey
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
      gallery: allFile(filter: {absolutePath: {regex: "/gallery/full/"}}) {
        edges {
          node {
            id
            childImageSharp {
              thumbnails: resize(width: 400, height:400) {
                src
                tracedSVG
                width
                height
                aspectRatio
                originalName
              }
              fullsize: fluid(maxWidth: 700) {
                src
                tracedSVG
                presentationWidth
                presentationHeight
                aspectRatio
                originalName
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const pages = result.data.pages.edges;
    const episodes = result.data.episodes.edges;
    const galleryImages = result.data.gallery.edges;

    createPaginatedPages({
      edges: episodes,
      createPage: createPage,
      pageTemplate: "src/templates/podcasts.js",
      pageLength: 8, // This is optional and defaults to 10 if not used
      pathPrefix: "podcast", // This is optional and defaults to an empty string if not used
      buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}`, // This is optional and this is the default
      context: {} // This is optional and defaults to an empty object if not used
    });

    // Thumbnail Pages

    createPaginatedPages({
      edges: galleryImages,
      createPage: createPage,
      pageTemplate: "src/templates/gallery.js",
      pageLength: 8, // This is optional and defaults to 10 if not used
      pathPrefix: "gallery", // This is optional and defaults to an empty string if not used
      buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}`, // This is optional and this is the default
      context: {} // This is optional and defaults to an empty object if not used
    });

    // Fullsize Image Pages

    createPaginatedPages({
      edges: galleryImages,
      createPage: createPage,
      pageTemplate: "src/templates/galleryImage.js",
      pageLength: 1, // This is optional and defaults to 10 if not used
      pathPrefix: "gallery/img", // This is optional and defaults to an empty string if not used
      buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}/${index}` : `${pathPrefix}/`, 
      context: {} // This is optional and defaults to an empty object if not used
    });

    pages.forEach(edge => {
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    });
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
