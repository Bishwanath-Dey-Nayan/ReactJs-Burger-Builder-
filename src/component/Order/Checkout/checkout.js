import React, { Component } from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './checkout.module.css';


const checkoutSummary = (props) =>{
return(
    <div className={classes.CheckoutSummary}>
        <h1>We hope it tastes well!</h1>
        <div style={{height: '300px', margin:'auto'}}>
            <Burger 
            ingredients = {props.ingredients}
            />
        </div>
        <Button btnType="Danger" Click={props.checkoutCancel} >CANCEL</Button>
        <Button btnType="Success" Click={props.checkoutContinue} >CONTINUE</Button>
    </div>
)
}

export default checkoutSummary;