// src/pages/EmailPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmailPage = () => {
    const [templates, setTemplates] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [sendTo, setSendTo] = useState('all');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5001/send')
            .then(res => setTemplates(res.data.messages))
            .catch(() => setError('Не вдалося завантажити шаблони повідомлень'));

        axios.get('http://localhost:5001/contacts')
            .then(res => setContacts(res.data))
            .catch(() => setError('Не вдалося завантажити список контактів'));
    }, []);

    useEffect(() => {
        if (!success) return;
        const timer = setTimeout(() => setSuccess(''), 5000);
        return () => clearTimeout(timer);
    }, [success]);


    const handleTemplateChange = e => {
        setMessage(e.target.value);
    };

    const handleSend = e => {
        e.preventDefault();
        setError('');
        setSuccess('');

        axios.post('http://localhost:5001/send', { subject, message, sendTo })
            .then(res => {
                setSuccess(res.data.message || 'Розсилку успішно відправлено!');
                setSubject('');
                setMessage('');
                setSendTo('all');
            })
            .catch(() => setError('Помилка при відправці листів'));
    };

    return (
        <div className="container mt-5">
            <h2>Розсилка листів</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSend}>
                <div className="mb-3">
                    <label className="form-label">Тема</label>
                    <input
                        type="text"
                        className="form-control"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Шаблон повідомлення</label>
                    <select
                        className="form-select"
                        onChange={handleTemplateChange}
                    >
                        <option value="">— Виберіть шаблон —</option>
                        {templates.map((t, i) => (
                            <option key={i} value={t}>{t}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Повідомлення</label>
                    <textarea
                        className="form-control"
                        rows="5"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Кому відправити</label>
                    <select
                        className="form-select"
                        value={sendTo}
                        onChange={e => setSendTo(e.target.value)}
                    >
                        <option value="all">Всім</option>
                        {contacts.map(c => (
                            <option key={c._id} value={c.email}>{c.email}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-success"
                    style={{ width: '400px', display: 'block', margin: '0 auto' }}
                >
                    Відправити
                </button>
            </form>
        </div>
    );
};

export default EmailPage;
