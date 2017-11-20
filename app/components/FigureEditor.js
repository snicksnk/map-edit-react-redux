import React from 'react';
import { Grid, Col, Row, Button, ButtonGroup, Alert } from 'react-bootstrap';
import Map from './Map';
import * as figuresLib from '../lib/figures';
import s from '../styles/figureEditor.css';

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
      key: 'AIzaSyAshdAQdqtRyMmG7ffJrhlB6v7GKrdKjis',
      libraries: ['places']
    }).then(api => this.setState({ api }));
  }

  prepareFigures = () => {
    const { api } = this.state;
    const currentFigure = this.props.currentFigure.toJS();
    const figures = this.props.figures.toJS();

    return [...figures, currentFigure]
      .filter(figure => figure.type)
      .map(figure => {
        const { type, points } = figure;
        return figuresLib[type](api)({ points });
      });
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

  startDraw = (type) => () => {
    const { figureCreate } = this.props.mapActions;
    this.setState({
      editMode: true,
    });
    figureCreate({ type, data: null });
  }

  cancelDraw = () => {
    const { figureCancel } = this.props.mapActions;
    this.setState({ editMode: false });
    figureCancel();
  }

  render() {
    const { api, editMode } = this.state;
    const figures = api ? this.prepareFigures() : [];

    return (<div>
      <Grid fluid>
        <Row>
          <Col md={12}>
            <ButtonGroup className={s.figures}>
              <Button onClick={this.startDraw('polygon')}>
                Polygon
              </Button>
              <Button onClick={this.startDraw('circle')}>
                Circle
              </Button>
              <Button onClick={this.startDraw('rect')}>
                Rect
              </Button>
            </ButtonGroup>

            {editMode && <ButtonGroup>
              <Button onClick={this.endDraw} bsStyle="success">
                Complete edit
              </Button>
              <Button onClick={this.cancelDraw} bsStyle="danger">
                Cancel draw
              </Button>
            </ButtonGroup>}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {editMode && <Alert className={s.info}>
                Click to the map to draw a points
              </Alert>}
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            {api && <Map api={api} editMode={editMode} onClick={this.addPoint}>{figures}</Map>}
          </Col>
          <Col md={6}>
            {api && <Map api={api}>{figures}</Map>}
          </Col>
        </Row>
      </Grid>
    </div>);
  }
}
