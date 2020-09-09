import React, { useState } from "react";

function ProgressBar(props) {
    const steps = [];
    for (let i = 0; i < props.steps.length; i++) {
        steps.push(<li key={i} onClick={props.jumpStep.bind(this)} data-id={i}>{props.steps[i]}</li>);      
    }
    return (
        <ul id={props.id} className="progressBar">
            {steps}
        </ul>
    );
}

export default ProgressBar;