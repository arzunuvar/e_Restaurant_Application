import React, { Component } from 'react'
import { CallMethods } from '../helpers/Constants';
import BaseComponent from '../components/Base/BaseComponent';
import { Row, Button, Col, Card, CardHeader, CardBody } from 'reactstrap';

import placeholder from '../assets/img/img-placeholder.png'

export default class Menus extends BaseComponent {
    constructor(props) {
        super(props)

        this.state = {
            menuList: [],
        }
    }

    componentDidMount() {
        var options = {
            method: CallMethods.POST,
            controller: "menu",
            action: "getmenus",
            data: {
                guid: this.props.restaurant.guid
            },
            success: function (response) {
                this.setState({
                    menuList: response.content,
                })
                console.log(response)
            }.bind(this),
            error: function (error) {
                console.log(error)
            }
        };
        this.APICall(options);
    }

    prepareMenuList = () => {
        return this.state.menuList.map((item, index) => {
            return (
                <Card style={{ maxWidth: "45rem", marginBottom: "1rem" }} key={index}>
                    <CardHeader className="bg-gradient-purpele">
                        <h5 className="card-header-restaurant">{item.title}</h5>
                    </CardHeader>
                    <CardBody >
                        {
                            item.menuList.map((t, i) => {
                                return (
                                    <Row key={i}>
                                        <Col xs="3" sm="3" md="3" lg="3" style={{textAlign:"center",margin:"auto"}}>
                                            <img src={t.logo != null ? t.logo : placeholder} style={{ maxWidth: "6rem", maxHeight: "4rem" }} alt="" />
                                        </Col>
                                        <Col xs="5" sm="5" md="5" lg="6" style={{margin:"auto"}}>
                                            <h3>{t.name}</h3>
                                            <h5>{t.description}</h5>
                                        </Col>
                                        <Col xs="4" sm="4" md="4" lg="3" style={{margin:"auto"}}>
                                            <Row>
                                                <Col xs="3" sm="3" md="3" lg="3">
                                                    <input type="number" min="0" max="99" defaultValue={t.count} style={{ maxWidth: "35px", fontSize: "10px", paddingLeft: "3px" }} onChange={(e) => t.count = e.target.value} />
                                                </Col>
                                                <Col xs="9" sm="9" md="9" lg="9" >
                                                    <h5 style={{ whiteSpace: "nowrap", marginTop: "4px" }}>Tutar: {t.amount} TL</h5>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="12" sm="12" md="12" lg="12">
                                                    <Button className="primary" type="submit" onClick={(e) => this.props.setOrders(t)}>Sepete Ekle</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                        <hr />
                    </CardBody>
                </Card>
            )
        })
    }

    render() {
        return (
            <div>
                {this.prepareMenuList()}
            </div>
        )
    }
}
