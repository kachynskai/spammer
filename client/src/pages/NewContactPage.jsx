
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewContactPage = () => {
    const navigate = useNavigate();
    const [contact, setContact] = useState({
        lastName: '',
        firstName: '',
        patronymicName: '',
        email: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5001/contacts', contact)
            .then((response) => {
                navigate('/contacts');
            })
            .catch((err) => {
                console.error(err);
                setError('Помилка при створенні контакту');
            });
    };

    return (
        <div className="container mt-5">
            <h2>Додати новий контакт</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="lastName">Прізвище</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-control"
                        value={contact.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="firstName">Ім'я</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-control"
                        value={contact.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="patronymicName">По батькові</label>
                    <input
                        type="text"
                        id="patronymicName"
                        name="patronymicName"
                        className="form-control"
                        value={contact.patronymicName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={contact.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" style={{ width: '400px', display: 'block', margin: '0 auto' }} className="btn btn-outline-primary">Створити контакт</button>
            </form>
        </div>
    );
};

export default NewContactPage;
