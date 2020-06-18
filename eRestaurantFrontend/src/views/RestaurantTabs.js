import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col
} from "reactstrap";
import Menus from "./Menus";
import Comments from "./Comments";
import Rating from "react-rating";

class Tabs extends React.Component {
  state = {
    tabs: 1
  };
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };
  render() {
    var { restaurant } = this.props;

    return (
      <>

        <Card style={{ maxWidth: "45rem", marginBottom: "1.4rem", height: "5rem" }}  className="bg-gradient-purpele">
            <Row>
              <Col xs="3" sm="3" md="3" lg="3" style={{ textAlign: "center", margin: "auto" }}>
                <img src={restaurant.logo} style={{ maxWidth: "6rem", maxHeight: "4rem" }} />
              </Col>
              <Col xs="9" sm="9" md="9" lg="9" style={{ marginTop: "10px" }}>
                <Row >
                  <Col>
                    <h4 id={restaurant.guid} style={{ fontSize: "20px",color:"white" }} >{restaurant.name}</h4>
                  </Col>
                  <Col>
                    <label style={{color:"white"}}>Restoran Puanı: </label>
                    <Rating
                      initialRating={restaurant.rating}
                      start={0}
                      stop={5}
                      readonly={true}
                      emptySymbol="far fa-star "
                      fullSymbol="fa fa-star "
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h5 style={{color:"white"}}>{restaurant.description}</h5>
                  </Col>
                </Row>
              </Col>
            </Row>
        </Card>
        <div className="nav-wrapper" style={{ maxWidth: "45rem" }}>
          <Nav
            className="nav-fill flex-column flex-md-row"
            id="tabs-icons-text"
            pills
            role="tablist"
          >
            <NavItem>
              <NavLink
                aria-selected={this.state.tabs === 1}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 1
                })}
                onClick={e => this.toggleNavs(e, "tabs", 1)}
                href="#pablo"
                role="tab"
              >
                <i className="ni ni-basket mr-2" />
                Yemekler
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={this.state.tabs === 2}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 2
                })}
                onClick={e => this.toggleNavs(e, "tabs", 2)}
                href="#pablo"
                role="tab"
              >
                <i className="ni ni-bell-55 mr-2" />
                Yorumlar
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <TabContent activeTab={"tabs" + this.state.tabs}>
          <TabPane tabId="tabs1">
            <Menus setOrders={this.props.setOrders} restaurant={this.props.restaurant} />
          </TabPane>
          <TabPane tabId="tabs2">
            <p className="description">
              <Comments restaurant={this.props.restaurant} />
            </p>
          </TabPane>
        </TabContent>
      </>
    );
  }
}

export default Tabs;