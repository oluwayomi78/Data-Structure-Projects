const API = "http://localhost:5000";

export async function saveState(system) {
    await fetch(`${API}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            state: {
                undoStack: system.undoStack.items,
                redoStack: system.redoStack.items,
                currentState: system.currentState
            }
        })
    });
}

export async function loadState() {
    const res = await fetch(`${API}/load`);
    return await res.json();
}
