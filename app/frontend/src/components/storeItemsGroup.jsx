import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import './storeItemsGroup.css';

class ItemBox extends Component {
    constructor(props) {
        super(props);
        this.state = { quantity: 0 };
      }
  
    handleIncrement = () => {
      this.setState({
        quantity: this.state.quantity + 1 
      });
    };

    handleReduction = () => {
        if (this.state.quantity > 0) {
            this.setState({
                quantity: this.state.quantity - 1 
            });
        }
      };
  
    render() {
        return (
            <div className="itemBlock" key={this.props.Item.id}>
                <div className="selectedAmount">
                    <button className="circleBtn BtnLeft" onClick={this.handleReduction}>-</button>
                    <p className="productQuantity">{this.state.quantity}</p>
                    <button className="circleBtn BtnRight" onClick={this.handleIncrement}>+</button>
                </div>
                <div className="productName">{this.props.Item.product_name}</div>
                <div className="productUnitPrice"><NumericFormat value={this.props.Item.unit_price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                <div className="productTotal"><NumericFormat value={(this.props.Item.unit_price * this.state.quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
            </div>
        );
    }
  }

function ItemsGroup() {
    const [items, setUsers] = useState([]);
    useEffect(() => {
        axios.get('https://43stikgs9h.execute-api.us-east-1.amazonaws.com/dev/cdk-hnb659fds-assets-894357734648-us-east-1/sample_products.json')
        .then((response) => {setUsers(response.data.Items);})
        .catch((error) => {
            if (error.response.status===500){
                setUsers(items);
            } else {
                console.log(error.stack);
                console.error('Error fetching data:', error);}
            });
    }, []);

    console.log(items);
    return (
        <div className="itemsGroup">
            <h2>Items List</h2>
            <div>
                {items.map((singleItem) => (<ItemBox Item={singleItem} />))}
            </div>
        </div>
    );
};
export default ItemsGroup;
