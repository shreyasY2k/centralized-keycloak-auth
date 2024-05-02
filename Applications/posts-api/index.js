require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

const app = express();

const PORT = process.env.PORT
const KEYCLOAK_INTROSPECTION_URL = process.env.KEYCLOAK_INTROSPECTION_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Middleware to validate access token
const validateToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    // console.log('Token:', token)
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    try {
        const response = await fetch(KEYCLOAK_INTROSPECTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'token': token,
                'client_id': CLIENT_ID,
                'client_secret': CLIENT_SECRET
            })
        });

        const data = await response.json();
        // console.log('Introspection data:', data);
        if (data.active) {
            const decodedToken = jwt.decode(token);
            if (decodedToken.allowed_paths.includes(req.path) && decodedToken.azp === CLIENT_ID) {
                req.user = decodedToken;
                next();
            } else {
                res.status(403).json({ message: 'Access forbidden' });
            }
        } else {
            res.status(401).json({ message: 'Access token is invalid' });
        }
    } catch (error) {
        console.error('Error validating access token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Dummy data
const usersData = [
    { id: 1, username: 'user1' },
    { id: 2, username: 'user2' },
    { id: 3, username: 'user3' }
];

const postsData = [
    { id: 1, title: 'Post 1', content: 'Content of post 1' },
    { id: 2, title: 'Post 2', content: 'Content of post 2' },
    { id: 3, title: 'Post 3', content: 'Content of post 3' }
];

// Routes
app.get('/admin', validateToken, (req, res) => {
    res.json({ message: 'Admin endpoint', user: req.user });
});

app.get('/users', validateToken, (req, res) => {
    res.json({ message: 'Users endpoint', data: usersData });
});

app.get('/posts', validateToken, (req, res) => {
    res.json({ message: 'Posts endpoint', data: postsData });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
