import React, { Component } from 'react';
import Aux from '../../HOC/Aux';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';


const INGREDIENTS = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
}

class BurgerBuilder extends Component {
    // constructor(props)
    // {
    //     super(props);
    //     this.state = {

    //     }
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        total : 4
    }

    addIngredientHandler =(type) =>
    {
       const oldCount = this.state.ingredients[type];
       const updatedCount = oldCount + 1;
       const updatedIngredients = {
           ...this.state.ingredients
       };
       updatedIngredients[type] = updatedCount;

       const priceAddition = INGREDIENTS[type];
       const oldPrice = this.state.total;
       const newPrice = oldPrice + priceAddition ;

       this.setState({total : newPrice, ingredients : updatedIngredients});

    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0)
        {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
 
        const priceDeduction = INGREDIENTS[type];
        const oldPrice = this.state.total;
        const newPrice = oldPrice - priceDeduction ;
 
        this.setState({total : newPrice, ingredients : updatedIngredients});
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo)
        {
            disableInfo[key] = disableInfo[key]<=0;
        }
        console.log(disableInfo);
        return (
            <Aux>
                <div><Burger ingredients={this.state.ingredients} /></div>
                <BuildControls
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabled = {disableInfo}
                price = {this.state.total}
                />
            </Aux>);
    }
}

export default BurgerBuilder;