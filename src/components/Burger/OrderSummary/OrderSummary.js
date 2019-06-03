import React from 'react';
import AuxComponent from "../../../hoc/AuxComponent";
import Button from "../../ui/Button/Button";

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey} style={{textTransform: 'capitalize'}}>
                    <span>{igKey}</span>: {props.ingredients[igKey]}
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
            <p>Total price: <strong>{props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout ?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </AuxComponent>
    );
};

export default OrderSummary;
