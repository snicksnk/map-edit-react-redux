import React, { Component } from 'react';
import { Dropdown, Grid, MenuItem, Row, Col } from 'react-bootstrap';
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
  leftMenu: {
    float: 'left',
    color: color('rgb(255, 255, 255)').hex(),
    fontSize: 14,
    padding: 0,
    margin: 0,
    listStyle: 'none'
  },
  menuItem: {
    display: 'inline',
    marginRight: 20,
    cursor: 'pointer'
  },
  centerMenu: {
    float: 'left',
    color: color('rgb(255, 255, 255)').hex(),
    fontSize: 12,
    padding: 0,
    margin: 0,
    listStyle: 'none',
    textAlign: 'center'
  },
  rightMenu: {
    color: color('rgb(255, 255, 255)').hex(),
    fontSize: 14,
    padding: 0,
    margin: 0,
    listStyle: 'none',
    textAlign: 'right'
  },
  caret: {
    width: 0,
    height: 0,
    borderLeft: '4px solid transparent',
    borderRight: '4px solid transparent',
    borderTop: '4px solid #fff',
    top: 10,
    position: 'relative',
    marginLeft: 3
  },
  dropdownItem: {
    background: 'none',
    border: 'none',
    color: color('rgb(255, 255, 255)').hex(),
    '&:hover, &:focus': {
      background: 'none',
      color: color('rgb(255, 255, 255)').hex(),
    }
  },
  menuWrapper: {
    background: 'rgba(70, 24, 108, 0.8)',
    padding: 15,
    zIndex: 2,
    position: 'relative',
  },
  mainMenu: {
    float: 'left',
    color: color('rgb(255, 255, 255)').hex(),
    fontSize: 12,
    padding: 0,
    marginTop: 8,
    listStyle: 'none'
  },
  mainMenuItem: {
    display: 'inline',
    fontSize: 14,
    cursor: 'pointer'
  },
  menuDelimiter: {
    display: 'inline-block',
    margin: '0 20px',
    width: 9,
    height: 9,
    backgroundColor: 'transparent',
    borderRadius: '100%',
    border: '3px solid rgb(255, 198, 0)',
    boxSizing: 'border-box',
  },
  socialLink: {
    width: 20,
    height: 20,
    '& img': {
      width: 'auto',
      height: 'auto',
    }
  },
  cartGuest: {
    display: 'none',
    '& button': {
      fontSize: 12,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      borderRadius: 5,
      padding: '10px 15px',
      border: '1px solid #ffc600',
      outline: 'none',
    }
  },
  welcome: {
    color: color('rgb(255, 255, 255)').hex(),
    fontSize: 12,
    float: 'left',
    fontWeight: 'normal',
    '& span': {
      fontWeight: 'bold'
    },
  },
  signIn: {
    float: 'left',
    color: color('rgb(255, 198, 0)').hex(),
    background: 'transparent',
    margin: '0 5px'
  },
  signUp: {
    float: 'left',
    color: color('rgb(0, 0, 0)').hex(),
    background: color('rgb(255, 198, 0)').hex(),
    boxShadow: '0 0 20px 0 rgba(255, 198, 0, .5)',
  },
  cartUser: {
    '& $welcome': {
      marginTop: '-5px',
      marginBottom: 5,
      float: 'none'
    }
  },
  basketWrap: {
    background: 'rgba(255, 255, 235, .1)',
    padding: 2,
    cursor: 'pointer',
    '& button': {
      width: '100%',
      height: '100%',
      border: 0,
      background: 'transparent',
      display: 'flex',
      justifyContent: 'space-between',
      outline: 'none'
    }
  },
  itemsCount: {
    fontSize: 14,
    margin: 0,
    padding: '5px 10px',
  },
  totalPrice: {
    color: color('rgb(38, 38, 38)').hex(),
    background: color('rgb(255, 198, 0)').hex(),
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 5,
    margin: '-1px',
    lineHeight: '18px'
  },
  basketItems: {
    position: 'absolute',
    width: 'calc(100% - 30px)',
    borderRadius: '0 0 5px 5px',
    background: color('rgb(255, 255, 255)').hex(),
  },
  itemsWrap: {
    padding: 15,
    borderTop: '1px solid rgba(0, 0, 0, .1)',
  },
  item: {
    borderBottom: '2px solid rgba(0, 0, 0, .1)',
    fontWeight: 'bold',
    color: color('rgb(38, 38, 38)').hex(),
    fontSize: 16,
    padding: 5,
    display: 'block',
    '& span': {
      fontSize: 10,
      color: color('rgb(251, 61, 2)').hex()
    }
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: '-5px',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    transform: 'translateY(-100%)',

  },
  poster: {
    borderRadius: 5,
    float: 'left',
    marginRight: 10,
    display: 'block'
  },
  goToCheckout: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: 5,
    border: 'none',
    padding: '10px 15px',
    outline: 'none',
    display: 'block',
    margin: '0 auto',
    background: 'linear-gradient(to bottom, #fb3d02 0%,#fb6000 100%)',
    color: color('rgb(255, 255, 255)').hex(),
    boxShadow: '0 5px 10px 0 rgba(251, 61, 2, .3)',
    marginTop: 15,
  },
  openCart: {
    color: color('rgb(255, 92, 0)').hex(),
    display: 'block',
    marginTop: 10,
    textAlign: 'center',
    '&:hover, &:focus': {
      textDecoration: 'underline',
      color: color('rgb(255, 92, 0)').hex(),
    }
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
    const { classes } = this.props;
    const basketList = {
      wrap: {
        background: this.state.collapsed ? 'rgba(255, 255, 235, 1)' : 'rgba(255, 255, 235, .1)',
        color: this.state.collapsed ? 'black' : 'white',
        borderRadius: this.state.collapsed ? '5px 5px 0 0' : 5
      },
      items: {
        display: this.state.collapsed ? 'block' : 'none'
      }
    };
    return (<div><Grid className={classes.wrapper} fluid>
      <Row>
        <Grid>
          <Row>
            <Col md={4}>
              <ul className={classes.leftMenu}>
                <li className={classes.menuItem}>About Marketplace</li>
                <li className={classes.menuItem}>Contact Us</li>
                <li className={classes.menuItem}>Other link</li>
              </ul>
            </Col>
            <Col md={2} mdOffset={1}>
              <ul className={classes.centerMenu}>
                <li className={classes.menuItem}><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={classes.socialLink}><img alt="YouTube" src={require('../static/images/social/yt.png')} /></a></li>
                <li className={classes.menuItem}><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={classes.socialLink}><img alt="Twitter" src={require('../static/images/social/tw.png')} /></a></li>
                <li className={classes.menuItem}><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={classes.socialLink}><img alt="Facebook" src={require('../static/images/social/fb.png')} /></a></li>
                <li className={classes.menuItem}><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={classes.socialLink}><img alt="Instagram" src={require('../static/images/social/in.png')} /></a></li>
              </ul>
            </Col>
            <Col md={4} mdOffset={1}>
              <ul className={classes.rightMenu}>
                <li className={classes.menuItem}>
                  <Dropdown id="lang">
                    <Dropdown.Toggle className={classes.dropdownItem}>
                      GREAT BRITAIN
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <MenuItem eventKey="1">GREAT BRITAIN</MenuItem>
                      <MenuItem eventKey="2">USA</MenuItem>
                      <MenuItem eventKey="3">РАШКА</MenuItem>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className={classes.menuItem}>
                  <Dropdown id="lang">
                    <Dropdown.Toggle className={classes.dropdownItem}>
                      <img src={require('../static/images/langs/flag-en.png')} alt="EN" /> EN
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <MenuItem eventKey="1"><img src={require('../static/images/langs/flag-en.png')} alt="EN" /> EN</MenuItem>
                      <MenuItem eventKey="2"><img src={require('../static/images/langs/flag-en.png')} alt="GB" /> EN</MenuItem>
                      <MenuItem eventKey="3"><img src={require('../static/images/langs/flag-en.png')} alt="RU" /> EN</MenuItem>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className={classes.menuItem}>
                  <Dropdown id="currency">
                    <Dropdown.Toggle className={classes.dropdownItem}>
                      $USD
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <MenuItem eventKey="1">$ USD</MenuItem>
                      <MenuItem eventKey="2">&euro; EUR</MenuItem>
                      <MenuItem eventKey="3">&pound; GBP</MenuItem>
                      <MenuItem eventKey="4">Рубасики</MenuItem>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </Col>
          </Row>
        </Grid>
      </Row>
    </Grid>
      <Grid className={classes.menuWrapper} fluid>
        <Row>
          <Grid>
            <Row>
              <Col md={2} sm={2}>
                <img alt="logo" src={require('../static/images/violet/logo.png')} />
              </Col>
              <Col md={6} sm={10}>
                <ul className={classes.mainMenu}>
                  <li className={classes.mainMenuItem}>GAMES <span className={classes.caret} /></li>
                  <li className={classes.menuDelimiter} />
                  <li className={classes.mainMenuItem}>BESTSELLERS</li>
                  <li className={classes.menuDelimiter} />
                  <li className={classes.mainMenuItem}>SUPPORT</li>
                  <li className={classes.menuDelimiter} />
                  <li className={classes.mainMenuItem}>CS:GO CASE KEYS</li>
                </ul>
              </Col>
              <Col md={4} sm={12}>
                <div className={classes.cartGuest}>
                  <h5 className={classes.welcome}>Hi <span>Stranger</span>, you are not logged yet</h5>
                  <button className={classes.signIn}>sign in</button>
                  <button className={classes.signUp}>sign up</button>
                </div>
                <div className={classes.cartUser}>
                  <h5 className={classes.welcome}>Hi <span>User</span>, in shopping cart:</h5>
                  <div className={classes.basketWrap} style={basketList.wrap}>
                    <button onClick={this.collapse}>
                      <h5 className={classes.itemsCount}>2 items added</h5>
                      <span className={classes.totalPrice}>$18.99</span>
                    </button>
                  </div>
                  <div className={classes.basketItems} style={basketList.items}>
                    <div className={classes.itemsWrap}>
                      <div className={classes.item}>
                        <img className={classes.poster} src={require('../static/images/poster.jpg')} alt="" />
                        <h5 className={classes.itemTitle}>Thimbleweed Park</h5>
                        <span>remove</span>
                        <h5 className={classes.itemPrice}>$8.99</h5>
                      </div>
                      <div className={classes.item}>
                        <img className={classes.poster} src={require('../static/images/poster.jpg')} alt="" />
                        <h5 className={classes.itemTitle}>Thimbleweed Park</h5>
                        <span>remove</span>
                        <h5 className={classes.itemPrice}>$8.99</h5>
                      </div>
                      <button className={classes.goToCheckout}>go to checkout</button>
                      <a href="/" className={classes.openCart}>Open cart</a>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>
        </Row>
      </Grid></div>);
  }
}
