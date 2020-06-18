import React, { Component } from 'react'
import BaseComponent from '../../components/Base/BaseComponent';
import { IsNullOrEmpty } from '../../helpers/Checker';
import { createNotification } from '../../components/Notification';
import CONSTANTS, { CallMethods } from '../../helpers/Constants';
const axios = require("axios");


export default class AddCarouselContent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            imageUrl: null,
            header: "",
            caption: "",
            isActive : false
        }
    }

    handleChangeImage(e) {
        this.setState({
            image: e.target.files[0]
        })
    }

    handleImageUpload(e) {
        e.preventDefault()

        if ((IsNullOrEmpty(this.state.header) ||
            IsNullOrEmpty(this.state.caption) ||
            this.state.image == null)) {
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

    handleOnClick(e) {
        console.log(this.state.isActive)
        var options = {
            method: CallMethods.POST,
            controller: "Advertisement",
            action: "addCarouselContent",
            data: {
                header: this.state.header,
                caption: this.state.caption,
                source: this.state.imageUrl,
                isActive : this.state.isActive == 'on' ? true : false
            },
            success: function (response) {
                this.setState({
                    header: "",
                    caption: "",
                    imageUrl: "",
                    image : null,
                    isActive : 'of'
                });
                createNotification('success', "", "Başarıyla eklendi.")
            }.bind(this),
            error: function (error) {
                console.log(error)
            }
        };

        this.APICall(options);
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <input type="file" onChange={this.handleChangeImage.bind(this)} />
                </div>
                <div className="custom-control custom-checkbox mb-3">
                    <input
                        className="custom-control-input"
                        id="customCheck1"
                        type="checkbox"
                        name="isActive"
                        onChange={(e) => this.handleOnChange(e)} 
                    />
                    <label className="custom-control-label" htmlFor="customCheck1">
                        Görünür
                    </label>
                </div>  
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="header">Başlık</label>
                        </div>
                        <div className="col-md-12">
                            <input type="text" value={this.state.header} className="form-control" id="header" name="header" onChange={(e) => this.handleOnChange(e)} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="caption">Açıklama</label>
                        </div>
                        <div className="col-md-12">
                            <input type="text" value={this.state.caption} className="form-control" id="caption" name="caption" onChange={(e) => this.handleOnChange(e)} />
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(e) => this.handleImageUpload(e)}>Ekle</button>
            </div>
        )
    }
}
