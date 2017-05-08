const React = require('react');

const appleIcon57 = require('./assets/icons/apple-icon-57x57.png');
const appleIcon60 = require('./assets/icons/apple-icon-60x60.png');
const appleIcon72 = require('./assets/icons/apple-icon-72x72.png');
const appleIcon76 = require('./assets/icons/apple-icon-76x76.png');
const appleIcon114 = require('./assets/icons/apple-icon-114x114.png');
const appleIcon120 = require('./assets/icons/apple-icon-120x120.png');
const appleIcon144 = require('./assets/icons/apple-icon-144x144.png');
const appleIcon152 = require('./assets/icons/apple-icon-152x152.png');
const appleIcon180 = require('./assets/icons/apple-icon-180x180.png');
const androidIcon192 = require('./assets/icons/android-icon-192x192.png');
const favicon32 = require('./assets/icons/favicon-32x32.png');
const favicon96 = require('./assets/icons/favicon-96x96.png');
const favicon16 = require('./assets/icons/favicon-16x16.png');
const msIcon144 = require('./assets/icons/ms-icon-144x144.png');
const largeImage = require('./assets/images/about/mobilize-logo-big.jpg');

const T = React.PropTypes;

const Html = ({
  title = 'Mobilize Here',
  bundle = 'app.js',
  autotracker = 'autotracker.js',
  body = '',
  favicon = 'favicon.ico',
  stylesheet = 'app.css',
  manifest,
  publicPath
}) => {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel="manifest" href={publicPath + 'manifest.json'} />
        {stylesheet ? <link rel='stylesheet' href={publicPath + stylesheet} /> : null}
        <title>{title}</title>
        <link rel="apple-touch-icon" sizes="57x57" href={appleIcon57} />
        <link rel="apple-touch-icon" sizes="60x60" href={appleIcon60} />
        <link rel="apple-touch-icon" sizes="72x72" href={appleIcon72} />
        <link rel="apple-touch-icon" sizes="76x76" href={appleIcon76} />
        <link rel="apple-touch-icon" sizes="114x114" href={appleIcon114} />
        <link rel="apple-touch-icon" sizes="120x120" href={appleIcon120} />
        <link rel="apple-touch-icon" sizes="144x144" href={appleIcon144} />
        <link rel="apple-touch-icon" sizes="152x152" href={appleIcon152} />
        <link rel="apple-touch-icon" sizes="180x180" href={appleIcon180} />
        <link rel="icon" type="image/png" sizes="192x192"  href={androidIcon192} />
        <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
        <link rel="icon" type="image/png" sizes="96x96" href={favicon96} />
        <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
        <meta name="msapplication-TileColor" content="#2096c3" />
        <meta name="msapplication-TileImage" content={msIcon144} />
        <meta name="theme-color" content="#2096c3" />

        {
          // Hopefully Remove These and Use Helmet.renderStatic() in the future but this will
          // have to do for now.
        }

        <meta property="og:title" content={title} />
        <meta property="og:description" content="Mobilize is a podcast that puts a spotlight on and is a resource for people, friends, communities, and activists who have decided to stand up, resist, fight back -- mobilize." />
        <meta property="og:image" content={largeImage} />
        <meta property="og:url" content="https://www.mobilizehere.com" />
        <meta name="twitter:card" content={largeImage} />

      </head>
      <body>
        <div id='root' dangerouslySetInnerHTML={{ __html: body }} />
        <script src={publicPath + bundle} async />
        <script src='https://www.google-analytics.com/analytics.js' async />
        <script src={publicPath + autotracker} async />
      </body>
    </html>
  );
};

Html.propTypes = {
  title: T.string,
  bundle: T.string,
  body: T.string,
  favicon: T.string,
  stylesheet: T.string,
  publicPath: T.string,
  manifest: T.object.isRequired
};

module.exports = Html;