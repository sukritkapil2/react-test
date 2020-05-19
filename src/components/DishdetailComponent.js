import React, { Component } from "react";
import { Card, CardBody, CardImg, CardTitle, CardText } from "reactstrap";

class DishDetail extends Component {
    renderDish(dish) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        } else {
            return <div></div>;
        }
    }

    renderComments(dish) {
        if (dish != null) {
            const comments = dish.comments;
            const commentObj = comments.map((comment) => {
                return (
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
                );
            });

            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">{commentObj}</ul>
                </div>
            );
        } else {
            return <div></div>;
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dishSelected)}
                </div>
                <div className="col-12 col-md-5">
                    {this.renderComments(this.props.dishSelected)}
                </div>
            </div>
        );
    }
}

export default DishDetail;
