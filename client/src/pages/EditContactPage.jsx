
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditContactPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState({
        lastName: '',
        firstName: '',
        patronymicName: '',
        email: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5001/contacts/${id}`)
            .then(response => {
                setContact(response.data);
            })
            .catch(() => {
                setError('Не вдалося завантажити дані контакту');
            });
    }, [id]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5001/contacts/${id}`, contact)
            .then(() => {
                navigate('/contacts');
            })
            .catch(() => {
                setError('Помилка при оновленні контакту');
            });
    };

    return (
        <div className="container mt-5">
            <h2>Редагувати контакт</h2>
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
                <button
                    type="submit"
                    className="btn btn-outline-success"
                    style={{ width: '400px', display: 'block', margin: '0 auto' }}
                >
                    Оновити контакт
                </button>
            </form>
        </div>
    );
};

export default EditContactPage;
