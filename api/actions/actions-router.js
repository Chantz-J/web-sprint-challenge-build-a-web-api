// Write your "actions" router here!
const express = require('express')
const router = express.Router()

const Actions = require('./actions-model')
const mw = require('../middleware/actions-middleware')

//[GET]
router.get('/', (req, res) => {
    Actions.get()
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            res.status(404).json({ message: 'Action not found.' });
        })
})


//[POST]
router.post('/', mw.checkAction, async (req, res, next) => {
    try {
        const newAction = req.body;
        const data = await Actions.insert(newAction);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
});

//[UPDATE]
router.put('/:id', mw.checkId, mw.checkActionUpdates, (req, res, next) => {
    const id = req.params.id;
    const changes = req.body;

    !changes && res.status(400).json({ message: "No updates in request body." })

    Actions.update(id, changes)
        .then(update => {
            res.status(200).json(update);
        })
        .catch(err => {
            next();
        })
})

//[DELETE]
router.delete('/:id', mw.checkId, async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await Actions.remove(id);
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