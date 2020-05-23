import React, { Component } from "react";
import {
    Card,
    CardBody,
    CardImg,
    CardTitle,
    CardText,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    Col,
    Label,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(
            this.props.dishId,
            values.rating,
            values.author,
            values.comment
        );
    }

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil"> Submit Comment</span>
                </Button>
                <Modal
                    isOpen={this.state.isModalOpen}
                    toggle={this.toggleModal}
                >
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm
                            onSubmit={(values) => {
                                this.handleSubmit(values);
                            }}
                        >
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>
                                    Rating
                                </Label>
                                <Col md={12}>
                                    <Control.select
                                        model=".rating"
                                        className="form-control"
                                        id="rating"
                                        name="rating"
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>
                                    Your Name
                                </Label>
                                <Col md={12}>
                                    <Control.text
                                        model=".author"
                                        className="form-control"
                                        id="author"
                                        name="author"
                                        placeholder="Your Name"
                                        validators={{
                                            minLength: minLength(3),
                                            maxLength: maxLength(15),
                                        }}
                                    ></Control.text>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength:
                                                "Must be greater than 2 characters",
                                            maxLength:
                                                "Must be 15 characters or less",
                                        }}
                                    ></Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>
                                    Comment
                                </Label>
                                <Col md={12}>
                                    <Control.textarea
                                        model=".comment"
                                        className="form-control"
                                        id="comment"
                                        name="comment"
                                        rows="12"
                                    ></Control.textarea>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10 }}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <FadeTransform
                in
                transformProps={{
                    exitTransform: "scale(0.5) translateY(-50%)",
                }}
            >
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    } else {
        return <div></div>;
    }
}

function RenderComments({ comments, postComment, dishId }) {
    if (comments != null) {
        const commentObj = comments.map((comment) => {
            return (
                <Fade in>
                    <li key={comment.id}>
                        {comment.comment}
                        <br></br>
                        <br></br>
                        --{comment.author},{" "}
                        {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                        }).format(new Date(Date.parse(comment.date)))}
                        <br></br>
                        <br></br>
                    </li>
                </Fade>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>{commentObj}</Stagger>
                </ul>
                <CommentForm
                    dishId={dishId}
                    postComment={postComment}
                ></CommentForm>
            </div>
        );
    } else {
        return <div></div>;
    }
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading></Loading>
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}></RenderDish>
                    </div>
                    <div className="col-12 col-md-5">
                        <RenderComments
                            comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        ></RenderComments>
                    </div>
                </div>
            </div>
        );
    }
};

export default DishDetail;
