const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const server = express();

const ProjectRouter = require('./projects/projects-router')
// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.use(express.json())
server.use(morgan('dev'))
server.use(helmet())

server.use('/api/projects', ProjectRouter)

server.get('/', (req, res) => {
    res.send(`
    <h1>Sprint Challenge Server</h1>
    <p>Welcome to my Sprint Challenge Api! ^_^</p>
    `)
})

module.exports = server;
