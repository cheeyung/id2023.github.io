document.addEventListener('DOMContentLoaded', (event) => {
    const currentTimeElement = document.getElementById('current-time');
    const bellSound = new Audio('bell.mp3');

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

    function chimeBell() {
        bellSound.play();
        setInterval(() => {
            bellSound.play();
        }, 60 * 1000);
    }

    // Calculate milliseconds until the next minute
    const now = new Date();
    const millisecondsTillNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    // Update the time immediately upon page load
    updateCurrentTime();

    // Then update every second
    setInterval(updateCurrentTime, 1000);

    // Set the initial timeout to chime at the beginning of the next minute
    setTimeout(chimeBell, millisecondsTillNextMinute);
});