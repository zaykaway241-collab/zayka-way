import express from "express";
import { addFood } from "../controllers/foodController.js";
import { listFood } from "../controllers/foodController.js";
import { removeFood } from "../controllers/foodController.js";
import multer from "multer";
import { placeOrder } from "../controllers/orderController.js";


const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.post("/place",  placeOrder);

export default foodRouter;