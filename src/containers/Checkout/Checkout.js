import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from 'react-router-dom';

class Checkout extends Component {

    state = {
        ingredients: {},
        totalPrice: 0
    };

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        let newIngredients = {};
        let totalPrice;
        for (let param of query.entries()){
            if(param[0] === 'totalPrice') {
                totalPrice = parseFloat(param[1])
            }
            else {
                newIngredients[param[0]] = parseInt(param[1]);
            }
        }
        this.setState({
            ingredients: newIngredients,
            totalPrice: totalPrice
        })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.checkoutCancelledHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler}/>
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>)}/>
            </div>
        );
    }
}

export default Checkout;
