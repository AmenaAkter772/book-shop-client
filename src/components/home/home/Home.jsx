import React, { useContext, useEffect, useState } from 'react';
import { InputGroup, FormControl, Button, Container } from 'react-bootstrap';
import Book from '../book/Book';
import Header from '../../header/Header'
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/DatabaseManager';



const Home = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState([]);
    const history = useHistory();

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

    useEffect(() => {
        fetch('https://eerie-witch-58710.herokuapp.com/getBook?search=' + search)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [search])


    const handleAddBook = (book) => {
        const newCart = [...cart, book]
        setCart(newCart)
        const sameProduct = newCart.filter(pd => pd._id === book._id);
        const count = sameProduct.length;
        addToDatabaseCart(book._id, count)
    }

    const handleSearch = () => {
        const searchValue = document.getElementById('searchValue').value
        setSearch(searchValue)
    }

    const handleAddCart = () => {
        history.push(`/cart`)
    }

    return (
        <>
            <Header />
            <InputGroup className="mt-5 searchField">
                <FormControl
                    id="searchValue"
                    placeholder="Search book"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                />
                <Button onClick={handleSearch} variant="danger" id="button">Search</Button>
                <p onClick={handleAddCart} style={{ cursor: 'pointer' }}><FontAwesomeIcon className="ms-3 mt-2 me-2" icon={faCartPlus} />{cart.length}</p>
            </InputGroup>

            <Container>
                <div className="row mt-5">
                    {
                        books.map(book => <Book book={book} handleAddBook={handleAddBook} id={book._id}></Book>)
                    }
                </div>
            </Container>
        </>
    );
};

export default Home;