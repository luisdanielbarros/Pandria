import { useState } from "react";

export const useInput = (inputType, initialValue) => {
    const [value, setValue] = useState(initialValue);
    if (inputType === 'text' || inputType === 'select') {
        return {
            value,
            setValue,
            reset: () => setValue(""),
            bind: event => setValue(event.target.value),
        }
    }
    else if (inputType === 'checkbox') {
        return {
            value,
            setValue,
            reset: () => setValue(""),
            bind: {
                checked: value,
                onChange: event => {
                    setValue(event.target.checked);
                }
            }
        }
    }
    else if (inputType === 'radio') {
        return {
            checked: event => {
                if (event.target.name === value) return 'true';
                else return 'false';
            },
            setValue,
            reset: event => event.target.checked = false,
            bind: {
                onChange: event => {
                    setValue(event.target.value);
                }
            }
        }
    }
}