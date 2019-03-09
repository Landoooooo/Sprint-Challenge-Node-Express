const express = require('express');

const Actions = require('../../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', async (req,res) => {
    try{
        const actions = await Actions.get();
        res.status(200).json(actions)
    } catch (e) {
        res.status(500).json({err: "There was a problem getting the actions"})
    }
});

router.get('/:id', async (req,res) => {
    try{
        const { id } = req.params;
        if(Actions.get(id)){
            const actions = await Actions.get(id);
            res.status(200).json(actions)
        } else {
            res.status(404).json({err: "That ID doesn't exist"})
        }
    } catch (e) {
        res.status(500).json({err: "There was an error getting the actions from the database"})
    }
});

router.post('/', async (req,res) => {
    try{
        const { project_id } = req.body;
        const { description } = req.body;
        const { notes } = req.body;

        const actionParams = {project_id, description, notes}

        if(description && notes){
            const newAction = await Actions.insert(actionParams);
            res.status(200).json(newAction);
        } else {
            res.status(404).json({err: "You're missing a key param that is required for the action to be added."})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({err: "There was a problem with adding the post to the database"})
    }
});

router.put('/', async (req,res) => {
    try{
        const {project_id} = req.body;
        const { description } = req.body;
        const { notes } = req.body;

        const actionParams = {project_id, description, notes}

        if(description && notes){
            const updatedActions = await Actions.update(actionParams);
            res.status(200).json(updatedActions)
        } else {
            res.status(404).json({err: "You're missing a key param that is required for the action to be added."})
        }
    } catch (e){
        console.log(e);
        res.status(500).json({err: "There was a problem with updating the action to the database"})
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        if(Actions.get(id)){
            const deleteAction = await Actions.remove(id);
            res.status(200).json(deleteAction);
        }else{
            res.status(404).json({err: "Jaden Smith once said how can I delete an action that doesn't exist???"});
        }
    } catch (e) {
        res.status(500).json({err: "There was a problem with deleting the action from the database"});
    }
})

module.exports = router;