class PomodoroTimer {
    constructor() {
        this.timeLeft = 45 * 60; // Starting with 45 minutes
        this.timerId = null;
        this.isRunning = false;
        this.isWorkMode = true;
        
        // Timer durations in minutes
        this.durations = {
            shortBreak: 5,
            longBreak: 15,
            work: 45,
            rest: 15
        };

        this.initializeElements();
        this.initializeEventListeners();
        this.updateDisplay();
    }

    initializeElements() {
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.shortBreakButton = document.getElementById('shortBreak');
        this.longBreakButton = document.getElementById('longBreak');
        this.workRestToggle = document.getElementById('workRestToggle');
    }

    initializeEventListeners() {
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
        this.shortBreakButton.addEventListener('click', () => this.setTimer('shortBreak'));
        this.longBreakButton.addEventListener('click', () => this.setTimer('longBreak'));
        this.workRestToggle.addEventListener('click', () => this.toggleWorkRest());
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft === 0) {
                    this.pause();
                    alert('Timer completed!');
                }
            }, 1000);
        }
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.timerId);
    }

    reset() {
        this.pause();
        this.timeLeft = this.durations.work * 60;
        this.updateDisplay();
    }

    setTimer(mode) {
        this.pause();
        this.timeLeft = this.durations[mode] * 60;
        this.updateDisplay();
        
        // Update active button
        [this.shortBreakButton, this.longBreakButton].forEach(button => {
            button.classList.remove('active');
        });
        document.getElementById(mode).classList.add('active');
    }

    toggleWorkRest() {
        this.isWorkMode = !this.isWorkMode;
        this.workRestToggle.textContent = this.isWorkMode ? 'Rest Mode' : 'Work Mode';
        this.workRestToggle.classList.toggle('rest');
        
        // Set the timer based on the mode
        this.timeLeft = this.durations[this.isWorkMode ? 'work' : 'rest'] * 60;
        this.updateDisplay();
        
        // Reset the timer if it's running
        if (this.isRunning) {
            this.pause();
            this.start();
        }
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 