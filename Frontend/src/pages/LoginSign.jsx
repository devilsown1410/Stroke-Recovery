import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginSign = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const navigate = useNavigate();

    // Reset form fields when switching between Login and Signup
    useEffect(() => {
        setEmail('');
        setPassword('');
        setUsername('');
        setDateOfBirth('');
        setGender('');
    }, [isLogin]);

    const handleToggle = () => {
        setIsLogin((prev) => !prev);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', email);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/signin', {
                email,
                username,
                password,
                dateOfBirth,
                gender,
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', email);
            navigate('/dashboard');
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700">
                    {isLogin ? 'Login' : 'Sign Up'}
                </h2>
                <form className="mt-4" onSubmit={isLogin ? handleLogin : handleSignUp}>
                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block text-gray-600">Name</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-600">E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-600">Date of Birth</label>
                                <input
                                    type="date"
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-600">Gender</label>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>

                    <button
                        type="button"
                        onClick={handleToggle}
                        className="w-full mt-2 text-blue-500 hover:underline"
                    >
                        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginSign;
