// Write your "projects" router here!
const express = require('express')
const router = express.Router()

const Projects = require('./projects-model')

router.get('/', (req, res) => {
    Projects.get(req.query)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        console.error(error.message)
        res.status(500).json({
            message: 'Error retrieving projects'
        })
    })
})