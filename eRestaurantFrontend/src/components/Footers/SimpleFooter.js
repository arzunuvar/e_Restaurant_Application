import React from "react";
// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

class SimpleFooter extends React.Component {
  render() {
    return (
      <>
        <footer className="footer">
          <Container>
            <Row className=" align-items-center justify-content-md-between">
              <Col xs="6" sm="6" md="6" lg="6">
                <div className=" copyright">
                  © {new Date().getFullYear()}{" "}
                  <a
                  >
                    e-Restaurant
                  </a>
                  .
                </div>
              </Col>
              <Col xs="6" sm="6" md="6" lg="6">
                <Nav className=" nav-footer justify-content-end">
                  <NavItem>
                    <a >
                       All rights reserved.
                    </a>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default SimpleFooter;
