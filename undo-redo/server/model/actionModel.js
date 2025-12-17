const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema(
    {
        state: {
            undoStack: [String],
            redoStack: [String],
            currentState: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Actions", actionSchema);