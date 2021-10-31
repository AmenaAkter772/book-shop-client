import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPencilAlt, faBorderAll, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
    const bookHistory = useHistory();
    const addHistory = useHistory();
    const manageBookHistory = useHistory();

    const bookHandleClick = () => {
        bookHistory.push('/home')
    }
    const addHandleClick = () => {
        addHistory.push('/admin')
    }

    const manageBookHandleClick = () => {
        manageBookHistory.push('/manageBook')
    }
    return (
        <div className="col-md-3" style={{ backgroundColor: '#dc3545', color: 'white', height: '585px' }}>
            <h3 className="mt-3 h3" style={{ cursor: 'pointer', textAlign: 'center' }} onClick={bookHandleClick}>Book Shop</h3>
            <h6 className="mt-5 ms-2 px-5" style={{ cursor: 'pointer' }} onClick={manageBookHandleClick}><FontAwesomeIcon icon={faBorderAll} /> Manage Book</h6>
            <h6 className="mt-4 ms-2 px-5" style={{ cursor: 'pointer' }} onClick={addHandleClick}><FontAwesomeIcon icon={faPlus} /> Add Book</h6>
            <h6 className="mt-4 ms-2 px-5" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faPencilAlt} /> Edit Book</h6>
            <div style={{marginTop:'310px'}}>
                <h6 onClick={bookHandleClick} className="ms-2 px-5" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faSignOutAlt} /> logout</h6>
            </div>
        </div>
    );
};

export default Sidebar;