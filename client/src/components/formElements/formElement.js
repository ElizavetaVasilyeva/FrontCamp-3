import React from 'react';
import Helper from '../../helpers/helper'
import './formElement.css'

const GetElement = (name, element, onChange, disable = false) => {
  switch (name) {
    case 'body':
      return <textarea className="form-control" value={element} name={name} onChange={onChange} disabled={disable} placeholder={name} cols="80" rows="10" />;
    default:
      return <input type="text" className="form-control" name={name} value={element} onChange={onChange} disabled={disable} placeholder={name} />
  }
}

function FormElement({ errorElement, element, name, onChange, disable = false }) {
  return (
    <div className={`form-group ${Helper.errorClass(errorElement)}`}>
      <label>{name}</label>
      {GetElement(name, element, onChange, disable)}
    </div>
  )
}

export default FormElement;