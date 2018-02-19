import React from 'react';
import Constants from '../../helpers/constants';
import './formElement.css'

const errorClass = (error) => {
    return (error.length === Constants.ZERO_LENGTH ? '' : 'has-error');
}

const GetElement = (name, element, onChange) => {
    switch (name) {
        case 'body':
            return <textarea className="form-control" value={element} name={name} onChange={onChange} placeholder={name} cols="80" rows="10" />;
        default:
            return <input type="text" className="form-control" name={name} value={element} onChange={onChange} placeholder={name} />
    }
}

function FormElement({ errorElement, element, name, onChange }) {
    return (
        <div className={`form-group ${errorClass(errorElement)}`}>
            <label>{name}</label>
            {GetElement(name, element, onChange)}
        </div>
    )
}

export default FormElement;