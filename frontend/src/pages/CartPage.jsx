import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const user_id = 1; // Hardcoded user ID for demo purposes
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM0NDc4OTcyLCJleHAiOjE3MzQ0ODI1NzJ9.RCnIQvcIrAvxG1t39glIhP3iDAEAVOwlO67PpJHuIYg"; // Replace this with a valid token

    useEffect(() => {
        const fetchCart = async () => {
            try {
                // Include Authorization header with token
                const response = await axios.get(`http://localhost:5000/api/cart/${user_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token here
                    },
                });
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error.response ? error.response.data : error.message);
            }
        };
        fetchCart();
    }, []);

    const handleDelete = async (id) => {
        try {
            // Include Authorization header with token
            await axios.delete(`http://localhost:5000/api/cart/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach the token here
                },
            });
            setCartItems(cartItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error deleting cart item:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                cartItems.map((item) => (
                    <div
                        key={item.id}
                        style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}
                    >
                        <h3>{item.name}</h3>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => handleDelete(item.id)}>Remove</button>
                    </div>
                ))
            )}
        </div>
    );
}

export default CartPage;
