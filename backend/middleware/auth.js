import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    // Frontend se token headers mein aayega
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized, Login Again" });
    }

    try {
        // Token ko decode karke user ki ID nikalna
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next(); // Agle function (placeOrder) par bhejo
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in Authentication" });
    }
}

export default authMiddleware;