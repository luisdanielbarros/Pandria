import React from "react";

function FormInputCheck(props) {
    return (
        <div className="form-check">
                <input 
                    type="checkbox"
                    name={props.name}
                    id={props.name}
                    {...props.bind}
                    className="form-check-input"
                />
                <label htmlFor={props.name} className="form-check-label">{props.label}</label>            
        </div>
    );
}

export default FormInputCheck;