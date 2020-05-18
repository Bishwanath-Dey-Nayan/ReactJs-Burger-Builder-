import React from 'react';
import classes from './Order.module.css'

const Order = ( props ) =>{
    const Ingredients = [];
    for(let ingredientName in props.ingredients)
    {
        Ingredients.push({name:ingredientName,amount:props.ingredients[ingredientName]})
    };

    let ingredientList = Ingredients.map(item =>{
        return(
        <span style={{padding:'10px',
                margin:'0px 5px', boxShadow:'0px 2px 3px #ccc',
                border:'1px solid #black',
                textTransform:'capitalize'
                
            }}>{item.name} ({item.amount})</span>
             )
       
    })
    return(
        <div className={classes.Order}>
        <p>Ingredients: {ingredientList}</p>
        <p>Price:<strong>USD {Number.parseFloat(props.price)}</strong></p>
    </div>
    )

}

export default Order;