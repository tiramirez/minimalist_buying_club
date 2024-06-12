import { useEffect, useState } from 'react';
// import axios from 'axios';
import Items from '../static/sample_products.json'

class ItemObject {
    constructor(props) {
        this.id = props.id;
        this.product_category = props.product_category;
        this.unit_price = props.unit_price;
        this.product_name = props.product_name;
        this.product_quantity = 0;
    }

    updateQuantity(value) {
        this.product_quantity = value;
    }

    updateQuantityIncrease() {
        this.product_quantity = this.product_quantity + 1;
    }

    updateQuantityReduce() {
        if (this.product_quantity > 0) {
            this.product_quantity = this.product_quantity - 1;
        }
    }
}

const myItems = Items.Items.map((item)=> {return new ItemObject(item)});
// console.log(myItems);

export default myItems;

// export const useProductList = () => {
    // const items = Items.map((item)=> {return new ItemObject(item)});
    // console.log(items);
    // return [items];
// };


// https://www.geeksforgeeks.org/how-to-use-the-javascript-fetch-api-to-get-data/

// export const useProductList = () => {
//     const [items, setItems] = useState([]);
//     const api_url = 'https://43stikgs9h.execute-api.us-east-1.amazonaws.com/dev/cdk-hnb659fds-assets-894357734648-us-east-1/sample_products.json';
    
//     useEffect(() => {
//         fetchPromise()
//     }, []);

//     const fetchPromise = async () => {
//         const res = await fetch(api_url, { method: 'GET' })
//             .then(response => {
//                 if (!response.ok) {
//                     // do something
//                     console.log('There was a problem with the fetch operation:', response);
//                 } else {
//                     return response.json();
//                 }
//             })
//             .catch(error => {
//                 console.error("There was an error", error);
//             })
//             ;
//         setItems(res);
//         console.log(res);
//     };
//     console.log('PRODUCT LIST', items);

//     return [items];
// };


// export const ProductList = () => {
//     const [items, setUsers] = useState([]);
//     const api_url = 'https://43stikgs9h.execute-api.us-east-1.amazonaws.com/dev/cdk-hnb659fds-assets-894357734648-us-east-1/sample_products.json';

//     useEffect(() => {
//         axios.get(api_url)
//             .then((response) => { setUsers(response.data.Items); })
//             .catch((error) => {
//                 if (error.response.status === 500) {
//                     setUsers(items);
//                 } else {
//                     console.log(error.stack);
//                     console.error('Error fetching data:', error);
//                 }
//             });
//     }, []);

//     console.log('PRODUCT LIST', items);

//     return (items.Items);
// };