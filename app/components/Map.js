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
      destroyFigures: [],
      searchBox: null
    };
  }

  componentWillMount() {
    const { children: figures } = this.props;
    this.setState({ figures });
  }

  componentWillReceiveProps(nextProps) {
    const { children: figures } = nextProps;
    this.setState({ figures });
  }

  componentWillUpdate() {
    const { figures: oldFigures } = this.state;
    oldFigures.forEach(figure => {
      figure(null);
    });
  }

  setCursor(cursor) {
    const { map } = this.state;
    if (map) {
      map.setOptions({ draggableCursor: cursor });
    }
  }

  processSearchBox = api => input => {
    const { map } = this.state;
    if (map && input && !this.state.searchBox) {
      const searchBox = new api.places.SearchBox(input);

      map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds());
      });

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        const bounds = new api.LatLngBounds();

        if (places.length === 0) {
          return;
        }

        places.forEach((place) => {
          if (place.geometry.viewport) {
              // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });

        map.fitBounds(bounds);
      });
      this.setState({ searchBox });
    }
  }

  renderMap = api => mapContainer => {
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
    const { api, editMode } = this.props;
    const cursor = editMode ? 'crosshair' : 'url(http://maps.google.com/mapfiles/openhand.cur), move';
    this.setCursor(cursor);

    return (<div>
      <FormControl
        inputRef={this.processSearchBox(api)}
        type="text"
        className={s.searchInput}
        placeholder="search"
      />
      <div ref={this.renderMap(api)} className={s.map} />
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
