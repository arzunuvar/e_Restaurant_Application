import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import BaseComponent from "../Base/BaseComponent";

class CustomNavbar extends BaseComponent {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link} >
                <h2 style={{ color: "white" }} >e-Restaurant</h2>
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <h3 style={{ color: "#3b2e78" }} >e-Restaurant</h3>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className=" ml-lg-4" navbar>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="/"
                      id="home"
                    >
                      Anasayfa
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="/restaurants"
                      id="restaurants"
                    >
                      Restoranlar
                    </NavLink>
                  </NavItem>
                  { this.getCurrentUser() && this.getCurrentUser().type == 1 ?
                    < NavItem >
                      <NavLink
                        className="nav-link-icon"
                        href="/adminpanel"
                        id="adminpanel"
                      >
                        Admin Panel
                    </NavLink>
                    </NavItem>
                    : ""
                  }
                  < NavItem >
                    <NavLink
                      className="nav-link-icon"
                      href="/login"
                      id="exist"
                      style={{ float: "right", marginRight: "1rem", cursor: "pointer", marginLeft:"5rem"}}
                      onClick={this.logout.bind(this)}
                    >
                      <small >
                        <i style={{ fontSize: "14px" }}> Çıkış </i>
                      </small>
                    </NavLink>
                  </NavItem>

                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default CustomNavbar;
