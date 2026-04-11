let selectedPlan = "7 Hours"; // Default plan
let timerInterval;

/* 1. Tab Switching Logic (Buy, Reconnect, Admin) */
function showTab(i) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab')[i].classList.add('active');
    document.querySelectorAll('.section')[i].classList.add('active');
}

/* 2. Plan Selection Logic (Fixed to capture only the plan name, ignoring price) */
function selectPlan(el) {
    document.querySelectorAll('.plan').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    
    // Grabs only the first text node (e.g., "7 Hours") and ignores the <span> price
    selectedPlan = el.childNodes[0].textContent.trim();
}

/* 3. Timer Controller (Saves to LocalStorage so time persists on refresh) */
function startTimer(sec) {
    clearInterval(timerInterval);
    
    // Store the exact expiry timestamp
    const expiryTime = Date.now() + (sec * 1000);
    localStorage.setItem("wifiExpiry", expiryTime);

    updateTimerDisplay(expiryTime);
    
    timerInterval = setInterval(() => {
        updateTimerDisplay(expiryTime);
    }, 1000);
}

function updateTimerDisplay(expiryTime) {
    const currentTime = Date.now();
    const remaining = Math.round((expiryTime - currentTime) / 1000);

    if (remaining <= 0) {
        clearInterval(timerInterval);
        document.getElementById("timer").innerText = "Session Expired!";
        localStorage.removeItem("wifiExpiry");
        return;
    }

    let m = Math.floor(remaining / 60);
    let s = remaining % 60;
    document.getElementById("timer").innerText = 
        `Time Left: ${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

/* 4. Payment Logic (Includes Simulation and Phone Validation) */
async function payNow() {
    let phoneInput = document.getElementById("phone").value.trim();
    
    // Kenyan Phone Number Validation (07..., 01..., or 254...)
    const phoneRegex = /^(?:254|\+254|0)?((?:7|1)(?:[0-9]){8})$/;
    
    if (!phoneRegex.test(phoneInput)) {
        alert("Please enter a valid M-Pesa number (e.g., 0712345678)");
        return;
    }

    // SIMULATION: Since there is no backend server, we simulate a successful payment
    alert(`M-Pesa request sent to ${phoneInput} for the ${selectedPlan} plan.\n\n(Simulation: Click OK to "pay" and connect)`);

    // Assign time in seconds based on the selected plan
    let seconds = 3600; // 1 Hour (default)
    if (selectedPlan.includes("2 Hours")) seconds = 7200;
    if (selectedPlan.includes("7 Hours")) seconds = 25200;
    if (selectedPlan.includes("24 Hours")) seconds = 86400;
    if (selectedPlan.includes("Weekly")) seconds = 604800;
    if (selectedPlan.includes("Monthly")) seconds = 2592000;

    // Start the countdown
    startTimer(seconds);
    alert("Payment Successful! You are now connected.");
}

/* 5. Reconnect Logic */
function reconnect() {
    let code = document.getElementById("mpesaCode").value.trim();
    if (!code) {
        alert("Please enter your M-Pesa Transaction Code.");
        return;
    }
    
    // Simulated reconnection logic
    alert("Checking transaction code...");
    startTimer(3600); // Gives 1 hour as an example
}

/* 6. Admin Login (Note: Low security on frontend, move to backend for production) */
function adminLogin() {
    let user = document.getElementById("adminUser").value;
    let pass = document.getElementById("adminPass").value;
    
    if (user === "admin" && pass === "1234") {
        window.location.href = "admin.html";
    } else {
        alert("Access Denied: Invalid credentials!");
    }
}

/* 7. Auto-Resume Timer on Page Load */
window.onload = () => {
    const savedExpiry = localStorage.getItem("wifiExpiry");
    if (savedExpiry && savedExpiry > Date.now()) {
        const remainingSec = Math.round((savedExpiry - Date.now()) / 1000);
        startTimer(remainingSec);
    }
};