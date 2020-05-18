import React,{Component} from 'react';
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../component/Order/Checkout/checkout';
import ContactData from '../Checkout/contactData/contactData';


class Checkout extends Component{
    state ={
        ingredients : null,
        price:0
    }
    componentWillMount()
    {
        const query = new URLSearchParams(this.props.location.search);
        let ingredients ={};
        let price = 0;
        for (let param of query.entries())
        {
            //console.log(param,'21')
            if(param[0] === 'price')
            {
                price = param[1];
            }
            else{
                ingredients[param[0]] = +param[1]
            }
            
        }
        this.setState({ingredients:ingredients,price:price});
    }

    chekcoutCancelHandler =() =>
    {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }


render()
{
    return(
        <div>
            <CheckoutSummary 
            ingredients={this.state.ingredients}
            checkoutCancel={this.chekcoutCancelHandler}
            checkoutContinue={this.checkoutContinueHandler}
            />
            <Route path={this.props.match.path + '/contact-data'}
            render = { (props) =>{
                return (<ContactData ingredients={this.state.ingredients} price ={this.state.price} {...props} />)
            }}
            />
        </div>
    )
}
}

export default Checkout;