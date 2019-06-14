import React, {Component} from 'react';
import AuxComponent from "../../hoc/AuxComponent/AuxComponent";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/ui/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/ui/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState() {
        const sum = Object.keys(this.props.ingredients)
            .map(key => {
                return this.props.ingredients[key]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render() {
        const disableInfo = {...this.state.ingredients};
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

        if (this.props.ingredients) {
            burger =
                <React.Fragment>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        addIngredientHandler={this.props.onIngredientAdded}
                        removeIngredientHandler={this.props.onIngredientRemoved}
                        disableInfo={disableInfo}
                        totalPrice={this.props.totalPrice}
                        purchasable={this.updatePurchaseState()}
                        ordered={this.purchaseHandler}/>
                </React.Fragment>;

            orderSummary = <OrderSummary
                price={this.props.totalPrice}
                ingredients={this.props.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}/>;
        }
        return (
            <AuxComponent>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </AuxComponent>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));