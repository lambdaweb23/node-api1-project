// implement your API here
console.log("It's alive!");
// import express from 'express'; // ES Modules
const express = require('express');
const db = require('./data/db.js');
const server = express(); // creates a server

// listen for requests in a particular port on localhost
const port = 5000; // localhost:5000
server.listen(port, () => console.log('\n=== API on port 5000 ===\n'));

// middleware
server.use(express.json()); // teaches express how to read JSON
// needed for the POST and PUT to work

// request/route handlers
// handles GET requests to / on localhost:8000
server.get('/', (req, res) => {
    res.send('Data!');
});

// GET to /users that returns a list of hubs
server.get('/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: 'failed to get users from db' });
        });
});

// POST to /hubs
server.post('/users', (req, res) => {
    const userInformation = req.body;

    console.log('user information', userInformation);

    db.insert(userInformation)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log('error', err);
            res.status(400).json({ error: 'Please provide name and bio for the user.' });
        });
});

// GET to /users/:id that returns the object for that specific user id
server.get('/users/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log('error', err);
            res.status(404).json({ error: 'The user with the specified ID does not exist.' });
        });
});


//remove user with specific user id 
server.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(user => {
            res.status(200).json({ message: `user with id ${id} deleted` });
        })
        .catch(err => {
            console.log('error', err);
            res.status(404).json({ error: 'The user with the specified ID does not exist.' });
        });
});