import React, { PropTypes } from 'react';

const App = ({ children }) =>
  <div>
    { children }
  </div>;

App.defaultProps = {
  children: null
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
