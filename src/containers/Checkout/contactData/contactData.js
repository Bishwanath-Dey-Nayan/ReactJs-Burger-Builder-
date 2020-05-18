import React, { Component } from 'react';
import Button from '../../../component/UI/Button/Button';
import axios from '../../../axios-orders';
import Loader from '../../../component/UI/Spinner/spinner';
import Input from '../../../component/UI/Input/Input';
import classes from './contactData.module.css';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '', 
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayvalue: 'Fastest' },
                        { value: 'cheapest', displayvalue: 'Cheapest' },
                    ]
                },
                value: '',
                validation:{
                    required: false
                },
                valid: true,
                touched:false
            },
        },
        isFormValid:false,
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        const orderData = {};
        for (let formElementKey in this.state.orderForm) {
            orderData[formElementKey] = this.state.orderForm[formElementKey].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: orderData
        }
        axios.post('/orders.json', order)
            .then(res =>
                this.setState({ loading: false }))
            .catch(err => this.setState({ loading: false }))
            ;
        this.props.history.push('/');
    }

    checkValidity(value, rules){
        let isValid = true;
        if(rules.required)
        {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        // checking teh overall form validation
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm ){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }   


        this.setState({ orderForm: updatedOrderForm, isFormValid:formIsValid });

    }

    render() {

        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (<form onSubmit={this.handleSubmit}>
            {formElementArray.map((element) => (
                <Input
                    key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    change={(event) => { this.inputChangedHandler(event, element.id) }}
                    invalid = {!element.config.valid}
                    shouldvalidate = {element.config.validation}
                    touched = {element.config.touched}
                />
            ))}
            <Button btnType="Success" disabled={!this.state.isFormValid}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Loader />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Please enter your contact Information</h4>
                {form}
            </div>
        )
    }
}


export default ContactData;