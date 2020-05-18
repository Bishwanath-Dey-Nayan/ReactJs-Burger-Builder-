import React from 'react';
import img from '../../assets/images/27.1 burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) =>
(
    <div className={classes.Logo}>
        <img src={img} alt="Logo"/>
    </div>
)

export default logo;