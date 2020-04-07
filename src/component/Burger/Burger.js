import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from '../Burger/Burger.module.css';

const burger = (props) => {

    //convertign Object to array of ingredients
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} types={igKey} />
        })

    }).reduce((arr, el) =>
    {
        return arr.concat(el)
    },[]);

    if(transformedIngredients.length === 0 )
    {
        transformedIngredients = <p>Start Adding Ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient
                types="bread-top"
            />
            {transformedIngredients}
            <BurgerIngredient
                types="bread-bottom"
            />
        </div>
    );
};

export default burger;