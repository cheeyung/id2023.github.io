const currentTimeElement = document.getElementById('current-time');
const bellSound = document.getElementById('bell-sound');
const bellInterval = 20 * 60 * 1000; // 20 minutes in milliseconds

// Function to update the current time on the web page
function updateCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';

    let displayHours = hours % 12;
    displayHours = displayHours ? displayHours : 12; // the hour '0' should be '12'
    displayHours = String(displayHours).padStart(2, '0');

    currentTimeElement.textContent = `${displayHours}:${minutes}:${seconds} ${period}`;
}

// Start updating the time immediately, and then set an interval to update every second
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

// Play the bell sound every 20 minutes
setInterval(() => {
    bellSound.play();
}, bellInterval);