import React, { useState } from 'react';
import { Button, Container, Form, } from 'react-bootstrap';
import axios from 'axios'
import Sidebar from '../sidebar/Sidebar';

const AddBook = () => {
    const [imageUrl, setImageUrl] = useState(null);


    const handleSubmit = () => {
        const name = document.getElementById('bookName').value;
        const price = document.getElementById('bookPrice').value;
        const authorName = document.getElementById('authorName').value;
        const image = imageUrl;
        const totalInfo = { name, price, authorName, image }

        fetch('https://eerie-witch-58710.herokuapp.com/addBook', {
            method: 'POST',
            body: JSON.stringify(totalInfo),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => console.log(res))
    }

    const handleOnChange = (event) => {
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', '912feda0bda16c90f1fd72ed8479976e');
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(res => setImageUrl(res.data.data.display_url))
            .then(err => console.log(err))

    }

    return (
        <Container>
            <div className="d-flex">
                <Sidebar />
                <div className="col-md-9 ms-5">
                    <h5 className="mt-5" style={{ color: '#a83641' }}>Add Book</h5>
                    <form onSubmit={handleSubmit} className="mt-5">
                        <div className="d-flex row">
                            <div className=" col-md-5 col-sm-10 me-5">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Book Name</Form.Label>
                                    <Form.Control type="text" id="bookName" required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Add Price</Form.Label>
                                    <Form.Control type="number" id="bookPrice" required />
                                </Form.Group>
                            </div>
                            <div className=" col-md-5 col-sm-10">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Author Name</Form.Label>
                                    <Form.Control type="text" id="authorName" required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Add book cover Photo</Form.Label>
                                    <Form.Control type="file" id="image" onChange={handleOnChange} required />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="button me-5 pe-5">
                            <Button variant="danger" type="submit">Save Info</Button>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    );
};

export default AddBook;