// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!
const express = require('express');

const apiRoutes = require('./apiRoutes/apiRoutes.js');

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.send('API up and running')
});

server.use('/api', apiRoutes);

const PORT = 8080;

server.listen(PORT, () => console.log(`Server running on port:${PORT}`));