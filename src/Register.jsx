import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Farmer' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            login(res.data.user); // or res.data depending on your backend
            navigate('/');
        } catch (err) {
            console.error(err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Registration failed. Please try again.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Register</h2>

            {error && <p className="text-red-600 mb-2">{error}</p>}

            <input name="name" placeholder="Name" onChange={handleChange} required className="w-full mb-2 p-2 border" />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full mb-2 p-2 border" />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full mb-2 p-2 border" />
            <select name="role" onChange={handleChange} required className="w-full mb-4 p-2 border">
                <option value="Farmer">Farmer</option>
                <option value="Buyer">Buyer</option>
                <option value="Vet">Veterinary Doctor</option>
                <option value="Service Provider">Service Provider</option>
            </select>

            <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">Register</button>
        </form>
    );
}
