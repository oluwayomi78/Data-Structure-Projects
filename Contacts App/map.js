const contacts = new Map();

const _saveContact = () => {
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name || !phone) {
        alert("Please enter both name and phone number!");
        return;
    }
    if (contacts.has(name)) {
        alert("Contact already exists!");
        return;
    }
    if ([...contacts.values()].includes(phone)) {
        alert("Phone number already exists!");
        return;
    }
    if (phone.length < 11 || phone.length > 15 || !/^\+?[0-9\- ]+$/.test(phone)) {
        alert("Please enter a valid phone number!");
        return;
    }
    contacts.set(name, phone);
    console.log('Contact saved:', { name, phone });
    nameInput.value = "";
    phoneInput.value = "";
    renderContacts();
};


function renderContacts(searchQuery = "") {
    const list = document.getElementById("contactsList");
    list.innerHTML = ""; 

    const filteredContacts = Array.from(contacts).filter(([name, phone]) =>
        name.toLowerCase().includes(searchQuery)
        || phone.includes(searchQuery)
    );

    filteredContacts.forEach(([name, phone]) => {
        const div = document.createElement("div");
        div.className = "flex flex-col sm:flex-row items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors gap-4";

        const infoDiv = document.createElement("div");
        infoDiv.className = "flex items-center gap-4 w-full sm:w-auto";
        infoDiv.innerHTML = `
            <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                <i class="fa-solid fa-user"></i>
            </div>
            <div>
                <h3 class="font-bold text-gray-900">${name}</h3>
                <p class="text-gray-500 text-sm">${phone}</p>
            </div>
        `;
        const btnDiv = document.createElement("div");
        btnDiv.className = "flex items-center gap-2 w-full sm:w-auto justify-end";
        const editBtn = document.createElement("button");
        editBtn.className = "w-8 h-8 rounded border border-blue-200 text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors";
        editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        editBtn.onclick = () => editContact(name);
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "w-8 h-8 rounded border border-red-200 text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors";
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        deleteBtn.onclick = () => deleteContact(name);
        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(deleteBtn);
        div.appendChild(infoDiv);
        div.appendChild(btnDiv);
        list.appendChild(div);
    });
    const badge = document.querySelector(".bg-blue-100.text-blue-700.text-xs.font-semibold");
    if (badge) badge.textContent = `${filteredContacts.length} contact${filteredContacts.length !== 1 ? "s" : ""}`;
}


function deleteContact(name) {
    if (contacts.has(name)) {
        contacts.delete(name);
        renderContacts();
    }
}

function editContact(name) {
    if (contacts.has(name)) {
        const phone = contacts.get(name);
        document.getElementById("name").value = name;
        document.getElementById("phone").value = phone;
        contacts.delete(name);
        renderContacts();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", () => {
        renderContacts(searchInput.value.trim().toLowerCase());
    });
});