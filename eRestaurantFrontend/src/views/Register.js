import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

import SimpleFooter from "../components/Footers/SimpleFooter.js";
import LocationSearchInput from "../components/LocationSearchInput.js";
import { CallMethods } from "../helpers/Constants.js";
import { createNotification } from "../components/Notification.js";
import { IsNullOrEmpty } from "../helpers/Checker.js";
import BaseComponent from "../components/Base/BaseComponent.js";

class Register extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      name: "",
      surname: "",
      email: "",
      phoneNumber: "",
      address: "",
      latLng: "",
      preAddress: ""
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  handleOnClick = (e) => {
    e.preventDefault();
    console.log("geldi")
    console.log(this.state)
    if (IsNullOrEmpty(this.state.username) ||
      IsNullOrEmpty(this.state.password) ||
      IsNullOrEmpty(this.state.name) ||
      IsNullOrEmpty(this.state.surname) ||
      IsNullOrEmpty(this.state.email) ||
      IsNullOrEmpty(this.state.phoneNumber) ||
      IsNullOrEmpty(this.state.preAddress) ||
      IsNullOrEmpty(this.state.address)) {
      return createNotification("warning", "Lütfen tüm alanları eksiksiz doldurunuz.")
    }

    var options = {
      method: CallMethods.POST,
      controller: "user",
      action: "registration",
      data: {
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        address: this.state.preAddress.concat(this.state.address),
        lat: this.state.latLng.lat,
        lng: this.state.latLng.lng
      },
      success: function (response) {
        console.log(response.succeeded)
        if (response.succeeded == false) {
          return createNotification("warning", "Lütfen bir başka username seçiniz. Bu user name bir başkası tarafından kullanılmaktadır.")
        }
        this.props.history.push("/login");
      }.bind(this),
      error: function (error) {
        console.log(error)
      }
    };

    this.APICall(options);
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleOnClick()
    }
  }

  getLatLng = (result, address) => {
    console.log(result)
    this.setState({
      latLng: result,
      preAddress: address.concat(" ")
    })
  }



  render() {
    return (
      <>
        <main ref="main">
          <section className="section section-shaped section-lg" style={{ overflow: "auto" }}>
            <div className="shape shape-style-1 bg-gradient-purpele">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-12">
              <Row className="justify-content-center" style={{ marginBottom: "10rem" }}>
                <Col lg="8">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <h1 style={{ textAlign: "center", color: "#8965e0", marginTop: "10px" }}>e-Restaurant</h1>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form role="form">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-single-02" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Kullanıcı Adı" type="text" name="username" onChange={this.handleOnChange} />
                              </InputGroup>
                            </FormGroup>

                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-email-83" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Email" type="email" name="email" onChange={this.handleOnChange} />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-lock-circle-open" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  placeholder="Şifre"
                                  type="password"
                                  name="password"
                                  autoComplete="off"
                                  onChange={this.handleOnChange}
                                />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <LocationSearchInput getLatLng={this.getLatLng} styleName='location-search-style' />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-single-02" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="İsim" type="text" name="name" onChange={this.handleOnChange} />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-single-02" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Soyisim" type="text" name="surname" onChange={this.handleOnChange} />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-mobile-button" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  placeholder="Telefon numarası"
                                  type="phoneNumber"
                                  autoComplete="off"
                                  name="phoneNumber"
                                  onChange={this.handleOnChange}
                                />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-map-big" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  placeholder="Adres"
                                  type="textarea"
                                  autoComplete="off"
                                  rows="1"
                                  name="address"
                                  onChange={this.handleOnChange}
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>

                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="button"
                            onClick={this.handleOnClick.bind(this)}
                          >
                            Kayıt ol
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                    </Col>
                    <Col className="text-right" xs="6">
                      <a
                        className="text-light"
                        href="/login"
                      >
                        <small>Bir hesabım var.</small>
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Register;
