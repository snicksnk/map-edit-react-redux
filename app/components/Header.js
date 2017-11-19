import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import color from 'color';
import injectSheet from 'react-jss';

const styles = {
  wrapper: {
    background: color('rgb(50, 18, 78)').hex(),
    padding: 20,
    zIndex: 5,
    position: 'relative'
  },
};

@injectSheet(styles)
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
    this.collapse = this.collapse.bind(this);
  }
  collapse() {
    const state = this.state.collapsed;
    this.setState({ collapsed: !state });
  }
  render() {
    return (<div>&nbsp;</div>);
  }
}
