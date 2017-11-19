import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
// import { footer } from '../styles/footer.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';

import { createStyleSheet } from '../utils/Css';

const styles = {
  '@font-face': {
    fontFamily: 'ExoRegular',
    fontWeight: 'normal',
    fontStyle: 'normal',
    src: [
      `url(${require('../static/fonts/Exo20-Regular.woff')}) format("woff")`,
      `url(${require('../static/fonts/Exo20-Regular.eot')}) format("embedded-opentype")`,
      `url(${require('../static/fonts/Exo20-Regular.eot')})`,
    ],
  },
  '@global body, html': {
    'overflow-x': 'hidden',
    fontFamily: 'ExoRegular'
  }
};

const { classes } = createStyleSheet(styles);

const App = ({ children }) =>
  <div className={classes.main}>
    { children }
  </div>;

App.defaultProps = {
  children: null
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
