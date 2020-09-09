import React from "react";

function FormInputPassword(props) {
    return (
        <div className="form-group">
            <label>{props.label}
                <input 
                    type="password"
                    name={props.name}
                    placeholder={props.placeholder}
                    {...props.bind}
                    className="form-control"
                />
                <small className="form-text">{props.tip}</small>
            </label>
        </div>
    );
}

export default FormInputPassword;