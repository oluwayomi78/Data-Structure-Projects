const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const Actions = require("./model/actionModel");

const PORT = process.env.PORT || 5000; // ✅ match frontend
const uri = process.env.mongoURI;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(uri)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

app.post("/save", async (req, res) => {
    try {
        const { state } = req.body;

        if (!state) {
            console.log("No state received");
            return res.status(400).json({ error: "No state received" });
        }
        await Actions.deleteMany({});
        await Actions.create({ state });

        res.json({ message: "State saved successfully" });
    } catch (error) {
        res.status(500).json({
            error: "Failed to save state",
            details: error.message
        });
    }
});

app.get("/load", async (req, res) => {
    try {
        const latestState = await Actions.findOne().sort({ createdAt: -1 });
        res.json(latestState ? latestState.state : null);
    } catch (error) {
        res.status(500).json({
            error: "Failed to load state",
            details: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
