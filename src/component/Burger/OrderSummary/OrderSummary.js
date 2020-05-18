import React from 'react';
import Aux from '../../../HOC/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) =>
{
    const ingredientSummary = Object.keys(props.ingredients).map(igKey =>{
        return <li key={igKey}>{igKey} : {props.ingredients[igKey]}</li>
    })
    return(
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
    <p>Total Price:{props.price}</p>
            <p>Continue to Checkout?</p>
            <Button Click={props.purchaseCancel} btnType="Danger">Cancel</Button>
            <Button Click={props.purchaseContinue} btnType="Success">Continue</Button>
        </Aux>
    )
}

export default OrderSummary;