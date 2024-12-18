import React, { useState } from 'react';
import axios from 'axios';

function ServiceBookingPage() {
    const [formData, setFormData] = useState({
        user_id: 1, // Hardcoded user ID for now
        service_type: '',
        description: '',
        booking_date: '',
    });

    const [message, setMessage] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Submit service booking
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/services', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error booking service');
            console.error('Booking Error:', error);
        }
    };

    return (
        <div>
            <h1>Book a Service</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Service Type:</label>
                    <input
                        type="text"
                        name="service_type"
                        value={formData.service_type}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Booking Date:</label>
                    <input
                        type="date"
                        name="booking_date"
                        value={formData.booking_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Book Service</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ServiceBookingPage;
