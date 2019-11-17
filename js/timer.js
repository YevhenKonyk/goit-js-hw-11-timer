class CountdownTimer {
    constructor({selector, targetDate}) {
        this.element = document.querySelector(selector);
        this.targetDate = targetDate;
        this.refs = {
            timerValues: {
                days: this.element.querySelector('.value[data-value="days"]'),
                hours: this.element.querySelector('.value[data-value="hours"]'),
                mins: this.element.querySelector('.value[data-value="mins"]'),
                secs: this.element.querySelector('.value[data-value="secs"]'),
            }
        }

        this.init();
    }

    init() {
        this.startTimer();
    }

    startTimer() {
        this.timerId = setInterval(() => {
            const currentTime = Date.now();
            const targetTime = new Date(this.targetDate).getTime();
            const deltaTime = targetTime - currentTime;
            this.updateTimerValues(deltaTime);
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerId);
    }

    updateTimerValues(deltaTime) {
        const days = this.formatOutput( Math.floor(deltaTime / (1000 * 60 * 60 * 24)) );
        const hours = this.formatOutput( Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) );
        const mins = this.formatOutput( Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60)) );
        const secs = this.formatOutput( Math.floor((deltaTime % (1000 * 60)) / 1000) );
        
        this.refs.timerValues.days.textContent = days;
        this.refs.timerValues.hours.textContent = hours;
        this.refs.timerValues.mins.textContent = mins;
        this.refs.timerValues.secs.textContent = secs;
    }

    formatOutput(value) {
        return String(value).padStart(2, 0);
    }
}

new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Nov 28, 2019'),
});