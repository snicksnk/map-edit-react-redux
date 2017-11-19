import React from 'react';
import { Switch, Route } from 'react-router';

import App from './components/App';
import MapFigureEditor from './containers/MapFigureEditor';

export default () => (<App>
  <Switch>
    <Route exact path={'/'} component={MapFigureEditor} />
  </Switch>
</App>);
