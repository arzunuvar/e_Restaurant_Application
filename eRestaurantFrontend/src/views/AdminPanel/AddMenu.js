import React from 'react'
import CONSTANTS, { CallMethods } from '../../helpers/Constants';
import { IsNullOrEmpty } from '../../helpers/Checker';
import { createNotification } from '../../components/Notification';
import BaseComponent from '../../components/Base/BaseComponent';

const axios = require("axios");

export default class AddMenu extends BaseComponent {
    constructor(props) {
        super(props);
        if (props.item != null) {
            this.state = {
                menuName: props.item.name,
                menuDescription: props.item.description,
                amount: props.item.amount,
                restaurantList: [],
                menuSelectedItem: props.item.type,
                restaurantSelectedItem: "0",
                image: null,
                imageUrl: props.item.logo,
                restaurantName: ""
            }
        } else {
            this.state = {
                menuName: "",
                menuDescription: "",
                amount: "",
                restaurantList: [],
                menuSelectedItem: "0",
                restaurantSelectedItem: "0",
                image: null,
                imageUrl: null
            }

        }

        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentDidMount() {
        console.log(this.props.item)

        var options = {
            method: CallMethods.GET,
            controller: "restaurant",
            action: "getRestaurantList",
            params: { search: ""},
            success: function (response) {
                if (this.props.item != null) {
                    response.content.forEach((element, index) => {
                        console.log(element)
                        if (element.guid == this.props.item.restaurantGuid) {
                            this.setState({
                                restaurantList: response.content,
                                restaurantSelectedItem: element.guid,
                                restaurantName: element.name
                            })
                        }
                    });
                } else {
                    this.setState({
                        restaurantList: response.content,
                        restaurantSelectedItem: response.content[0].guid
                    })
                }
            }.bind(this),
            error: function (error) {
                console.log(error)
            }
        };

        this.APICall(options);
    }

    handleSelectChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleOnClick(e) {
        var options = {
            method: CallMethods.POST,
            controller: "menu",
            action: "addmenu",
            data: {
                restaurantGuid: this.state.restaurantSelectedItem,
                guid : this.props.item != null ? this.props.item.guid : "",
                name: this.state.menuName,
                description: this.state.menuDescription,
                amount: this.state.amount,
                type: this.state.menuSelectedItem,
                logo: this.state.imageUrl
            },
            success: function (response) {
                this.setState({
                    menuName: "",
                    menuDescription: "",
                    amount: "",
                    menuSelectedItem: "0",
                    restaurantSelectedItem: this.state.restaurantList[0].guid,
                    imageUrl: null
                });
                createNotification('success', "", "Başarıyla eklendi.")
            }.bind(this),
            error: function (error) {
                console.log(error)
            }
        };

        this.APICall(options);
    }

    handleImageUpload(e) {
        e.preventDefault() 

        if (IsNullOrEmpty(this.state.menuDescription) ||
            IsNullOrEmpty(this.state.amount) ||
            this.state.image == null) {
            return createNotification('warning', "", "Lütfen tüm alanları doldurunuz.")
        }

        this.showLoader();
        const formData = new FormData();
        console.log(this.state.image)
        formData.append('image', this.state.image);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        let url = CONSTANTS.ERESTAURANT_BASE_URL + "media/upload"
        console.log(url)
        axios.post(url, formData, config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    imageUrl: response.data
                }, (e) => this.handleOnClick(e))
                console.log("The file is successfully uploaded");
                this.hideLoader();

            }).catch((error) => {
                createNotification("error", error.message)
                this.hideLoader();
            });
    }

    handleChangeImage(e) {
        this.setState({
            image: e.target.files[0]
        })
    }

    render() {
        return (
             <div style={{marginBottom:"3rem"}}>
                <form>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-12">
                                <label htmlFor="exampleFormControlSelect1">Restaurant seç</label>
                            </div>
                            <div className="col-md-12">
                                {this.props.item != null ?
                                    <input type="text" value={this.state.restaurantName} className="form-control" id="restaurantName" name="restaurantName" disabled  />
                                    :
                                    <select
                                        className="form-control"
                                        name="restaurantSelectedItem"
                                        id="exampleFormControlSelect1"
                                       
                                        value={this.state.restaurantSelectedItem}
                                        onChange={(e) => this.handleSelectChange(e)}>

                                        {this.state.restaurantList.map((item, index) => {
                                            return <option key={index} value={item.guid}> {item.name} </option>
                                        })
                                        }
                                    </select>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-12">
                                <label htmlFor="menuName">Menü Adı</label>
                            </div>
                            <div className="col-md-12">
                                <input type="text" value={this.state.menuName} className="form-control" id="menuName" name="menuName" onChange={(e) => this.handleOnChange(e)}  />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-12">
                                <label htmlFor="menuDescription">Menü Açıklaması</label>
                            </div>
                            <div className="col-md-12">
                                <textarea type="text-area" value={this.state.menuDescription} className="form-control" id="menuDescription" name="menuDescription" onChange={(e) => this.handleOnChange(e)} rows="5"  />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-12">
                                <label htmlFor="menuName">Tutar</label>
                            </div>
                            <div className="col-md-12" style={{ display: "flex" }}>
                                <input type="number" placeholder="1.0" step="0.01" min="1" max="999"  onkeypress="return event.charCode != 45" value={this.state.amount} className="form-control" id="amount" name="amount" onChange={(e) => this.handleOnChange(e)}  />
                                <h5 style={{ marginLeft: "10px", marginTop: "15px" }}>TL</h5>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="menuType">Menü tipi</label>
                        <select className="form-control" id="menuType" name="menuSelectedItem"  value={this.state.menuSelectedItem}
                            onChange={(e) => this.handleSelectChange(e)} >
                            <option value="0">Menüler</option>
                            <option value="1">Çorbalar</option>
                            <option value="2">Kebaplar ve Izgaralar</option>
                            <option value="3">Lahmacunlar</option>
                            <option value="4">Pideler</option>
                            <option value="5">Burgerler</option>
                            <option value="6">Kremitte Ürünler</option>
                            <option value="7">Küçük Boy Pizza</option>
                            <option value="8">Orta Boy Pizza</option>
                            <option value="9">Büyük Boy Pizza</option>
                            <option value="10">Salatalar</option>
                            <option value="11">Tatlılar</option>
                            <option value="12">İçecekler</option>
                        </select>
                    </div>
                    <div>
                        {this.props.item != null && <img src={this.props.item.logo} style={{ maxWidth: "100px", marginRight: "20px", marginBottom: "10px" }} />}
                    </div>
                    <div className="form-group">
                        <input type="file" onChange={this.handleChangeImage.bind(this)} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(e) => this.handleImageUpload(e)}>Ekle</button>
                </form>
            </div>
        )
    }
}
