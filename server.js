const express = require('express');
const db = require('./db');

/* Optional (?), for logging functionality */
const bodyParser = require('body-parser');
const logger = require('morgan');


const plantController = require('./controllers/plantController')
// require() imports and middleware here ^ ///////

const PORT = process.env.PORT || 3001;

const app = express();

// app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

/* Optional (?), for logging functionality */
app.use(logger('dev'))
app.use(bodyParser.json())
// app.use() middleware here ^ ///////////////////

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))



app.get('/', (req, res) => res.send('This is our landing page!'))

// INDEX - app.get
app.get('/plants', plantController.getAllPlants)
// SHOW - app.get
app.get('/plants/:id', plantController.getPlantById)
// CREATE - app.post
/* POST Goes to INDEX route because we are creating something new */
app.post('/plants', plantController.createPlant) // .post will create stuff!
/* UPDATE and DELETE must go in show route since we are updating a specific item */
// UPDATE - app.put
app.put('/plants/:id', plantController.updatePlant)
// DELETE - app.delete
app.delete('/plants/:id', plantController.deletePlant)

/* body-parser is needed for CRUD stuff (?) */
/* Browser can only GET, we need tools to do full CRUD */
/* Create stuff with ThunderClient or something similar */




app.get('/*', (req, res) => res.send('404 ERROR PAGE NOT FOUND'))
