import React from 'react';
import Aux from '../../HOC/Aux';
import classes from '../Layout/Layout.module.css';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';


const layout = (props) => (
    <Aux>
        <div>
           <Toolbar />        </div>
        <main className={classes.Content}>
                {props.children}
        </main>

    </Aux>
)

export default layout;