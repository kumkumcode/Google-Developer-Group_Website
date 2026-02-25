const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
    try {
        // This forces Node to use Google DNS to find your Atlas cluster
        dns.setServers(['8.8.8.8', '8.8.4.4']);
        
        const uri = process.env.MONGO_URI; 
        
        await mongoose.connect(uri);
        
        console.log("✅ Cloud MongoDB Connected Successfully!");
    } catch (err) {
        console.log("❌ MongoDB Connection Failed!");
        console.log("Error Details: " + err.message);
    }
};

module.exports = connectDB;