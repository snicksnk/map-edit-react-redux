import React, { PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';

import s from '../styles/map.css';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.figureDestroys = [];
    this.state = {
      map: null,
      figures: [],
      destroyFigures: []
    };
  }

  componentWillMount() {
    const { children: figures } = this.props;
    this.setState({ figures });
  }

  componentWillReceiveProps(nextProps) {
    const { editMode, children: figures } = nextProps;
    const cursor = editMode ? 'crosshair' : 'url(http://maps.google.com/mapfiles/openhand.cur), move';
    this.setCursor(cursor);
    this.setState({ figures });
  }

  componentWillUpdate() {
    const { figures: oldFigures } = this.state;
    console.log('componentWillReceiveProps', oldFigures);
    oldFigures.forEach(figure => {
      figure(null);
    });
  }

  setCursor(cursor) {
    const { map } = this.state;
    map.setOptions({ draggableCursor: cursor });
  }

  initMap = api => mapContainer => {
    const { onClick } = this.props;
    if (!this.state.map) {
      const map = new api.Map(mapContainer, {
        zoom: 5,
        center: { lat: 24.886, lng: -70.268 },
        mapTypeId: 'terrain'
      });

      api.event.addListener(map, 'click', ({ latLng }) => {
        const lat = latLng.lat();
        const lng = latLng.lng();
        // populate yor box/field with lat, lng
        console.log('Lat-lang', { lat, lng });
        onClick({ lat, lng });
      });

      this.setState({ map });
    } else {
      const { figures } = this.state;
      this.figureDestroys.forEach(destroyFigure => destroyFigure());
      this.figureDestroys = figures.map(figure => figure(this.state.map));
    }
  }

  render() {
    const { api } = this.props;
    return (<div>
      <FormControl
        type="text"
        className={s.searchInput}
        placeholder="search"
      />
      <div ref={this.initMap(api)} className={s.map} />
    </div>);
  }
}

Map.defaultProps = {
  children: [],
  onClick: () => {}
};

Map.propTypes = {
  children: PropTypes.array,
  onClick: PropTypes.func
};
