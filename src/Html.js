const React = require('react');

const T = React.PropTypes;

const Html = ({
  title = 'Mobilize Here',
  bundle = 'app.js',
  body = '',
  favicon = 'favicon.ico',
  stylesheet = 'app.css',
  publicPath
}) => (
  <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <title>{title}</title>
      {favicon ? <link rel='shortcut icon' href={favicon} /> : null}
      {stylesheet ? <link rel='stylesheet' href={publicPath + stylesheet} /> : null}
    </head>
    <body>
      <div id='root' dangerouslySetInnerHTML={{ __html: body }} />
      <script src={publicPath + bundle} />
    </body>
  </html>
);

Html.propTypes = {
  title: T.string,
  bundle: T.string,
  body: T.string,
  favicon: T.string,
  stylesheet: T.string,
  publicPath: T.string,
};

module.exports = Html;