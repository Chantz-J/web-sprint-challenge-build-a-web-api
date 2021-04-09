// Write your "projects" router here!
const express = require('express')
const router = express.Router()

const Projects = require('./projects-model')
const mw = require('../middleware/projects-middleware')

//[GET]
router.get('/', (req, res) => {
    Projects.get()
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
router.get('/:id', mw.checkId, (req, res) => {
    res.status(200).json(req.project)
})
//[POST]
router.post('/', (req, res) => {
    Projects.insert(req.add)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(error => {
        console.error(error.message)
        res.status(500).json({
            message: 'Error adding project'
        })
    })
})
//[UPDATE]
router.put('/:id', mw.checkId, mw.checkProjectUpdates, (req, res, next) => {
    const id = req.params.id;
    const changes = req.body;

    !changes && res.status(400).json({ message: "No updates in request body." })

    Project.update(id, changes)
        .then(updates => {
            res.status(200).json(updates);
        })
        .catch(err => {
            next(err);
        })
})

//[DELETE]
router.delete('/:id', mw.checkId, async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await Project.remove(id);
        res.json(data);
    } catch (err) {
        next(err);
    }
})

router.use((error, req, res) => {
    res
      .status(500)
      .json({ message: error.message, stack: error.stack });
  });

module.exports = router