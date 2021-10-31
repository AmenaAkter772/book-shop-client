import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Sidebar from '../sidebar/Sidebar';

const ManageBook = () => {
    const [orderInfo, setOrderInfo] = useState([]);

    useEffect(() => {
        fetch('https://eerie-witch-58710.herokuapp.com/getOrderBook')
            .then(res => res.json())
            .then(data => setOrderInfo(data))
    }, []);

    return (
        <Container>
                    <div className="d-flex">
                        <Sidebar />
                        <div className="col-md-8 ms-5 mt-5">
                            <h4 style={{ color: '#a83641' }}>Manage Book</h4>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Book Name</th>
                                        <th scope="col">Author Name</th>
                                        <th scope="col">quantity</th>
                                        <th scope="col">price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderInfo.map(book =>
                                            <tr>
                                                <td>{book.bookName}</td>
                                                <td>{book.authorName}</td>
                                                <td>{book.quantity}</td>
                                                <td>{book.payablePrice}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
        </Container>
    );
};

export default ManageBook;