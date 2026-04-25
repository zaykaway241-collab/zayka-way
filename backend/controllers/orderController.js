import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Order Place karne ka function
const placeOrder = async (req, res) => {
    // Dynamic URL: Kisi bhi PC/Port par chale isliye .env se uthayega
    const frontend_url = process.env.FRONTEND_URL || "http://localhost:5174"; 

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            // LOGIC: Agar COD hai toh payment true mark karo (Status ke liye), Stripe hai toh false rehne do
            payment: req.body.paymentMethod === "cod" ? true : false 
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // --- 1. CASH ON DELIVERY (COD) LOGIC ---
        if (req.body.paymentMethod === "cod") {
            return res.json({ success: true, message: "Order Placed via COD" });
        }

        // --- 2. STRIPE PAYMENT LOGIC (Agar COD nahi hai) ---
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: { name: item.name },
                unit_amount: item.price * 100 
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: { name: "Delivery Charges" },
                unit_amount: 40 * 100 
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Placing Order" })
    }
}

// Payment Verify karne ka function (Stripe redirection ke baad)
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid Successfully" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in verification" });
    }
}

// User ke orders fetch karne ka function
const userOrders = async (req, res) => {
    try {
        // FILTER: Sirf wahi orders dikhao jinki payment true hai (COD or Paid Stripe)
        const orders = await orderModel.find({ userId: req.body.userId, payment: true });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error); // Error variable define kiya
        res.json({ success: false, message: "Error fetching orders" });
    }
}
// Admin Panel ke liye saare orders fetch karna
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching orders list" });
    }
}

// Order ka status update karne ke liye (Admin side se)
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating status" });
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus }