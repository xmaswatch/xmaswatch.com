const itinerary = [
    { name: "Traveling to Tokyo ✈️", start: "2026-03-13T00:00:00", end: "2026-03-14T09:00:00" },
    { name: "Exploring Tokyo 🇯🇵", start: "2026-03-14T09:00:00", end: "2026-03-18T00:00:00" },
    { name: "Tokyo -> Coron ✈️", start: "2026-03-18T00:00:00", end: "2026-03-19T00:00:00" },
    { name: "Island Hopping in Coron 🏝️", start: "2026-03-19T00:00:00", end: "2026-03-21T00:00:00" },
    { name: "Coron -> El Nido Expedition ⛵", start: "2026-03-21T00:00:00", end: "2026-03-24T00:00:00" },
    { name: "Relaxing in El Nido 🌊", start: "2026-03-24T00:00:00", end: "2026-03-25T08:00:00" },
    { name: "Traveling to Moalboal 🚗", start: "2026-03-25T08:00:00", end: "2026-03-26T00:00:00" },
    { name: "Moalboal & Cebu 🐢", start: "2026-03-26T00:00:00", end: "2026-03-28T00:00:00" },
    { name: "Magic of Siquijor ✨", start: "2026-03-28T00:00:00", end: "2026-04-01T00:00:00" },
    { name: "Cebú City 🏙️", start: "2026-04-01T00:00:00", end: "2026-04-03T00:00:00" },
    { name: "Cebú -> Istanbul ✈️", start: "2026-04-03T00:00:00", end: "2026-04-04T00:00:00" },
    { name: "Istanbul Wonders 🇹🇷", start: "2026-04-04T00:00:00", end: "2026-04-06T23:59:59" },
    { name: "Back at the office! 💻", start: "2026-04-07T00:00:00", end: "2030-01-01T00:00:00" }
];

const SECRET_HASH = "d91222a90dcdb84eca3cda295a4f9332714631390933316dcfd9a111aa943330";
const TOPIC = "adventure2026_" + SECRET_HASH.substring(0, 15);
const CLEAR_COMMAND = "__CLEAR_ALL_COMMAND__";

function getNow() {
    const urlParams = new URLSearchParams(window.location.search);
    const testDate = urlParams.get('date');
    if (testDate) return new Date(`${testDate}T12:00:00`).getTime();
    return new Date().getTime();
}

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

let clickCount = 0;
function handleTitleClick() {
    clickCount++;
    if (clickCount === 3) {
        document.getElementById('admin-modal').style.display = 'block';
        clickCount = 0;
    }
    setTimeout(() => { clickCount = 0; }, 1000);
}

function closeAdmin() {
    document.getElementById('admin-modal').style.display = 'none';
    document.getElementById('admin-password').value = '';
    document.getElementById('admin-message').value = '';
}

function toggleAnnouncements() {
    const panel = document.getElementById('announcements-panel');
    panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
}

async function postAnnouncement() {
    const password = document.getElementById('admin-password').value;
    const message = document.getElementById('admin-message').value;
    const btn = document.getElementById('post-btn');

    if (!message) return alert("Please enter a message!");
    const hash = await sha256(password);
    if (hash !== SECRET_HASH) return alert("Wrong password!");

    btn.innerText = "Posting...";
    btn.disabled = true;

    try {
        const response = await fetch(`https://ntfy.sh/${TOPIC}`, {
            method: 'POST',
            body: message
        });

        if (response.ok) {
            alert("Success! The message is live.");
            closeAdmin();
            loadAnnouncement();
        } else {
            alert("Failed to post.");
        }
    } catch (e) {
        alert("Error: " + e.message);
    } finally {
        btn.innerText = "Post";
        btn.disabled = false;
    }
}

async function clearAnnouncements() {
    const password = document.getElementById('admin-password').value;
    const btn = document.getElementById('clear-btn');
    
    const hash = await sha256(password);
    if (hash !== SECRET_HASH) return alert("Wrong password!");

    if (!confirm("Are you sure you want to delete all current messages?")) return;

    btn.innerText = "Clearing...";
    btn.disabled = true;

    try {
        const response = await fetch(`https://ntfy.sh/${TOPIC}`, {
            method: 'POST',
            body: CLEAR_COMMAND
        });

        if (response.ok) {
            alert("All messages cleared!");
            closeAdmin();
            loadAnnouncement();
        }
    } catch (e) {
        alert("Error: " + e.message);
    } finally {
        btn.innerText = "Clear All";
        btn.disabled = false;
    }
}

