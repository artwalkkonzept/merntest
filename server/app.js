const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

/**** Configuration ****/
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
app.use(express.static('../client/build')); // Needed for serving production build of React

/**** Database ****/
const artwalkDB = require('./artwalk_db')(mongoose);

/**** Routes ****/
app.get('/api/artwalks', async (req, res) => {
    const artwalks = await artwalkDB.getArtwalks();
    res.json(artwalks);
});

app.get('/api/artwalks/:id', async (req, res) => {
    let id = req.params.id;
    const artwalk = await artwalkDB.getArtwalk(id);
    res.json(artwalk);
});

app.post('/api/artwalks', async (req, res) => {
    let artwalk = {
        name : req.body.name,
        bilds : [] // Empty bild array
    };
    const newArtwalk = await artwalkDB.createArtwalk(artwalk);
    res.json(newArtwalk);
});

app.post('/api/artwalks/:id/bilds', async (req, res) => {
    const id = req.params.id;
    const bild = req.body.bild;
    const updatedArtwalk = await artwalkDB.addBild(id, bild);
    res.json(updatedArtwalk);
});

// "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html) to be handled by Reach router
// It's important to specify this route as the very last one to prevent overriding all of the other routes
app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);

/**** Start ****/
const url = process.env.MONGO_URL || 'mongodb://localhost/artwalk_db';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        await artwalkDB.bootstrap(); // Fill in test data if needed.
        await app.listen(port); // Start the API
        console.log(`Artwalk API running on port ${port}!`);
    })
    .catch(error => console.error(error));
