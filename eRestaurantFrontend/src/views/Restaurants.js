import React from 'react'
import { Card, CardBody, CardText, CardHeader, Row, Col } from 'reactstrap';
import { CallMethods } from '../helpers/Constants';
import BaseComponent from '../components/Base/BaseComponent';
import Menus from './Menus';
import ResturantTabs from './RestaurantTabs';
import Rating from 'react-rating';

export default class Restaurants extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            restaurantList: [],
            menuList: [],
            changePage: false,
            restaurant: "",
            search: ""
        }
    }

    componentDidMount() {
        this.showLoader();
        this.getRestaurantList()
    }

    handleOnclikRestaurant(e, item) {
        e.preventDefault();
        this.setState({
            changePage: true,
            restaurant: item
        })
    }

    prepareRestaurantList = () => {
        return this.state.restaurantList.map((item, index) => {
            return <div key={index} ><Row >
                <Col xs="3" sm="3" md="3" lg="3" style={{ textAlign: "center" }}>
                    <img src={item.logo} style={{ maxWidth: "4rem", maxHeight: "3rem" }} />
                </Col>
                <Col xs="9" sm="9" md="9" lg="9" style={{ textAlign: "center", margin: "auto" }}>
                    <Row style={{ marginBottom: "5px" }}>
                        <Col style={{ textAlign: "left" }}>
                            <h4 href="" id={item.guid} style={{ color: "black", fontSize: "14px", cursor: "pointer" }} className="restaurant-card" onClick={(e) => this.handleOnclikRestaurant(e, item)} >{item.name}</h4>
                        </Col>
                        <Col  >
                            <label >Restoran Puanı : </label>
                            <Rating
                                initialRating={item.rating}
                                start={0}
                                stop={5}
                                readonly={true}
                                emptySymbol="far fa-star "
                                fullSymbol="fa fa-star "
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ textAlign: "left" }}>
                            <p style={{ fontSize: "12px", fontFamily: "arial" }} >{item.description}</p>
                        </Col>
                    </Row>
                </Col>

                {index != this.state.restaurantList.length && <hr />}
            </Row>
                <hr />
            </div>
        });
    }

    getRestaurantList() {
        var options = {
            method: CallMethods.GET,
            controller: "restaurant",
            action: "getRestaurantList",
            params: { search: this.state.search },
            success: function (response) {
                this.setState({
                    restaurantList: response.content,
                })
                console.log(response)
            }.bind(this),
            error: function (error) {
                console.log(error)
            },
            loader: false
        };

        this.APICall(options);
    }

    onChangeHandleSearch(e) {
        this.setState({
            search: e.target.value
        }, () => this.getRestaurantList())
    }

    render() {
        return (
            <div>
                {!this.state.changePage ?
                    <Card style={{ maxWidth: "45rem" }}>
                        <CardHeader className="bg-gradient-purpele">
                            <Row style={{ padding: "0px 10px" }}>
                                <Col>
                                    <h5 className="card-header-restaurant">Restoranlar</h5>
                                </Col>
                                <Col>
                                    <input type="search" placeholder="Ara" className="search-input" onChange={(e) => this.onChangeHandleSearch(e)} />
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {this.prepareRestaurantList()}
                        </CardBody>
                    </Card>
                    : <ResturantTabs restaurant={this.state.restaurant} setOrders={this.props.setOrders} />
                }
            </div>
        )
    }
}
