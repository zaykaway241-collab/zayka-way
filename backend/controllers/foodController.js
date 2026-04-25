import foodModel from "../models/foodModel.js";
import fs from 'fs';

// Add Food Item
const addFood = async (req, res) => {
    if (!req.file) {
        return res.json({success: false, message:"photo upload nhi hui hai"});
    }
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save();
        res.json({ success: true, message: "Food Added Successfully!" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding food" })
    }
}

// Get all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching food list" })
    }
}

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        // Folder se image delete karne ke liye
        fs.unlink(`uploads/${food.image}`, () => {})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing food" })
    }
}

export { addFood, listFood, removeFood };

