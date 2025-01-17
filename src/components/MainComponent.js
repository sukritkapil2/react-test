import React, { Component } from "react";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import Header from "./HeaderComponent";
import DishDetail from "./DishdetailComponent";
import Footer from "./FooterComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
    postComment,
    fetchDishes,
    fetchComments,
    fetchPromos,
    fetchLeaders,
    postFeedback,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
    };
};

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) =>
        dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {
        dispatch(fetchDishes());
    },
    fetchComments: () => {
        dispatch(fetchComments());
    },
    fetchPromos: () => {
        dispatch(fetchPromos());
    },
    resetFeedbackForm: () => {
        dispatch(actions.reset("feedback"));
    },
    fetchLeaders: () => {
        dispatch(fetchLeaders());
    },
    postFeedback: (feedback) => dispatch(postFeedback(feedback)),
});

class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={
                        this.props.dishes.dishes.filter(
                            (dish) => dish.featured
                        )[0]
                    }
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMessage}
                    promotion={
                        this.props.promotions.promotions.filter(
                            (promo) => promo.featured
                        )[0]
                    }
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMess={this.props.promotions.errMessage}
                    leader={
                        this.props.leaders.leaders.filter(
                            (leader) => leader.featured
                        )[0]
                    }
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMessage}
                ></Home>
            );
        };

        const DishWithId = ({ match }) => {
            return (
                <DishDetail
                    dish={
                        this.props.dishes.dishes.filter(
                            (dish) =>
                                dish.id === parseInt(match.params.dishId, 10)
                        )[0]
                    }
                    comments={this.props.comments.comments.filter(
                        (comment) =>
                            comment.dishId === parseInt(match.params.dishId, 10)
                    )}
                    commentsErrMess={this.props.comments.errMessage}
                    postComment={this.props.postComment}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMessage}
                ></DishDetail>
            );
        };

        return (
            <div>
                <Header></Header>
                <TransitionGroup>
                    <CSSTransition
                        key={this.props.location.key}
                        classNames="page"
                        timeout={300}
                    >
                        <Switch>
                            <Route path="/home" component={HomePage}></Route>
                            <Route
                                exact
                                path="/menu"
                                component={() => (
                                    <Menu dishes={this.props.dishes}></Menu>
                                )}
                            ></Route>
                            <Route
                                path="/menu/:dishId"
                                component={DishWithId}
                            ></Route>
                            <Route
                                exact
                                path="/contactus"
                                component={() => (
                                    <Contact
                                        postFeedback={this.props.postFeedback}
                                        resetFeedbackForm={
                                            this.props.resetFeedbackForm
                                        }
                                    ></Contact>
                                )}
                            ></Route>
                            <Route
                                exact
                                path="/aboutus"
                                component={() => (
                                    <About leaders={this.props.leaders}></About>
                                )}
                            ></Route>
                            <Redirect to="/home" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>

                <Footer></Footer>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
