import React from "react";
import { Loading } from "./LoadingComponent";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";

function RenderCard({ item, isLoading, errMessage }) {
    if (isLoading) {
        return <Loading></Loading>;
    } else if (errMessage) {
        return <h4>{errMessage}</h4>;
    } else {
        return (
            <Card>
                <CardImg src={baseUrl + item.image} alt={item.name}></CardImg>
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? (
                        <CardSubtitle>{item.designation}</CardSubtitle>
                    ) : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );
    }
}

function Home(props) {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard
                        item={props.dish}
                        isLoading={props.dishesLoading}
                        errMessage={props.dishesErrMess}
                    ></RenderCard>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard
                        item={props.promotion}
                        isLoading={props.promosLoading}
                        errMessage={props.promosErrMess}
                    ></RenderCard>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader}></RenderCard>
                </div>
            </div>
        </div>
    );
}

export default Home;
