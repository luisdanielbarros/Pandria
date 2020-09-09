import React from "react";

function FormInputRadio(props) {
    return (
        <div className="form-check">
                <input 
                    type="radio"
                    name={props.name}
                    id={props.id}
                    value={props.value}
                    {...props.bind}
                    className="form-check-input"
                />
                <label htmlFor={props.id} className="form-check-label">{props.label}</label>            
        </div>
    );
}

export default FormInputRadio;