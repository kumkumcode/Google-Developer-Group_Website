const cors = require('cors'); // Add this
app.use(cors()); // Add this

require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./db'); 
const User = require('./models/User'); 
const EventRegistration = require('./models/Event'); 

const app = express();

// 1. Connect to Cloud MongoDB Atlas
connectDB(); 

// 2. Middleware
app.use(bodyParser.json());

// 3. Static File Mapping (Optimized for your folder structure)
// This ensures images, scripts, and styles load perfectly
app.use('/images', express.static(path.join(__dirname, '../frontend/images')));
app.use('/js', express.static(path.join(__dirname, '../frontend/js')));
// Serves your HTML and CSS from the folder where you kept them
app.use(express.static(path.join(__dirname, '../frontend/css')));

// 4. API ROUTES

// SIGNUP: Create new community member
app.post('/api/signup', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ success: true, message: "Member registered in Cloud DB!" });
    } catch (err) {
        res.status(400).json({ success: false, message: "Email already exists or invalid data!" });
    }
});

// LOGIN: Authenticate existing member
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            res.json({ success: true, userName: user.fullName, message: "Login successful" });
        } else {
            res.status(401).json({ success: false, message: "Invalid Email or Password" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// EVENT REGISTRATION: Store student registration data
app.post('/api/event-register', async (req, res) => {
    try {
        const newReg = new EventRegistration(req.body);
        await newReg.save();
        res.status(201).json({ success: true, message: "Event registration saved to Cloud!" });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ success: false, message: "Database storage failed" });
    }
});

// 5. SERVE FRONTEND
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/css/index.html'));
});

// 6. START SERVER
// This uses PORT 5000 from your .env file
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n==========================================`);
    console.log(`🚀 GDG CSMU Platform is LIVE`);
    console.log(`🔗 URL: http://localhost:${PORT}`);
    console.log(`==========================================\n`);
});