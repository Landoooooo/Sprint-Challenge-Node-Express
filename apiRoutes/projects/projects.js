const express = require('express');

const Projects = require('../../data/helpers/projectModel');

const router = express.Router();

router.get('/', async (req,res) => {
    try{
        const projects = await Projects.get();
        res.status(200).json(projects)
    } catch (e) {
        res.status(500).json({ error: "There was an error getting the projects from the database" })
    }
});

router.get('/:id/actions/', async (req,res) => {
    try{
        const { id } = req.params;
        if(Projects.get(id)){
            const project = Projects.getProjectActions(id);
            res.status(200).json(project)
        }else{
            res.status(404).json({erroMessage: "There was an error with the ID, please try again."})
        }
    } catch(e) {
        console.log(e)
        res.status(500).json({ error: "There was an error getting the project from the database" })
    }
});

router.post('/', async (req,res) => {
    try{
        const { name } = req.body;
        const { description } = req.body;
        const newProject = {name, description};

        if( name && description){
            const project = await Projects.insert(newProject)
            res.status(200).json(project)
        } else {
            res.status(404).json({error: "You're missing the name or description for your project"})
        }
    } catch (e) {
        res.status(500).json({ error: "There was an error adding a new project to database" })
    }
});

router.put('/:id', async (req,res) => {
    try{
        const { id } = req.params;
        const { name } = req.body;
        const { description } = req.body;
        const updatedProject = {name, description};

        if(Project.get(id) && name && description){
            const project = await Projects.update(id, updatedProject);
            res.status(200).json(project)
        } else {
            res.status(404).json({errMessage: "There was an error updating your project"})
        }
    } catch (e) {
        res.status(500).json({ error: "There was an error adding a new project to database" })
    }
});

router.delete('/:id', async (req,res) => {
    try{
        const { id } = req.params;
        if(Projects.get(id)){
            const project = await Projects.remove(id)
            res.status(200).json(project)
        } else {
            res.status(404).json({err: "The ID of this project does not exist :("})
        }
    } catch (e) {
        res.status(500).json({err: "There was an error removing this project from the database"})
    }
})

module.exports = router;