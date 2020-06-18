import React from 'react'
import { CallMethods } from '../../helpers/Constants';
import BaseComponent from '../../components/Base/BaseComponent';
import {
    Table,
} from "reactstrap";
import AddMenu from './AddMenu';

export default class MenuList extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            restaurantList: [],
            menuList: [],
            changePage: false,
            selectedItemIndex: 0,
            selectedItem: {},
        }

        this.getAllMenu = this.getAllMenu.bind(this);
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

                }, () => this.getAllMenu()).bind(this)
                console.log(response)
            }.bind(this),
            error: function (error) {
                console.log(error)
            }
        };

        this.APICall(options);


    }


    getAllMenu() {
        var options = {
            method: CallMethods.POST,
            controller: "menu",
            action: "getMenuList",
            data: {
                guid: this.state.restaurantSelectedItem
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

    handleOnClickDelete(e) {
        e.preventDefault()

        var options = {
            method: CallMethods.POST,
            controller: "menu",
            action: "deleteMenu",
            data: {
                guid: e.target.id
            },
            success: function (response) {
                this.getAllMenu();
            }.bind(this),
            error: function (error) {
                console.log(error)
            }
        };

        this.APICall(options);

    }

    handleOnclickUpdate(e) {

        this.setState({
            changePage: !this.state.changePage,
            selectedItemIndex: e.target.key,
            selectedItem : JSON.parse(e.target.id)
        })
    }

    handleSelectChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => this.getAllMenu());
    }

    prepareTableContent = () => {
        return this.state.menuList.map((item, index) => {
            return (<tr key={index}>
                <th scope="row" style={{ paddingTop: "2rem" }}><h5 style={{ color: "grey" }}>{index + 1}</h5></th>
                <td><img src={item.logo} style={{ maxWidth: "5rem" }} /></td>
                <td style={{ paddingTop: "2rem" }}><p style={{ fontSize: "18px", fontFamily: "ariel" }}>{item.name}</p></td>
                <td style={{ paddingTop: "2rem" }}><p style={{ fontSize: "16px", fontFamily: "ariel" }}>{item.description}</p></td>
                <td style={{ paddingTop: "2rem" }}><p style={{ fontSize: "16px", fontFamily: "ariel" }}>{item.amount} TL </p></td>
                <td style={{ paddingTop: "2rem" }}><button type="submit" id={item.guid} className="btn btn-secondary" style={{ marginRight: "5px" }} onClick={(e) => this.handleOnClickDelete(e)}>Sil</button>
                    <button type="submit" id={JSON.stringify(item)} key={index} className="btn btn-primary" onClick={(e) => this.handleOnclickUpdate(e)}>Düzenle</button> </td>
            </tr>)
        })
    }

    render() {
        return (
            <div style={{ marginBottom: "3rem" }}>

                {this.state.changePage ?
                    <AddMenu item={this.state.selectedItem} />
                    :
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
                                    <th scope="col">Menu Adı</th>
                                    <th scope="col">Açıklaması</th>
                                    <th scope="col">Fiyatı</th>
                                    <th scope="col">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.prepareTableContent()}
                            </tbody>
                        </Table>
                    </div>
                }
            </div>
        )
    }
}
