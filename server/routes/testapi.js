var express = require("express");
var router = express.Router();

let responseData = [];
var count = 1;

router.get('/', function(req, res, next) {
    res.json(responseData);
});

router.post('/', function(req, res, next){
    console.log("Form data received:", req.body);
    const newItem = { ...req.body, id: count++ };
    responseData.push(newItem);
    res.json({ responseData });
});

router.delete('/:id', function(req, res, next) {
    const id = req.params.id;
    console.log("Deleting item with ID:", id);
    responseData = responseData.filter(item => item.id !== parseInt(id));
    res.json({ message: "Item deleted successfully" });
});

router.get('/:id', function(req, res, next){
    const id = parseInt(req.params.id);
    console.log("Requested ID:", id);
    
    let updatingData = responseData.find((item) => item.id === id);
    console.log("Updating data :", updatingData);
    res.json(updatingData);
});

router.put('/:id', function(req, res, next){
    const id = parseInt(req.params.id);
    console.log("Requested ID:", id);
    console.log("Request Body:", req.body);
    
    let updatingDataIndex = responseData.findIndex((item) => item.id === id);

    // If the item is found, update its properties
    if (updatingDataIndex !== -1) {
        responseData[updatingDataIndex] = { id, ...req.body };
        res.json({ message: "Data updated successfully", updatedItem: responseData[updatingDataIndex] });
    } else {
        res.status(404).json({ message: "Data not found with the given ID" });
    }
});

module.exports = router;

