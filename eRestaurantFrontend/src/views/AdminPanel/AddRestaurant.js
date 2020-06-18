import React from 'react'
import CONSTANTS, { CallMethods } from '../../helpers/Constants';
import { createNotification } from '../../components/Notification';
import { IsNullOrEmpty } from '../../helpers/Checker';
import LocationSearchInput from '../../components/LocationSearchInput';
import BaseComponent from '../../components/Base/BaseComponent';

const axios = require("axios");

export default class AddRestaurant extends BaseComponent {

    constructor(props) {
        super(props);

        if (props.item != null) {
            this.state = {
                restaurantName: props.item.name,
                restaurantDescription: props.item.description,
                imageUrl: props.item.imageUrl,
                guid: props.item.guid,
            }
        } else {
            this.state = {
                restaurantName: "",
                restaurantDescription: "",
                image: null,
                imageUrl: null,
                address: "",
                preAddress: "",
                latLng: ""
            }
        }

        console.log(this.props.item)
    }

    handleOnClick(e) {

        var options = {
            method: CallMethods.POST,
            controller: "restaurant",
            action: "addrestaurant",
            data: {
                name: this.state.restaurantName,
                description: this.state.restaurantDescription,
                logo: this.state.imageUrl,
                guid: this.state.guid != null ? this.state.guid : null,
                address: this.state.preAddress.concat(this.state.address),
                lat: this.state.latLng.lat,
                lng: this.state.latLng.lng
            },
            success: function (response) {
                console.log("success")
                this.setState({
                    restaurantName: "",
                    restaurantDescription: "",
                    imageUrl: null,
                    image: null,
                    address: "",
                    preAddress: "",
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
        e.preventDefault();
        if (IsNullOrEmpty(this.state.restaurantName) ||
            IsNullOrEmpty(this.state.restaurantDescription) ||
            IsNullOrEmpty(this.state.preAddress) ||
            IsNullOrEmpty(this.state.address) ||
            this.state.image == null) {
            return createNotification("warning", "Lütfen tüm alanları eksiksiz doldurunuz.")
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

    getLatLng = (result, address) => {
        console.log(result)
        this.setState({
            latLng: result,
            preAddress: address.concat(" ")
        })
    }

    render() {
        return (
            <div  style={{marginBottom:"3rem"}}>
                <form>
                    <div className="form-group form-group-witdh" >
                        <label htmlFor="restaurantName">Restaurant Adı</label>
                        <input type="text" value={this.state.restaurantName} className="form-control" id="restaurantName" name="restaurantName" onChange={(e) => this.handleOnChange(e)} />
                    </div>
                    <div className="form-group form-group-witdh">
                        <label htmlFor="restaurantDescription">Restaurant Açıklaması</label>
                        <textarea type="text-area" value={this.state.restaurantDescription} className="form-control" id="restaurantDescription" name="restaurantDescription" onChange={(e) => this.handleOnChange(e)} rows="5" />
                    </div>
                    <div className="form-group form-group-witdh">
                        {
                            this.props.item != null || this.props.item != undefined ?
                                <img src={this.props.item.logo} style={{ maxWidth: "100px", marginRight: "20px", marginBottom: "10px" }} /> : ""}
                        <input type="file" id="file" onChange={this.handleChangeImage.bind(this)} />
                    </div>
                    <div className="form-group form-group-witdh"  >
                        <label htmlFor="location">Bölge</label>
                        <LocationSearchInput getLatLng={this.getLatLng} />
                    </div>
                    <div className="form-group form-group-witdh">
                        <label htmlFor="address">Adres</label>
                        <textarea type="text-area" name="address" value={this.state.address} className="form-control" id="address" placeholder="Mahalle/Cadde/Sokak,Bina/İş yeri Kapı No." rows="5" onChange={this.handleOnChange} />
                    </div>

                    {
                        this.props.item != null || this.props.item != undefined ?
                            <button type="submit" className="btn btn-primary" onClick={(e) => this.handleImageUpload(e)}>Düzenle</button> :
                            <button type="submit" className="btn btn-primary" onClick={(e) => this.handleImageUpload(e)}>Ekle</button>
                    }

                </form>
            </div>
        )
    }
}
