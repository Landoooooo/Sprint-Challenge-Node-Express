const express = require('express');

const projects = require('./projects/projects.js');

const router = express.Router();

router.get('/', (req,res) => {
    res.status(200).send('This is getting kinda fun :)');
})

router.use('/projects', projects )

module.exports = router;