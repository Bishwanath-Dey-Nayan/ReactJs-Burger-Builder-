import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Aux from '../../HOC/Aux';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
import Spinner from '../../component/UI/Spinner/spinner';

import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
    // constructor(props)
    // {
    //     super(props);
    //     this.state = {

    //     }
    // }
    state = {
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        // axios.get('https://react-my-burger-797fc.firebaseio.com/ingredients.json')
        //     .then(res => {
        //         this.setState({ ingredients: res.data })
        //     });
    }
    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

       return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;

    //     const priceAddition = INGREDIENTS[type];
    //     const oldPrice = this.state.total;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({ total: newPrice, ingredients: updatedIngredients });

    //     this.updatePurchaseState(updatedIngredients);

    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;

    //     const priceDeduction = INGREDIENTS[type];
    //     const oldPrice = this.state.total;
    //     const newPrice = oldPrice - priceDeduction;

    //     this.setState({ total: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }


    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        //alert('continue')
        const queryParams = [];
        for(let i in  this.state.ingredients)
        {
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+ this.props.total);
        const queryString = queryParams.join('&');
        console.log(queryParams);
        this.props.history.push({
            pathname:'/checkout',
            search:'?' + queryString,
        });
    }

    render() {
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = <Spinner />;
        if (this.props.ings) {
            burger = (<Aux><Burger ingredients={this.props.ings} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disableInfo}
                    price={this.props.total}
                    purchaseable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                />
            </Aux>)

            orderSummary = <OrderSummary ingredients={this.props.ings}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.total}
            />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }



        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>);
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.ingredients,
        total:state.totalPrice
    }
   
}
const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (igName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName:igName}),
        onIngredientRemoved: (igName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName:igName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (BurgerBuilder);