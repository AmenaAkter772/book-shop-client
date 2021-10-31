import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../../utilities/DatabaseManager';
import Header from '../../header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

const CartData = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://eerie-witch-58710.herokuapp.com/getBook')
            .then(res => res.json())
            .then(data => {
                const saveCart = getDatabaseCart();
                const productsId = Object.keys(saveCart);

                const cartProducts = productsId.map(id => {
                    const product = data.find(pd => pd._id === id);
                    product.quantity = saveCart[id];
                    return product
                });
                setCart(cartProducts)
            })
    }, []);

    const price = cart.reduce((total, product) => parseFloat(total) + parseFloat(product.price * product.quantity), 0);

    let shipping = 0;
    if (price > 500) {
        shipping = 0
    }
    else if (price > 200) {
        shipping = 10
    }
    else if (price > 0) {
        shipping = 15
    }

    const tax = Math.round(price * 0.1);

    const handleRemove = (id) => {
        const newItem = cart.filter(pd => pd._id !== id);
        setCart(newItem);
        removeFromDatabaseCart(id)
    }

    const handleSubmit = () => {
        const bookName = document.getElementById('bookName').value;
        const authorName = document.getElementById('authorName').value;
        const quantity = document.getElementById('quantity').value;
        const payablePrice = document.getElementById('payablePrice').value;
        const productInfo = { bookName, authorName, quantity, payablePrice }
        fetch('https://eerie-witch-58710.herokuapp.com/orderBook', {
            method: 'POST',
            body: JSON.stringify(productInfo),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(result => {
                if(result){
                    alert('Your Order is Successful')
                }
            })
        processOrder();
        setCart([])
    }

    return (
        <div className="container">
            <Header />
            {cart.length ?
                <form onSubmit={handleSubmit}>
                    <div className="d-flex row mt-5 ">
                        <div className="col-md-7 col-sm-12">
                            <div className="mt-3">
                                <h5 style={{ width: '100%' }} className="card py-3 px-3 d-inline"> <span style={{ marginRight: '320px' }}>My Cart({cart.length} Items) </span> <span style={{ marginRight: '20px' }} className="ms-auto">Total: {price + shipping + tax} tk</span></h5>
                            </div>
                            {
                                cart.map(book =>
                                    <div className="card mt-5 py-4 px-4">
                                        <div className="d-flex row">
                                            <div className="col-md-3">
                                                <img className="" style={{ height: '150px' }} src={book.image} alt="" />
                                            </div>
                                            <div className="col-md-5">
                                                <input style={{ border: 'none', fontWeight: 'normal', fontSize: '20px' }} type="text" name="bookName" value={book.name} id="bookName" />
                                                <input style={{ border: 'none', fontWeight: 'normal', fontSize: '15px' }} type="text" name="authorName" id="authorName" value={book.authorName} />
                                                <p>Quantity: <input style={{ border: 'none', fontWeight: 'normal', fontSize: '15px' }} type="text" name="quantity" id="quantity" value={book.quantity} /></p>
                                                <p className="mt-5"><FontAwesomeIcon onClick={() => handleRemove(book._id)} style={{ cursor: 'pointer', opacity: '70%' }} className="me-5" icon={faTrashAlt} /><FontAwesomeIcon style={{ cursor: 'pointer', opacity: '80%', color: '#dc3545' }} className="" icon={faHeart} /> WishList</p>
                                            </div>
                                            <div className=" d-flex justify-content-center align-items-center col-md-2">
                                                <p className="" style={{ cursor: 'pointer', border: '1px solid gray', width: '30px', paddingLeft: '11px' }}>-</p>
                                                <p style={{ border: '1px solid gray', width: '30px', paddingLeft: '11px' }}>1</p>
                                                <p style={{ cursor: 'pointer', border: '1px solid gray', width: '30px', paddingLeft: '9px' }}>+</p>
                                            </div>
                                            <div className="col-md-2 d-flex justify-content-center align-items-center">
                                                <p>{book.price * book.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div style={{ height: '320px' }} className="col-md-4 col-sm-12 ms-3 card px-4 pt-3">
                            <h5 className="pb-3">Checkout Summary</h5>
                            <p style={{ borderBottom: '1px solid lightgray' }}>SubTotal: <span style={{ marginLeft: '190px' }}>{price} Tk.</span></p>
                            <p style={{ borderBottom: '1px solid lightgray' }}>Shipping: <span style={{ marginLeft: '190px' }}>{shipping} Tk.</span> </p>
                            <p style={{ borderBottom: '1px solid lightgray' }}>Tax: <span style={{ marginLeft: '230px' }}>{tax} Tk.</span> </p>
                            <p style={{ borderBottom: '1px dotted gray' }}>PayableTotal: <span style={{ marginLeft: '160px' }}><input style={{ border: 'none', fontWeight: 'normal', fontSize: '15px', width: '40px' }} type="text" name="payableTotal" id="payablePrice" value={price + shipping + tax} /> Tk.</span> </p>
                            <Button type="submit" variant="danger" id="button">Place Order</Button>
                        </div>
                    </div>
                </form>
                :
                <div style={{ height: '300px' }} className="d-flex justify-content-center align-items-center">
                    <div>
                        <h5 style={{ fontSize: '30px' }}>Your Cart is Empty!</h5>
                        <p>Looks like you haven't made order yet.</p>
                        <a className="d-flex justify-content-center align-items-center" style={{ textDecoration: 'none' }} href="/home">Continue to shopping</a>
                    </div>
                </div>
            }
        </div>
    );
};

export default CartData;