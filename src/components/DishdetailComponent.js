import React from "react";
import { Card, CardBody, CardImg, CardTitle, CardText } from "reactstrap";

function RenderDish({ dish }) {
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

function RenderComments({ dish }) {
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

const DishDetail = (props) => {
    return (
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dishSelected}></RenderDish>
            </div>
            <div className="col-12 col-md-5">
                <RenderComments dish={props.dishSelected}></RenderComments>
            </div>
        </div>
    );
};

export default DishDetail;
