import React, {Component} from 'react';
import AuxComponent from "../../hoc/AuxComponent";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    };

    addIngredientHandler = (type) => {
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = this.state.ingredients[type] + 1;

        const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newTotalPrice
        });
    };

    removeIngredientHandler = (type) => {
        const updatedIngredients = {...this.state.ingredients};

        if(this.state.ingredients[type] <= 0) {
            return;
        }

        updatedIngredients[type] = this.state.ingredients[type] - 1;

        const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newTotalPrice
        });
    };

    render() {
        const disableInfo = { ...this.state.ingredients };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
            <AuxComponent>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    addIngredientHandler={this.addIngredientHandler}
                    removeIngredientHandler={this.removeIngredientHandler}
                    disableInfo={disableInfo}
                    totalPrice={this.state.totalPrice}/>
            </AuxComponent>
        );
    }
}

export default BurgerBuilder;