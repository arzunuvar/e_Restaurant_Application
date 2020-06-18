import React, { Component } from 'react'
import CONSTANTS, { DefaultCallProps } from '../../helpers/Constants';
import { IsNullOrEmpty } from '../../helpers/Checker';
import $ from 'jquery';
const axios = require('axios');

class BaseComponent extends Component {

  APICall(options) {

    if(options.loader != false){
      this.showLoader();
    }
    
    let config = { ...DefaultCallProps };
    
    config.url = CONSTANTS.ERESTAURANT_BASE_URL + options.controller;

    if (!IsNullOrEmpty(options.action)) {
      config.url = config.url + "/" + options.action
    }

    config.method = options.method;

    if (!IsNullOrEmpty(options.headers)) {
      config.headers = { ...options.headers };
    }

    config.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");

    if (!IsNullOrEmpty(options.data)) {
      config.data = options.data;
    }

    if (!IsNullOrEmpty(options.params)) {
      config.params = options.params;
    }

    console.log(config);
   
    axios(config)
      .then((response) => {
        // handle success
        console.log(response.data)
        this.hideLoader();
        return options.success(response.data);

      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          this.hideLoader();
          return options.error(error.response)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          this.hideLoader();
          return options.error(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          this.hideLoader();
          return options.error(error.message)
        }
      });
      
  }

  logout(pageRef) {
    localStorage.clear();
    if (!IsNullOrEmpty(pageRef) && !IsNullOrEmpty(pageRef.props) && !IsNullOrEmpty(pageRef.props.history)) {
      return pageRef.props.history.push('/login');
    }
    if (!IsNullOrEmpty(this.props) && !IsNullOrEmpty(this.props.history)) {
      return this.props.history.push('/login');
    }
    window.location.href = CONSTANTS.BASE_URL + "login";
  }

  open(pageName) {
    localStorage.setItem('last', pageName);

    if (!IsNullOrEmpty(this.props.history)) {
      this.props.history.push(pageName);
    }
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  getCurrentUser() {
    var user = localStorage.getItem("user");
    if (user != null) {
      return JSON.parse(user);
    }
    return null;
  }

  showLoader() {
    $('#loaderContainer').addClass("showLoader");
  }

  hideLoader() {
    $('#loaderContainer').removeClass("showLoader");
  }
}

export default BaseComponent;