import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import './Book.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const Book = ({ book, handleAddBook }) => {
    const { name, price, image, authorName, _id } = book;
    const history = useHistory();

    const handleClick = () => {
        history.push(`/${_id}`)
    }

    return (
        <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="cardStyle">
                <div className="cardContain">
                    <div className="image">
                        <img src={image} alt="..." />
                    </div>
                    <div style={{ textAlign: 'center' }} className="card-body">
                        <h6 className="card-title">{name}</h6>
                        <p class="card-text">{authorName}</p>
                        <h6 style={{ color: '#dc3545', fontWeight: 'bold' }} class="card-text price">${price}</h6>
                    </div>
                </div>
                <div className="cardButton">
                    <div className="d-flex align-items-center justify-content-center">
                        <button onClick={() => handleAddBook(book)} className="AddToCard"><FontAwesomeIcon className="me-2" icon={faCartPlus} />Add To Card</button>
                    </div>
                    <Button onClick={handleClick} className="btnBrand" variant="danger" id="button">View Details</Button>
                </div>
            </div>
        </div>
    );
};

export default Book;