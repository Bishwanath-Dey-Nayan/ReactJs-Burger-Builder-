import React from 'react';

import NavigationItem from './NavigatinItem/Navigationitem';

import classes from './NavigationItems.module.css';

const navigationItems = () =>
(
    <ul className={classes.NavigationItems}>
       <NavigationItem link="/">
           Burger Builder
       </NavigationItem>
       <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
)

export default navigationItems;