import React, {Component} from 'react';
import AuxComponent from "../../../hoc/AuxComponent/AuxComponent";
import Button from "../../ui/Button/Button";

class OrderSummary extends Component {

    componentDidUpdate() {
        console.log('order summary will update');
    }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey} style={{textTransform: 'capitalize'}}>
                        <span>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>
                )
            });
        return (
            <AuxComponent>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total price: <strong>{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout ?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </AuxComponent>
        );
    }

}

export default OrderSummary;
