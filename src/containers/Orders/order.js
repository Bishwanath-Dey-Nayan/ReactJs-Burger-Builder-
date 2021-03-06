import React,{ Component } from 'react';
import Order from '../../component/Order/Order';
import axios from '../../axios-orders';


class OrderContaineer  extends Component{
    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then(res =>{
           const fetchOrders = [];
           for(let key in res.data)
           {
               fetchOrders.push({
                   ...res.data[key],
                   id:key
               });
           }
          this.setState({orders:fetchOrders, loading:false})
        })
        .then(err => {
            this.setState({loading:false})
            })
    }
    render()
    {
        return(
            <div>
               {
                   this.state.orders.map(order =>(
                       <Order 
                       key={order.id} 
                       ingredients={order.ingredients}
                       price={order.price}
                       />
                   ))
               }
            </div>
        );
    }
}

export default OrderContaineer;