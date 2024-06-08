import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import './storeItemsGroup.css';
import Items from "../static/sample_products.json";

// https://react.dev/learn/state-a-components-memory
const items = Items.Items

// const handleClickAdd = (comment_id, user_id) => {
//     setButtonLikes((prevValue) => prevValue + 1)
//     LikeComment(comment_id, user_id  )
// }
// const handleClickRemove = (comment_id, user_id) => {
//     setButtonLikes((prevValue) => prevValue - 1)
//     LikeComment(comment_id, user_id)
// }
function  ItemBox({ Item }) {
    return (
        <div className="itemBlock">
            <div className="selectedAmount">
                {/* onClick={handleClickRemove(comment_id, user_id)} */}
                <button className="circleBtn BtnLeft">-</button>
                {/* {Item.selectedAmount} */}
                0
                {/* onClick={handleClickAdd(comment_id, user_id)} */}
                <button className="circleBtn BtnRight">+</button>
            </div>
            <div className="productName">{Item.product_name}</div>
            <div className="productUnitPrice"><NumericFormat value={Item.unit_price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
            <div className="productTotal">$0.00</div>
        </div>
    );
};


function ItemsGroup() {
    // const [items, setUsers] = useState([]);
    // useEffect(() => {
    //     axios.get('/users/')
    //     .then((response) => {setUsers(response.data);})
    //     .catch((error) => {
    //         if (error.response.status===500){
    //             setUsers(items_fallback);
    //         } else {
    //             console.log(error.stack);
    //             console.error('Error fetching data:', error);}
    //         });
    // }, []);

    return (
        <div className="itemsGroup">
            <h2>Items List</h2>
            <div>
                {items.map((singleItem) => (<ItemBox Item={singleItem}/>))}
            </div>
        </div>
    );
};
export default ItemsGroup;
