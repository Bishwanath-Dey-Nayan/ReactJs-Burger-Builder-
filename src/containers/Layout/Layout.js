import React from 'react';
import Aux from '../Aux';
import classes from './Layout.module.css';
import Toolbar from '../../component/UI/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../component/UI/Navigation/Sidedrawer/Sidedrawer';


class Layout extends React.Component {
    state = {
        shoSideDrawer: true
    }

    showSideDrawerHandler = () =>
    {
        this.setState({shoSideDrawer:false})
    }
    render() {
        return (
            <Aux>
                <Toolbar />
                <Sidedrawer open={this.state.shoSideDrawer} closed={this.showSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>

            </Aux>
        );
    }
}

export default Layout;