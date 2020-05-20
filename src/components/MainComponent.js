import React, { Component } from "react";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import { DISHES } from "../shared/dishes";
import Header from "./HeaderComponent";
import DishDetail from "./DishdetailComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
        };
    }

    render() {
        const HomePage = () => {
            return <Home></Home>;
        };

        return (
            <div>
                <Header></Header>
                <Switch>
                    <Route path="/home" component={HomePage}></Route>
                    <Route
                        exact
                        path="/menu"
                        component={() => (
                            <Menu dishes={this.state.dishes}></Menu>
                        )}
                    ></Route>
                    <Redirect to="/home" />
                </Switch>
                <Footer></Footer>
            </div>
        );
    }
}

export default Main;
