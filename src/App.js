import './App.css';
import Timer from "./Timer";
import React, { useState, useEffect } from 'react';


function App() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
    });
    const [startTime, setStartTime] = useState(new Date().getTime()); // Get the current time
    const targetDate = new Date('2024-11-28T10:00:00.000Z'); // Define targetDate outside of useEffect

    useEffect(() => {
        const diff = targetDate.getTime() - startTime;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 3600 * 24));
            const hours = Math.floor((diff % (1000 * 3600 * 24)) / (1000 * 3600));
            const minutes = Math.floor((diff % (1000 * 3600)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            const milliseconds = diff % 1000;

            setTimeLeft({ days, hours, minutes, seconds, milliseconds });
        } else {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
        }
    }, [startTime]);

    useEffect(() => {
        let animationFrameId;

        const updateTimer = () => {
            const currentTime = new Date().getTime();
            const diff = targetDate.getTime() - currentTime;

            if (diff > 0) {
                const days = diff / (1000 * 3600 * 24);
                const hours = diff % (1000 * 3600 * 24) / (1000 * 3600);
                const minutes = (diff % (1000 * 3600)) / (1000 * 60);
                const seconds = (diff % (1000 * 60)) / 1000;
                const milliseconds = diff % 1000;
                setTimeLeft({ days, hours, minutes, seconds, milliseconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
            }
            animationFrameId = requestAnimationFrame(updateTimer);
        };

        updateTimer();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="App">
            <h1>Отсалось до нашей встречи</h1>
            <div className="Timers">
                <Timer label={"дни"} max_value={365} current_value={timeLeft.days} />
                <Timer label={"часы"} max_value={24} current_value={timeLeft.hours} />
                <Timer label={"минуты"} max_value={60} current_value={timeLeft.minutes} />
                <Timer label={"секунды"} max_value={60} current_value={timeLeft.seconds} />
                <Timer label={"миллисекунды"} max_value={1000} current_value={timeLeft.milliseconds} />
            </div>
        </div>
    );
}
export default App;
