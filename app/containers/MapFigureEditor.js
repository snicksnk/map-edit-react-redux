import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as mapActions } from '../reducers/modules/map';
import FigureEditor from '../components/FigureEditor';

export const MapContainer = ({ actions, map }) => (
  <div>
    <FigureEditor
      mapActions={actions}
      currentFigure={map.get('currentFigure')}
      figures={map.get('figures')}
    />
  </div>
);

MapContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  map: state.get('map')
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(mapActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapContainer);
