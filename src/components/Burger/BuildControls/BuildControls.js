import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <div>Current price: <strong>{props.totalPrice.toFixed(2)}$</strong></div>
            {controls.map(control =>
                <BuildControl
                    key={control.label}
                    label={control.label}
                    added={props.addIngredientHandler.bind(this, control.type)}
                    removed={props.removeIngredientHandler.bind(this, control.type)}
                    disabled={props.disableInfo[control.type]}
                />)}
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}>
                ODER NOW
            </button>
        </div>
    );
};

export default BuildControls;
