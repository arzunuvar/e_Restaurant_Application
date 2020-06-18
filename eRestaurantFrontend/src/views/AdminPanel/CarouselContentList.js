import React from 'react'
import BaseComponent from '../../components/Base/BaseComponent';
import { CallMethods } from '../../helpers/Constants';
import { Table } from 'reactstrap';

export default class CarouselContentList extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            carouselList: [],
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
            method: CallMethods.POST,
            controller: "advertisement",
            action: "getcarouselcontents",
            success: function (response) {
                this.setState({
                    carouselList: response.content,
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
            controller: "advertisement",
            action: "deleteCarousel",
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

    handleIsActiveChange(e){
        var options = {
            method: CallMethods.POST,
            controller: "advertisement",
            action: "updateCarouselIsActive",
            data: {
                id: e.target.id
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

    prepareTableContent = () => {
        return this.state.carouselList.map((item, index) => {
            return (<tr>
                <th scope="row" style={{ paddingTop: "2rem" }}><h5 style={{ color: "grey" }}>{index + 1}</h5></th>
                <td><img src={item.source} style={{ maxWidth: "5rem" }} /></td>
                <td style={{ paddingTop: "2rem" }}><p style={{ fontSize: "18px", fontFamily: "ariel" }}>{item.header}</p></td>
                <td style={{ paddingTop: "2rem" }}><p style={{ fontSize: "16px", fontFamily: "ariel" }}>{item.caption}</p></td>
                <td style={{ paddingTop: "2rem", margin:'auto' }}>
                    <input
                        id={item.id}
                        type="checkbox"
                        name="isActive"
                        defaultChecked={item.isActive}
                        onChange={(e) => this.handleIsActiveChange(e)}
                    /></td>
                <td style={{ paddingTop: "2rem" }}><button type="submit" id={item.id} className="btn btn-secondary" style={{ marginRight: "5px" }} onClick={(e) => this.handleOnClickDelete(e)}>Sil</button></td>
            </tr>)
        })
    }

    render() {
        return (
            <div style={{ marginBottom: "3rem" }}>
                <Table className="align-items-center" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Resim</th>
                            <th scope="col">Başlık</th>
                            <th scope="col">Açıklaması</th>
                            <th scope="col">Görünürlük</th>
                            <th scope="col">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.prepareTableContent()}
                    </tbody>
                </Table>
            </div>
        )
    }
}
