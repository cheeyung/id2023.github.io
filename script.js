document.addEventListener('DOMContentLoaded', (event) => {
    const currentTimeElement = document.getElementById('current-time');
    const bellSound = document.getElementById('bell-sound'); // Get the audio element
    let lastMinute = -1; // Initialize to an invalid minute value
​
    function updateCurrentTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
​
        const period = hours >= 12 ? 'PM' : 'AM';
​
        let displayHours = hours % 12;
        displayHours = displayHours ? displayHours : 12; // the hour '0' should be '12'
        displayHours = String(displayHours).padStart(2, '0');
​
        currentTimeElement.textContent = `${displayHours}:${minutes} ${period}`;
​
        const currentMinute = parseInt(minutes);
​
        // Check if the minute has changed since the last chime
        if (currentMinute !== lastMinute) {
            lastMinute = currentMinute;
​
            // Determine how many times to play the bell based on the minute
            let timesToChime = 0;
			console.log('Current Minute')
			console.log(currentMinute)
            switch (currentMinute) {
                case 15:
                    timesToChime = 1;
                    break;
                case 20:
                    timesToChime = 3;
                    break;
                case 35:
                    timesToChime = 1;
                    break;
                case 40:
                    timesToChime = 3;
                    break;
                case 55:
                    timesToChime = 1;
                    break;
                case 0:
                    timesToChime = 3;
                    break;
            }
​
            // Play the bell sound the determined number of times
			console.log('timestoChime')
			console.log(timesToChime)
            chimeBell(timesToChime);
        }
    }
​
    function chimeBell(times) {
		console.log('chimeBell fn')
		let chimesRemaining=0;
		
		function playChime(){
			bellSound.pause()
			bellSound.currentTime=0;
			console.log('chimes count')
			console.log(chimesRemaining)
			if (chimesRemaining < times) {
				bellSound.play();
				console.log('chime!')
				chimesRemaining++;
				setTimeout(playChime, 4000);
			}
		}
		
		playChime();
    }
​
    // Calculate milliseconds until the next minute
    const now = new Date();
    const millisecondsTillNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
​
    // Update the time immediately upon page load
    updateCurrentTime();
​
    // Then update every second
    setInterval(updateCurrentTime, 1000);
​
    // Set the initial timeout to chime at the beginning of the next minute
    setTimeout(chimeBell, millisecondsTillNextMinute, 1); // Play once at the beginning
});
