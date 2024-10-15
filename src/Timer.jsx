import './Timer.css';
import React from "react";

function Timer(props) {
    const size = 200;
    const thickness = 20;
    const color = '#007bff';
    const radius = size / 2 - thickness / 2;
    const dashArray = 2 * Math.PI * radius;
    const dashOffset = dashArray - (props.current_value / props.max_value) * dashArray;

    return(
        <div className="timer-container">
            <div className="timer-value">
                <div>
                    <p>{Math.floor(props.current_value)} </p>
                    <p>{props.label}</p>
                </div>

            </div>
            <div className="timer-bar">
                <svg width={size} height={size}>
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={color}
                        strokeWidth={thickness}
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                        fill="none"
                    />
                </svg>
            </div>
        </div>


    )
}

export default Timer;