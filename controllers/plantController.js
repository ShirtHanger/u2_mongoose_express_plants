/* Here's how you import the plants database into our controller */

const Plant = require('../models/plant');

// INDEX - app.get
const getAllPlants = async (req, res) => {
    /* try-catch is like an if else statement, prints an error on else */
    try {
        const plants = await Plant.find()
        res.json(plants) /* Sends data in json format */
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
// SHOW - app.get
getPlantById = async (req, res) => {
    try {
        const { id } = req.params
        const plant = await Plant.findById(id)
        if (plant) {
            return res.json(plant)
        } return res.status(404).send(`Plant with id of ${id} not found!`) // Technically an else statement
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') { /* Higher order error handling */
            return res.status(404).send(`That plant doesn't exist`)
        }
        return res.status(500).send(error.message)
    }
}

// CREATE - app.post
const createPlant = async (req, res) => {
    try {
        const plant = await new Plant(req.body) /* Enables ability to update via tools like Thunderclient */
        await plant.save()
        return res.status(201).json({plant});
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
// UPDATE - app.put (Most complex function, causes most problems)
const updatePlant = async (req, res) => {
    try {
        let { id } = req.params;
        let plant = await Plant.findByIdAndUpdate(id, req.body, 
            { new: true }) /* new: true, reloads page, shows NEW page */
        if (plant) {
            return res.status(200).json(plant)
        }
        throw new Error("Plant not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
// DELETE - app.delete
const deletePlant = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Plant.findByIdAndDelete(id) /* Simply deletes the matching item */
        if (deleted) {
            return res.status(200).send("Plant deleted");
        }
        throw new Error("Plant not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllPlants,
    getPlantById,
    createPlant,
    updatePlant,
    deletePlant
}