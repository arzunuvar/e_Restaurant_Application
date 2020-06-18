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

import { createNotification } from '../components/Notification'
import { IsNullOrEmpty } from '../helpers/Checker';
import { CallMethods } from '../helpers/Constants';

import SimpleFooter from "../components/Footers/SimpleFooter.js";
import BaseComponent from "../components/Base/BaseComponent";

class Login extends BaseComponent {


  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }


  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  handleOnClick = (e) => {
    e.preventDefault();
    console.log(this.state.email)
    if (IsNullOrEmpty(this.state.email) || IsNullOrEmpty(this.state.password)) {
      return createNotification('warning', "Lütfen kullanıcı adı ve şifrenizi giriniz.")
    }

    var options = {
      method: CallMethods.POST,
      controller: "user",
      action: "authenticate",
      data: {
        username: this.state.email,
        password: this.state.password
      },
      success: function (response) {
        localStorage.setItem("user", JSON.stringify(response.content))
        localStorage.setItem("accessToken", response.content.accessToken);
        this.props.history.push("/");
      }.bind(this),
      error: function (response) {
        createNotification('warning', "Kullanıcı Adı veya Şifreniz hatalı. Lütfen kontrol edip tekrar deneyiniz.")
      }
    };

    this.APICall(options);

  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleOnClick(e)
    }
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
            <Container className="pt-lg-5">
              <Row className="justify-content-center" style={{ marginBottom: "5rem" }}>
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <h1 style={{ textAlign: "center",color: "#8965e0",marginTop:"10px" }}>e-Restaurant</h1>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form role="form">
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Kullanıcı Adı" type="email" name="email" onChange={(e) => this.handleOnChange(e)} />
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
                              onChange={(e) => this.handleOnChange(e)}
                              onKeyPress={(e) => {e.key === 'Enter' && this._handleKeyDown(e)}}
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="button"
                            onClick={(e) => this.handleOnClick(e)}
                          >
                            Giriş
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
                        href="/registration"
                      >
                        <small>Yeni hesap oluştur.</small>
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

export default Login;
