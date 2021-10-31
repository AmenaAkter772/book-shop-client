import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import Header from '../../header/Header';
import './ProductDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuttleVan, faHandHoldingUsd, faUndoAlt, faCreditCard, faCartPlus } from '@fortawesome/free-solid-svg-icons'

const ProductDetails = () => {
    const { bookId } = useParams();
    const [books, setBooks] = useState([])

    const bookInfo = books.find(book => book._id === bookId)
    console.log(bookInfo);

    useEffect(() => {
        const url = 'https://eerie-witch-58710.herokuapp.com/getBook'
        axios(url)
            .then(data => setBooks(data.data))
    }, [bookId])

    return (
        <Container>
            <Header />
            <div className="d-flex row mt-5">
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                    {
                        bookInfo && <img className="productImage" src={bookInfo.image} alt="" />
                    }
                </div>
                <div className="col-md-4">
                    {bookInfo &&
                        <>
                            <h3 className="py-2">{bookInfo.name}</h3>
                            <p className="py-2">By: <span style={{ color: '#dc3545' }}>{bookInfo.authorName}</span></p>
                            <p className="py-2">Category: <span style={{ color: '#dc3545' }}>Branding, Marketing and Selling</span> </p>
                            <h6 id="price" className="py-2">Price : {bookInfo.price}</h6>
                            <div className="d-flex align-items-center justify-content-center">
                                <button className="AddToCard mt-3 px-5 py-2"><FontAwesomeIcon className="me-2" icon={faCartPlus} />Add To Card</button>
                            </div>

                        </>
                    }
                </div>
                <div className="col-md-3">
                    <p><FontAwesomeIcon className="me-2 icon" icon={faHandHoldingUsd} />Cash On Delivery</p>
                    <p><FontAwesomeIcon className="me-2 icon" icon={faUndoAlt} />7 Days Happy Returns</p>
                    <p><FontAwesomeIcon className="me-2 icon" icon={faShuttleVan} />Delivery Charge tk 50 (Online Order)</p>
                    <p><FontAwesomeIcon className="me-2 icon" icon={faCreditCard} />Purchase And Earn</p>
                </div>
            </div>
        </Container>
    );
};

export default ProductDetails;