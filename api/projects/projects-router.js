// Write your "projects" router here!
const express = require('express')
const router = express.Router()

const Projects = require('./projects-model')

//[GET]
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
//[GET]
router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        if(project){
            res.status(200).json(project)
        } else {
            res.status(404).json({message: 'Project not found'})
        }
    })
})

module.exports = router