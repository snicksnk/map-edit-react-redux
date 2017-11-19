import React from 'react';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import Map from './Map';
import { polygon } from '../lib/figures';
// import s from '../styles/figureEditor.css';

const loadGoogleMapsAPI = require('load-google-maps-api');

export default class FigureEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      api: null,
      editMode: false,
    };
  }

  componentWillMount() {
    loadGoogleMapsAPI({
      key: 'AIzaSyAshdAQdqtRyMmG7ffJrhlB6v7GKrdKjis'
    }).then(api => this.setState({ api }));
  }

  getFigures = () => {
    const { api } = this.state;
    let figures = [];
    if (api) {
      const { currentFigure } = this.props;
      const points = currentFigure.get('points').toJS();
      const poly = polygon(api)({ points });
      figures = [
        poly
      ];
    }
    return figures;
  }

  addPoint = (point) => {
    const { figurePointAdd } = this.props.mapActions;
    const { editMode } = this.state;
    if (editMode) {
      figurePointAdd({ point });
    }
  }

  endDraw = () => {
    const { figureSave } = this.props.mapActions;
    this.setState({ editMode: false });
    figureSave();
  }

  startDraw = () => {
    const { figureCreate } = this.props.mapActions;
    this.setState({
      editMode: true,
    });
    figureCreate({ type: 'polygon', data: null });
  }


  render() {
    const { api, editMode } = this.state;
    const figures = this.getFigures();
    return (<div>
      <Grid fluid>
        <Row>
          <Button onClick={this.startDraw('polygon')}>
            Polygon
          </Button>
          <Button onClick={this.startDraw('circle')}>
            Circle
          </Button>
          {editMode && <Button onClick={this.endDraw}>
            Complete edit
          </Button>}
        </Row>
        <Row>
          <Col md={6}>
            {api && <Map api={api} editMode={editMode} onClick={this.addPoint}>{figures}</Map>}
          </Col>
          <Col md={6}>
            {api && <Map api={api} editMode={editMode}>{figures}</Map>}
          </Col>
        </Row>
      </Grid>
    </div>);
  }
}
