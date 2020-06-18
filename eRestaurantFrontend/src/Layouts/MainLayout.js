import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Home from '../views/Home'
import CustomNavbar from '../components/Navbars/CustomNavbar'
import SimpleFooter from '../components/Footers/SimpleFooter'
import Restaurants from '../views/Restaurants'
import PrivateBaseComponent from '../components/Base/PrivateBaseComponent'

import { Container, Card, Col, Row, CardHeader, CardBody, Button } from "reactstrap";
import placeholder from '../assets/img/img-placeholder.png'
import { IsNullOrEmpty } from '../helpers/Checker'
import { CallMethods } from '../helpers/Constants'
import { createNotification } from '../components/Notification'

export default class MainLayout extends PrivateBaseComponent {


    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }

        this.setOrders = this.setOrders.bind(this);
    }

    componentDidMount() {
        let tempOrders = localStorage.getItem("orders");
        if (tempOrders != null) {
            this.setState({
                orders: JSON.parse(tempOrders)
            });
        }
    }

    setOrders = (order) => {
        console.log(order)
        if (!IsNullOrEmpty(order)) {
            var tempOrders = this.state.orders.length != 0 ? this.state.orders : [];

            if (tempOrders.length != 0) {
                let flag = false;
                var index = 0;
                for (var i = 0; i < tempOrders.length; i++) {
                    console.log(tempOrders[i].guid)
                    console.log(order.guid)
                    if (tempOrders[i].guid == order.guid) {
                        flag = true;
                        index = i;
                    }
                }

                if (flag) {
                    createNotification("warning", "Ürün sepetinizde bulunmaktadır.")
                } else {
                    tempOrders.push(order)
                }
            } else {
                tempOrders.push(order);
            }
            localStorage.setItem('orders', JSON.stringify(tempOrders))
            this.setState({
                orders: tempOrders
            });
        }
    }

    handleSubmitOrders(e) {
        e.preventDefault();

        let dataList = [];
        this.state.orders.forEach(element => {
            dataList.push({
                guid: element.guid,
                amount: element.amount,
                count: element.count,
                restaurantGuid: element.restaurantGuid
            })
        });

        var options = {
            method: CallMethods.POST,
            controller: "order",
            action: "addorder",
            data: dataList,
            success: function (response) {
                createNotification("success", "Siparişiniz başarıyla alınmıştır.")
                localStorage.removeItem('orders');
                this.setState({
                    orders: []
                })
                console.log(response)
            }.bind(this),
            error: function (error) {
                createNotification("warning", "Siparişinizi alırken bir hata oluştu lütfen tekrar deneyiniz.")
                console.log(error)
            }
        };
        this.APICall(options);

    }

    deleteOrder(e) {
        let tempOrders = this.state.orders;

        delete tempOrders[e.target.id];
        this.setState({
            orders: tempOrders.filter(n => n)
        }, () => localStorage.setItem('orders', JSON.stringify(this.state.orders)));
    }

    prepareOrders() {
        return this.state.orders.map((item, index) => {
            return <div key={index} ><Row >
                <i
                    className="ni ni-fat-remove"
                    id={index}
                    style={{ position: "absolute", right: "0", marginRight: "20px", cursor: "pointer", zIndex: "2" }}
                    onClick={(e) => this.deleteOrder(e)} />
                <Col xs="3" sm="3" md="3" lg="3" >
                    <img src={item.logo != null ? item.logo : placeholder} style={{ maxWidth: "3rem", maxHeight: "3rem", marginTop: "5px" }} alt="" />
                </Col>
                <Col xs="9" sm="9" md="9" lg="9">
                    <Row>
                        <Col xs="12" sm="12" md="12" lg="12">
                            <h4>{item.name}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" sm="12" md="12" lg="12">
                            <h6>{item.description}</h6>
                        </Col>
                    </Row>
                </Col>
            </Row>
                <Row>
                    <Col xs="6" sm="6" md="6" lg="6">
                        <h5 style={{ whiteSpace: "nowrap", marginTop: "4px" }}>Tutar: {item.amount} TL</h5>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg="6" style={{ margin: "auto" }}>
                        <input type="number" min="1" max="99" defaultValue={item.count} style={{ maxWidth: "35px", fontSize: "10px", float: "right", paddingLeft: "3px" }} onChange={(e) => item.count = e.target.value} />
                    </Col>
                </Row>
                <hr />
            </div>
        });

    }

    totalAmount() {
        let total = 0;
        this.state.orders.forEach(item => {
            total += item.amount * item.count
        })
        return total;
    }

    render() {
        return (
            <div>
                <section className="section section-shaped section-nav section-sm">
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
                </section>
                <CustomNavbar />
                <Container className="pt-lg-5">
                    <Row style={{ marginBottom: "5rem" }}>
                        <Col xs="12" sm="12" md="3" lg="3" style={{ margin: "auto", marginTop: "0px" }}>
                            <Row >
                                <Card style={{ maxWidth: "45rem", width: "100%", marginBottom: "2rem", padding: "1rem" }} className="bg-bag">
                                    <Row >
                                        <Col xs="3" sm="3" md="3" lg="3" style={{ margin: "auto", textAlign: "center" }}>
                                            <i className="ni ni-single-02"  style={{color:"white"}}/>
                                        </Col>
                                        {localStorage.getItem("user") != null ?
                                            <Col xs="9" sm="9" md="9" lg="9">
                                                <h5 style={{color:"white"}}>{this.getCurrentUser().name} {this.getCurrentUser().surname}</h5>
                                                <h6 style={{color:"white"}}>{this.getCurrentUser().email}</h6>
                                            </Col>
                                            : ""
                                        }
                                    </Row>
                                </Card>
                            </Row>
                            <Row style={{ marginBottom: "2rem" }}>
                                <Card style={{ maxWidth: "45rem", width: "100%" }}>
                                    <CardHeader className="bg-bag">
                                        <h5 className="card-header-restaurant" >Sepetim</h5>
                                    </CardHeader>
                                    <CardBody>
                                        {this.state.orders.length != 0 && this.prepareOrders()}
                                        {
                                            this.state.orders.length != 0 ?
                                                <Row>
                                                    <Col md="12" >
                                                        Toplam : {this.totalAmount()}
                                                    </Col>
                                                    <Col md="12">
                                                        <hr />
                                                        <Button color="primary" type="button" style={{ width: "100%", backgroundColor: "#8965e0", border: "none" }} onClick={(e) => this.handleSubmitOrders(e)}>Siparişi ver</Button>
                                                    </Col>
                                                </Row> :
                                                <h4 style={{ color: "grey", textAlign: "center" }}>Sepetiniz boş.</h4>}
                                    </CardBody>
                                </Card>
                            </Row>
                        </Col>
                        <Col xs="12" sm="12" md="9" lg="9">
                            <Switch>
                                <Route path="/" exact render={(props) => <Home {...props} />} />
                                <Route path="/restaurants" exact render={(props) => <Restaurants {...props} setOrders={this.setOrders} />} />
                                <Redirect to="/" />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
                <SimpleFooter />
            </div>
        )
    }
}
