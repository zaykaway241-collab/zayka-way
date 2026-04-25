import express from "express"
import cors from "cors"
import 'dotenv/config' 
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import orderRouter from "./routes/orderRoute.js"
import userRouter from "./routes/userRoute.js"

// App Config
const app = express()

const port = process.env.PORT || 4000


app.use(express.json()) 

// CORS Configuration: Abhi ke liye '*' rakha hai taaki Vercel se connect ho jaye
app.use(cors()) 


connectDB();

// API Endpoints
app.get("/", (req, res) => {
    res.send("API Working Bhai! Zayka WAY Server is Live.")
})

app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'));
app.use("/api/order", orderRouter);
app.use("/api/user", userRouter);

// Server Start
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})