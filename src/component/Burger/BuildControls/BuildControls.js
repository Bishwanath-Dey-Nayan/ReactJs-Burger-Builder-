import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';


const controls =[
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'},
];

const buildControls = (props) =>
(
    <div className={classes.BuildControls}>
        <p>Current Price: {props.price.toFixed(2)}</p>
        {controls.map(ctrl =>(

            <BuildControl key={ctrl.label} label={ctrl.label}
            onAdd = {() => props.ingredientAdded(ctrl.type)}
            onRemove = {() => props.ingredientRemoved(ctrl.type)}
            disabled = { props.disabled[ctrl.type] }
            />
        ))}
        <button className={classes.OrderButton}
        onClick = {props.ordered}
        disabled = {!props.purchaseable}>Order Now</button>
    </div>
)

export default buildControls;