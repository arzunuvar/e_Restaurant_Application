import React from "react";
import { CallMethods } from "../helpers/Constants";
import { Card, CardHeader, Row, Col, CardBody, Badge, Modal, Button, Input,UncontrolledCarousel } from "reactstrap";
import PrivateBaseComponent from "../components/Base/PrivateBaseComponent";
import { IsNullOrEmpty } from "../helpers/Checker";
import Rating from 'react-rating';
import { createNotification } from "../components/Notification";

class Home extends PrivateBaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      modal: false,
      commentingOrderGuid: "",
      commentingRestaurantGuid: "",
      comment: "",
      rating: 1,
      carouselItems : []
    }
  }

  componentDidMount() {
    this.getUserOrders();
    this.getCarouselContetns();
  }


  getCarouselContetns = () => {
    var options = {
      method: CallMethods.POST,
      controller: "advertisement",
      action: "getCarouselContents",
      success: function (response) {
        console.log(response.content)
        this.setState({
          carouselItems: response.content,
        });
      }.bind(this),
      error: function (error) {
        console.log(error)
      },
    };
    this.APICall(options);
  }

  getUserOrders = () => {
    var options = {
      method: CallMethods.POST,
      controller: "order",
      action: "getordersbyuser",
      data: {
        guid: this.getCurrentUser() != null && this.getCurrentUser().id
      },
      success: function (response) {
        this.setState({
          orders: response.content,
        });
      }.bind(this),
      error: function (error) {
        console.log(error)
      },
    };

    this.APICall(options);
  }

  prepareStatus = (status) => {
    switch (status) {
      case 0:
        return <Badge color="primary" style={{
          position: "absolute", right: "0",
          margin: "12px"
        }} >Hazırlanıyor</Badge>
      case 1:
        return <Badge color="primary" style={{
          position: "absolute", right: "0",
          margin: "12px"
        }} >Yolda</Badge>
      case 2:
        return <Badge color="primary" style={{
          position: "absolute", right: "0",
          margin: "12px"
        }} >Teslim edildi</Badge>
      case 3:
        return <Badge color="primary" style={{
          position: "absolute", right: "0",
          margin: "12px"
        }} >İptal Edildi</Badge>
    }
  }

  handleContentVisibility(e) {
    this.setState({
      [e.target.id]: IsNullOrEmpty(this.state[e.target.id]) ? 'block' : (this.state[e.target.id] == 'none' ? 'block' : 'none')
    })
  }

  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  openModal = (state, guid, orderGuid) => {
    this.setState({
      [state]: !this.state[state],
      commentingRestaurantGuid: guid,
      commentingOrderGuid: orderGuid
    });
  }

  prepareOrdersList() {
    return this.state.orders.map((item, index) => {
      return <div key={index}>
        <Card style={{ maxWidth: "45rem", marginBottom: "10px" }}>
          <Row >
            <Col xs="3" sm="3" md="3" lg="3" style={{ margin: "auto", textAlign: "center" }}>
              <img src={item.restaurantLogo} style={{ maxWidth: "4rem", maxHeight: "3rem" }} />
            </Col>
            <Col xs="9" sm="9" md="9" lg="9" style={{ marginTop: "10px" }}>
              <Row >
                <Col>
                  <h4 style={{ fontSize: "14px" }}>{item.restaurantName}</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p style={{ fontSize: "12px", fontFamily: "arial" }} >{item.restaurantDescription}</p>
                </Col>
              </Row>
            </Col>
            {
              !item.isCommeted & item.status == 2 ?
                <Badge
                  onClick={() => this.openModal("modal", item.restaurantGuid, item.orderGuid)}
                  color="info" style={{
                    position: "absolute",
                    right: "0",
                    marginRight: "105px",
                    marginTop: "12px",
                    cursor: "pointer"
                  }}>Yorum yap</Badge> : ""
            }
            {this.prepareStatus(item.status)}
            <h6 style={{
              position: "absolute", right: "0", bottom: "0",
              margin: "12px"
            }}>Sipariş tarihi: {item.date}</h6>
          </Row>
        </Card>
      </div>
    });
  }

  getRating(value) {
    this.setState({
      rating: value
    })
  }

  handleOnChangeComment(e) {
    this.setState({
      comment: e.target.value
    })
  }

  SentComment() {
    var options = {
      method: CallMethods.POST,
      controller: "restaurant",
      action: "setcomment",
      data: {
        content: this.state.comment,
        rating: this.state.rating,
        restaurantGuid: this.state.commentingRestaurantGuid,
        orderGuid: this.state.commentingOrderGuid
      },
      success: function (response) {
        this.setState({
          modal: false,
          comment: "",
          rating: 1
        }, () => this.getUserOrders())
        createNotification("success", "Yorumunuz ve puanlamanız alınmıştır.")
      }.bind(this),
      error: function (error) {
        console.log(error)
        this.setState({
          modal: false,
          comment: "",
          rating: 1,
        })
        createNotification("warning", "Bir hata ile karşılaşıldı lütfen daha sonra tekrar deneyiniz.")
      }.bind(this),
    };

    this.APICall(options);
  }

  getItems = () => {
    var list = [];
    this.state.carouselItems.forEach((item,index) => {
      list.push({
        src : item.source,
        caption : item.caption,
        header : item.header
      })
    })
    console.log(list)
    return list;
  }

  render() {
    return (
      <div>
        <Card style={{ maxWidth: "45rem" }}>
          <CardHeader className="bg-gradient-purpele">
            <Row style={{ padding: "0px 10px" }}>
              <Col>
                <h5 className="card-header-restaurant">Siparişlerim</h5>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            {this.state.orders.length > 0 ? this.prepareOrdersList()
            : <h4 style={{ color: "grey", textAlign: "center" }}>Siparişiniz bulunmamaktadır.</h4>}
          </CardBody>
        </Card>
        <UncontrolledCarousel items={this.getItems()}/>
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.modal}
          toggle={() => this.toggleModal("modal")}
        >
          <div className="modal-header">
            <h3 className="modal-title" id="modal">
              Yorum ve Puanlama
            </h3>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("modal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <h3>Yorumunuz:</h3>
            <Input
              placeholder="Yorumunuz"
              type="textarea"
              autoComplete="off"
              rows="1"
              name="address"
              onChange={(e) => this.handleOnChangeComment(e)}
              rows={3}
              style={{ marginBottom: "1rem" }}
            />
            <h3>Puanınız:</h3>
            <Rating
              initialRating={this.state.rating}
              start={0}
              stop={5}
              step={1}
              emptySymbol="far fa-star fa-2x "
              fullSymbol="fa fa-star fa-2x "
              onChange={(value) => this.getRating(value)}
            />
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("modal")}
            >
              Kapat
            </Button>
            <Button color="primary" type="button" onClick={() => this.SentComment()}>
              Gönder
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Home;
