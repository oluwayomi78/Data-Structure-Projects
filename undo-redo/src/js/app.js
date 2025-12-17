import { UndoRedoSystem } from "./stacks.js";
import { saveState, loadState } from "./database.js";

const actionInput = document.getElementById("actionInput");
const addBtn = document.getElementById("addBtn");
const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");
const displayArea = document.getElementById("displayArea");
const undoDisplay = document.getElementById("undoDisplay");
const redoDisplay = document.getElementById("redoDisplay");
const system = new UndoRedoSystem();

const updateDisplay = () => {
    displayArea.textContent = "Current State: " + (system.currentState || "None");
};
const updateUndoRedoDisplay = () => {
    undoDisplay.textContent = "Undo State: " + (system.undoStack.items[system.undoStack.items.length - 1] || "None");
    redoDisplay.textContent = "Redo State: " + (system.redoStack.items[0] || "None");
};
window.addEventListener("DOMContentLoaded", async () => {
    const saved = await loadState();
    
    if (saved) {
        system.undoStack.items = saved.undoStack || [];
        system.redoStack.items = saved.redoStack || [];
        system.currentState = saved.currentState || "";
        updateDisplay();
        updateUndoRedoDisplay();
    }
});

const addAction = async () => {
    const action = actionInput.value.trim();
    if (!action) return alert("Enter an action first");

    system.addAction(action);
    await saveState(system);
    updateDisplay();
    updateUndoRedoDisplay();
    actionInput.value = "";
};

const handleUndo = async () => {
    if (system.undo() === null) return alert("Nothing to undo");
    await saveState(system);
    updateDisplay();
    updateUndoRedoDisplay();
};

const handleRedo = async () => {
    if (system.redo() === null) return alert("Nothing to redo");
    await saveState(system);
    updateDisplay();
    updateUndoRedoDisplay();
};

addBtn.addEventListener("click", addAction);
undoBtn.addEventListener("click", handleUndo);
redoBtn.addEventListener("click", handleRedo);
