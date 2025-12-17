const set = new Set();
const visitorKeys = new Set();

const _handleTrack = () => {
    const visitorID = document.getElementById('visitorID').value.trim();
    const Email = document.getElementById('email').value.trim();
    const IP = document.getElementById('ip').value.trim();
    const totalVisitorsElement = document.getElementById('totalVisitors');
    const timeElement = document.getElementById('time');
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();

    if (!visitorID || !Email || !IP) {
        alert('Please fill in all fields.');
        return;
    }

    const key = `${visitorID}|${Email}|${IP}`;

    if (visitorKeys.has(key)) {
        alert('Duplicate visitor entry ignored.');
        return;
    }
    visitorKeys.add(key);
    set.add({
        visitorID,
        Email,
        IP,
        time: formattedTime
    });
    totalVisitorsElement.textContent = set.size;
    timeElement.textContent = `Last updated at ${formattedTime}`;

    document.getElementById('visitorID').value = '';
    document.getElementById('email').value = '';
    document.getElementById('ip').value = '';
    display();
};

function display() {
    const container = document.getElementById("visitor");
    container.innerHTML = "";

    set.forEach(data => {
        container.insertAdjacentHTML("beforeend", `
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 p-3 border-b">
            <div>
                <h4 class="font-semibold text-gray-900">${data.visitorID}</h4>
                <div class="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-4 mt-1 text-sm text-gray-500">
                    <span class="flex items-center gap-1.5">
                        <i class="fa-solid fa-envelope text-gray-400 text-xs"></i>
                        ${data.Email}
                    </span>
                    <span class="hidden sm:inline text-gray-300">|</span>
                    <span class="flex items-center gap-1.5">
                        <i class="fa-solid fa-network-wired text-gray-400 text-xs"></i>
                        ${data.IP}
                    </span>
                </div>
            </div>
            <div class="text-gray-400 text-xs font-mono pt-2 md:pt-0">
                ${data.time}
            </div>
        </div>
        `);
    });
}

const _clearAll = () => {
    set.clear();
    visitorKeys.clear();

    document.getElementById('totalVisitors').textContent = '0';
    document.getElementById('time').textContent = '';
    document.getElementById('visitor').innerHTML = '';
};
