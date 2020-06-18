import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Collapse,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  createLinks = routes => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };
  render() {
    const { bgColor, routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    return (
      <Navbar
        className="navbar-vertical fixed-left"
        expand="sm"
        id="sidenav-main"
      >
        <Container fluid>
          <div className=" d-md-none">
            <Row>
              {logo ? (
                  <Col xs="6">
                    {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                </Col>
              ) : null}
              <Col xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar >{this.createLinks(routes)}</Nav>
          <hr className="my-3" />
          <Nav className="mb-md-3" navbar style={{
            position: "absolute",
            marginTop: "4rem"
          }}>
            <NavItem>
              <NavLink className="dark-navlink" style={{ color: "black" }} href="/adminpanel/restaurantlist">
                <i className="ni ni-bullet-list-67" />
                  Restoran Listesi
                </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="dark-navlink" href="/adminpanel/addrestaurant">
                <i className="ni ni-fat-add" />
                  Restoran Ekle
                </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="dark-navlink" href="/adminpanel/menulist">
                <i className="ni ni-bullet-list-67" />
                  Menü Listesi
                </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="dark-navlink" href="/adminpanel/addmenu">
                <i className="ni ni-fat-add" />
                  Menü Ekle
                </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="dark-navlink" href="/adminpanel/orders">
                <i className="ni ni-shop" />
                  Orders
                </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="dark-navlink" href="/adminpanel/addcarousel">
                <i className="ni ni-image" />
                   Carousel Ekle
                </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="dark-navlink" href="/adminpanel/carousellist">
                <i className="ni ni-bullet-list-67" />
                   Carousel Listesi
                </NavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
