import React from 'react'
import { CallMethods } from '../helpers/Constants';
import BaseComponent from '../components/Base/BaseComponent';
import { Row, Col, CardBody, Card } from 'reactstrap';
import Rating from 'react-rating';

export default class Comments extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            comments: []
        }
    }


    componentDidMount() {
        var options = {
            method: CallMethods.POST,
            controller: "restaurant",
            action: "getComments",
            data: {
                guid: this.props.restaurant.guid
            },
            success: function (response) {
                this.setState({
                    comments: response.content.comments,
                })
                console.log(response)
            }.bind(this),
            error: function (error) {
                console.log(error)
            }
        };
        this.APICall(options);
    }

    prepareComments = () => {
        return this.state.comments.map((item, index) => {
            return <div key={index} style={{ marginBottom: "1rem", borderRadius: "3px", backgroundColor: "white", padding: "1rem" }}>
                <Row>
                    <Col>
                        <h3>{item.whose}</h3>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
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
                <hr />
                <Row>
                    <Col md={10}>
                        <p> {item.content}</p>
                    </Col>
                    <h6 style={{
                        position: "absolute",
                        right: "0",
                        paddingRight: "2.5rem"
                    }}>{item.date}</h6>
                </Row>
            </div>
        });
    }

    render() {
        return (
            <div>
                <Card style={{ maxWidth: "45rem" }}>
                    <CardBody style={{ backgroundColor: "#f4f5f7" }}>
                        {this.state.comments.length > 0 ? this.prepareComments() : <h4 style={{ color: "grey", textAlign: "center" }}>Yorum bulunamadı.</h4>}
                    </CardBody>
                </Card>
            </div>
        )
    }
}
