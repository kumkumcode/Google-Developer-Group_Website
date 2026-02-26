require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
const User = require('./models/User');
const EventRegistration = require('./models/Event');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// 1. Connect to MongoDB
connectDB();

// 2. Serve static assets (CSS, JS, Images)
app.use('/css', express.static(path.join(__dirname, '../frontend/css')));
app.use('/js', express.static(path.join(__dirname, '../frontend/js')));
app.use('/images', express.static(path.join(__dirname, '../frontend/images')));

// 3. API routes
app.post('/api/signup', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ success: true, message: "Member registered in Cloud DB!" });
    } catch (err) {
        res.status(400).json({ success: false, message: "Email already exists or invalid data!" });
    }
});

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

// 4. Serve HTML pages - FIXED ROUTING
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/events', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/events.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/signup.html'));
});

app.get('/organizers', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/organizers.html'));
});

// 5. Catch-all: Simple fallback
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 6. Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n==========================================`);
    console.log(`🚀 GDG CSMU Platform is LIVE`);
    console.log(`🔗 URL: http://localhost:${PORT}`);
    console.log(`==========================================\n`);
});