import React from 'react';
import './formErrors.css'

function FormErrors({ formErrors }) {
  return (
    <div className='formErrors'>
      {Object.keys(formErrors).map((fieldName) => {
        return formErrors[fieldName].length > 0 ?
          <p key={fieldName}>{fieldName} {formErrors[fieldName]}</p> : '';
      })}
    </div>
  )
}

export default FormErrors;