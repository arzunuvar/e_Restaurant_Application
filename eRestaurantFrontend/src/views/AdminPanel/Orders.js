import React from 'react'
import { Table } from 'reactstrap';
import { CallMethods } from '../../helpers/Constants';
import BaseComponent from '../../components/Base/BaseComponent';

export default class Orders extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            restaurantList: [],
            selectedItemIndex: 0,
            selectedOrderGuid: "",
        }

        this.getOrdersByRestaurant = this.getOrdersByRestaurant.bind(this);
    }

    componentDidMount() {
        var options = {
            method: CallMethods.GET,
            controller: "restaurant",
            action: "getRestaurantList",
            success: function (response) {
                this.setState({
                    restaurantList: response.content,
                    restaurantSelectedItem: response.content[0].guid
                }, () => this.getOrdersByRestaurant()).bind(this)
                console.log(response)
            }.bind(this),
            error: function (error) {
                console.log(error)
            }
        };

        this.APICall(options);
    }

    getOrdersByRestaurant() {
        var options = {
            method: CallMethods.POST,
            controller: "order",
            action: "getOrdersByRestaurant",
            data: {
                guid: this.state.restaurantSelectedItem
            },
            success: function (response) {
                this.setState({
                    orders: response.content,
                })
                console.log(response)
            }.bind(this),
            error: function (error) {
                console.log(error)
            }
        };

        this.APICall(options);
    }

    handleOnClickDelete(e) {
        e.preventDefault()

        var options = {
            method: CallMethods.POST,
            controller: "order",
            action: "deleteMenu",
            data: {
                guid: e.target.id
            },
            success: function (response) {
                this.getOrdersByRestaurant();
            }.bind(this),
            error: function (error) {
                console.log(error)
            }
        };

        this.APICall(options);

    }

    updateOrder(e){
        console.log(e.target.id)
        var options = {
            method: CallMethods.POST,
            controller: "order",
            action: "updateOrder",
            data: {
                orderGuid: e.target.id,
                status : e.target.value
            },
            success: function (response) {
                this.getOrdersByRestaurant();
            }.bind(this),
            error: function (error) {
                console.log(error)
            }
        };

        this.APICall(options);
    }

    handleSelectChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => this.getOrdersByRestaurant());
    }

    prepareTableContent = () => {
        return this.state.orders.map((item, index) => {
            console.log(item)
            return (<tr key={index}>
                <th scope="row" style={{ paddingTop: "2rem" }}><h5 style={{ color: "grey" }}>{index + 1}</h5></th>
                <td><img src={item.restaurantLogo} style={{ maxWidth: "5rem" }} /></td>
                <td style={{ paddingTop: "2rem" }}><p style={{ fontSize: "18px", fontFamily: "ariel" }}>{item.restaurantName}</p></td>
                <td>{item.orders.map((t, i) => {
                    return <p style={{ fontSize: "16px", fontFamily: "ariel",marginBottom:"0px" }}>{t.name}</p>
                })}</td>
                <td style={{ paddingTop: "2rem" }}><p style={{ fontSize: "16px", fontFamily: "ariel" }}>{item.orders.map((t, i) => t.amount * t.count)} TL </p></td>
                <td style={{ paddingTop: "2rem" }}><p style={{ fontSize: "16px", fontFamily: "ariel" }}>{item.date}</p></td>
                <td style={{ paddingTop: "2rem" }}>
                    <select className="form-control" id={item.orderGuid} name={"statusSelectedItem"} value={item.status}
                        onChange={(e) => this.updateOrder(e)}>
                        <option value={0}>Hazırlanıyor</option>
                        <option value={1}>Yolda</option>
                        <option value={2}>Teslim edildi</option>
                        <option value={3}>İptal edidli</option>
                    </select>
                </td>
            </tr>)
        })
    }

    render() {
        return (
            <div  style={{marginBottom:"3rem"}}>
                <div className="form-group">
                    <div className="row" style={{ marginBottom: "5px" }}>
                        <div className="col-md-12">
                            <label htmlFor="exampleFormControlSelect1">Restaurant seç</label>
                        </div>
                        <div className="col-md-12">
                            <select className="form-control" name="restaurantSelectedItem" id="exampleFormControlSelect1" style={{ maxWidth: "20rem" }} value={this.state.restaurantSelectedItem}
                                onChange={(e) => this.handleSelectChange(e)}>
                                {this.state.restaurantList.map((item, index) => {
                                    return <option key={index} value={item.guid}> {item.name} </option>
                                })
                                }
                            </select>
                        </div>
                    </div>
                    <Table className="align-items-center" responsive>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Logo</th>
                                <th scope="col">Restoran</th>
                                <th scope="col">Menü</th>
                                <th scope="col">Fiyatı</th>
                                <th scope="col">Tarih</th>
                                <th scope="col">Durumu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.prepareTableContent()}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}
