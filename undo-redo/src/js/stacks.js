export class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    clear() {
        this.items = [];
    }
}

export class UndoRedoSystem {
    constructor() {
        this.undoStack = new Stack();
        this.redoStack = new Stack();
        this.currentState = '';
    }

    addAction(action) {
        this.undoStack.push(this.currentState);
        this.currentState = action;
        this.redoStack.clear();
    }

    undo() {
        if (this.undoStack.isEmpty()) return null;

        const lastAction = this.undoStack.pop();
        this.redoStack.push(lastAction);

        this.currentState = this.undoStack.peek() || "";
        return this.currentState;
    }

    redo() {
        if (this.redoStack.isEmpty()) return null;

        const redoAction = this.redoStack.pop();
        this.undoStack.push(redoAction);

        this.currentState = redoAction;
        return this.currentState;
    }
}
