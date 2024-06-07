import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import './storeItemsGroup.css';

const items = [
    {
        'id': 1,
        'productName': 'Tomatoes',
        'productUnitPrice':2.00,
        'selectedAmount':0
    },
    {
        'id': 2,
        'productName': 'Lemon',
        'productUnitPrice':4.00,
        'selectedAmount':0
    },
    {
        'id': 3,
        'productName': 'Lettuce',
        'productUnitPrice':1.00,
        'selectedAmount':0
    },
    {
        'id': 4,
        'productName': 'Onions',
        'productUnitPrice':4.00,
        'selectedAmount':0
    },
]

// const handleClickAdd = (comment_id, user_id) => {
//     setButtonLikes((prevValue) => prevValue + 1)
//     LikeComment(comment_id, user_id)
// }
// const handleClickRemove = (comment_id, user_id) => {
//     setButtonLikes((prevValue) => prevValue - 1)
//     LikeComment(comment_id, user_id)
// }

const ItemsGroup = () => {
    // const [users, setUsers] = useState([]);
    // useEffect(() => {
    //     axios.get('/users/').then((response) => {
    //         setUsers(response.data);
    //     }).catch((error) => {
    //         console.error('Error fetching data:', error);
    //     });
    // }, []);

    // return (
    //     <div> <h2>User List</h2>
    //         <ul>
    //             {users.map((user) => (<li key={user.id}>{user.email}</li>))}
    //         </ul>
    //     </div>
    // );

    return (
        <div className="itemsGroup">
            <h2>Items List</h2>
        <div>
        {items.map((singleItem) => (
            <div className="itemBlock">
                <div className="selectedAmount">
                {/* onClick={handleClickRemove(comment_id, user_id)} */}
                    <button className="circleBtn BtnLeft" >-</button>
                    {singleItem.selectedAmount}
                    {/* onClick={handleClickAdd(comment_id, user_id)} */}
                    <button className="circleBtn BtnRight">+</button>
                </div>
                <div className="productName">{singleItem.productName}</div>
                <div className="productUnitPrice"><NumericFormat value={singleItem.productUnitPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'}/></div>
                <div className="productTotal">$0.00</div>
            </div>
        ))}
        </div>
        </div>
    );
};
export default ItemsGroup;
