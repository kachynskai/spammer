
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ContactsPage = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/contacts')
            .then(response => setContacts(response.data))
            .catch(err => console.error(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5001/contacts/${id}`)
            .then(() => setContacts(contacts.filter(contact => contact._id !== id)))
            .catch(err => console.error(err));
    };

    return (
        <div className="container mt-5">
            <h1>Список контактів</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Прізвище</th>
                    <th>Ім'я</th>
                    <th>По батькові</th>
                    <th>Email</th>
                    <th>Дії</th>
                </tr>
                </thead>
                <tbody>
                {contacts.map(contact => (
                    <tr key={contact._id}>
                        <td>{contact.lastName}</td>
                        <td>{contact.firstName}</td>
                        <td>{contact.patronymicName}</td>
                        <td>{contact.email}</td>
                        <td>
                            <Link to={`/edit/${contact._id}`}  style={{ marginRight: '10px' }} className="btn btn-outline-dark btn-sm">Редагувати</Link>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(contact._id)}>Видалити</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to="/new" style={{ width: '400px', display: 'block', margin: '0 auto' }} className="btn btn-outline-primary mb-6 btn-block">Додати новий контакт</Link>
            <Link to="/send" style={{ width: '400px', display: 'block', margin: '0 auto' }} className="btn btn-outline-success mt-3">Розсилка листів</Link>
        </div>
    );
};

export default ContactsPage;
