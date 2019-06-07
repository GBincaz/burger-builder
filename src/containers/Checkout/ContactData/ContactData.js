import React, {Component} from 'react';
import Button from "../../../components/ui/Button/Button";
import classes from './ContactData.module.css'
import instance from "../../../axios-orders";
import Spinner from "../../../components/ui/Spinner/Spinner";

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'G B',
                address: {
                    street: 'Test street',
                    zipCode: '78900',
                    country: 'France'
                },
                email: 'a@a.com'
            },
            deliveryMethod: 'fastest'
        };
        instance.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    render() {
        let form = <form>
            <input type="text" name="name" placeholder="Your name" />
            <input type="email" name="email" placeholder="Your email" />
            <input type="text" name="street" placeholder="Street" />
            <input type="text" name="postal" placeholder="Postal" />
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>;

        if(this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                { form }
            </div>
        );
    }
}

export default ContactData;