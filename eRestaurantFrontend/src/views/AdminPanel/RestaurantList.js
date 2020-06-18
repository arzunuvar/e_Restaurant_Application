import React, { Component } from 'react'
import { CallMethods } from '../../helpers/Constants';
import {
    Table,
} from "reactstrap";
import BaseComponent from '../../components/Base/BaseComponent';
import AddMenu from './AddMenu';
import AddRestaurant from './AddRestaurant';

export default class RestaurantList extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            restaurantList: [],
            changePage: false,
            selectedItemIndex: 0
        }

        this.getAllRestaurant = this.getAllRestaurant.bind(this);
    }

    componentDidMount() {
        this.getAllRestaurant();
    }


    getAllRestaurant() {
        var options = {
            method: CallMethods.GET,
            controller: "restaurant",
            action: "getRestaurantList",
            success: function (response) {
                this.setState({
                    restaurantList: response.content,
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

        console.log(e.target.id)
        var options = {
            method: CallMethods.POST,
            controller: "restaurant",
            action: "deleteRestaurant",
            data: {
                guid: e.target.id
            },
            success: function (response) {
                this.getAllRestaurant();
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
            selectedItem:  JSON.parse(e.target.id)
        })
    }


    prepareTableContent = () => {
        return this.state.restaurantList.map((item, index) => {
            return (<tr>
                <th scope="row" style={{ paddingTop: "2rem" }}><h5 style={{color:"grey"}}>{index + 1}</h5></th>
                <td><img src={item.logo} style={{ maxWidth: "5rem"}} /></td>
                <td style={{ paddingTop: "2rem" }}><p style={{fontSize:"18px", fontFamily:"ariel"}}>{item.name}</p></td>
                <td style={{ paddingTop: "2rem" }}><p style={{fontSize:"16px", fontFamily:"ariel"}}>{item.description}</p></td>
                <td style={{ paddingTop: "2rem" }}><button type="submit" id={item.guid} className="btn btn-secondary" style={{ marginRight: "5px" }} onClick={(e) => this.handleOnClickDelete(e)}>Sil</button>
                    <button type="submit" id={JSON.stringify(item)} className="btn btn-primary" onClick={(e) => this.handleOnclickUpdate(e)}>Düzenle</button> </td>
            </tr>)
        })
    }

    render() {
        return (
            <div  style={{marginBottom:"3rem"}}>
                {!this.state.changePage ? 
                
                <Table className="align-items-center" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Logo</th>
                            <th scope="col">Restoran Adı</th>
                            <th scope="col">Açıklaması</th>
                            <th scope="col">İşlemler</th>
                            <th scope="col" />
                        </tr>
                    </thead>
                    <tbody>
                        {this.prepareTableContent()}
                    </tbody>
                </Table>
                :
                <AddRestaurant item={this.state.selectedItem} />
                }
            </div>
        )
    }
}