async function loadAnnouncement() {
    try {
        const response = await fetch(`https://ntfy.sh/${TOPIC}/json?poll=1&since=12h`);
        if (!response.ok) return;
        
        const text = await response.text();
        const lines = text.trim().split('\n').filter(l => l.trim() !== "");
        const listEl = document.getElementById('announcements-list');
        const btnEl = document.getElementById('announcements-btn');
        const countEl = document.getElementById('announcement-count');

        listEl.innerHTML = "";
        let allMessages = lines.map(l => JSON.parse(l)).filter(m => m.message);

        // Find the index of the last CLEAR command
        let lastClearIndex = -1;
        for (let i = allMessages.length - 1; i >= 0; i--) {
            if (allMessages[i].message === CLEAR_COMMAND) {
                lastClearIndex = i;
                break;
            }
        }

        // Only show messages sent AFTER the last CLEAR command
        const activeMessages = allMessages.slice(lastClearIndex + 1);

        if (activeMessages.length > 0) {
            btnEl.style.display = 'block';
            countEl.innerText = activeMessages.length;
            
            // Populate list (newest first)
            activeMessages.reverse().forEach(m => {
                const div = document.createElement('div');
                div.className = 'announcement-item';
                const time = new Date(m.time * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                div.innerHTML = `${m.message} <span class="announcement-time">Posted at ${time}</span>`;
                listEl.appendChild(div);
            });
        } else {
            btnEl.style.display = 'none';
        }
    } catch (e) {
        console.log("No active announcements.");
    }
}

function populateItinerary() {
    const list = document.getElementById("itinerary-list");
    list.innerHTML = ""; 
    const now = getNow();

    itinerary.forEach((leg) => {
        const li = document.createElement("li");
        const start = new Date(leg.start).getTime();
        const end = new Date(leg.end).getTime();
        const startDate = new Date(leg.start).toLocaleDateString('en-GB', {day:'2-digit', month:'2-digit'});
        
        li.innerHTML = `<span>${startDate}</span> ${leg.name}`;
        if (now > end) li.classList.add("completed");
        else if (now >= start && now <= end) {
            li.classList.add("current");
            li.innerHTML += " ✅";
        }
        list.appendChild(li);
    });
}

function updateTripDashboard() {
    const now = getNow();
    let currentLeg = null;
    let nextLeg = null;

    for (let i = 0; i < itinerary.length; i++) {
        const start = new Date(itinerary[i].start).getTime();
        const end = new Date(itinerary[i].end).getTime();
        if (now >= start && now <= end) {
            currentLeg = itinerary[i];
            nextLeg = itinerary[i + 1];
            break;
        } else if (now < start) {
            nextLeg = itinerary[i];
            break;
        }
    }

    const labelEl = document.getElementById("trip-label");
    const timerEl = document.getElementById("timer");
    const statusEl = document.getElementById("trip-status");
    const nextDestEl = document.getElementById("next-destination");

    if (currentLeg && currentLeg.name.includes("office")) {
        labelEl.innerHTML = "Welcome Back!";
        timerEl.innerHTML = "🏠";
        statusEl.innerHTML = currentLeg.name;
        nextDestEl.innerHTML = "Time to work! 😅";
        return;
    }

    if (currentLeg) {
        labelEl.innerHTML = "We are currently:";
        statusEl.innerHTML = currentLeg.name;
        const timeRemaining = new Date(currentLeg.end).getTime() - now;
        updateCountdown(timeRemaining, timerEl);
        nextDestEl.innerHTML = (nextLeg && nextLeg.name !== currentLeg.name) ? `Up next: ${nextLeg.name}` : "";
    } else if (nextLeg) {
        labelEl.innerHTML = "Countdown to Tokyo:";
        statusEl.innerHTML = "Get your bags ready!";
        const timeUntil = new Date(nextLeg.start).getTime() - now;
        updateCountdown(timeUntil, timerEl);
        nextDestEl.innerHTML = `Starting with: ${nextLeg.name}`;
    }
}

function updateCountdown(distance, element) {
    if (distance < 0) {
        element.innerHTML = "0d 0h 0m 0s";
        return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    element.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

populateItinerary();
loadAnnouncement();
setInterval(updateTripDashboard, 1000);
updateTripDashboard();
