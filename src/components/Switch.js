import React from 'react';
import '../styles/switchStyle.css';


const Switch = ({ label, onClick }) => {
  return(
    <React.Fragment>
    <label className='switch-label'>{label}:
      <div className="switch">
        <input
          type="checkbox"
          defaultChecked
          onClick={onClick}
        />
        <span className="slider round"></span>
      </div>
    </label>
    </React.Fragment>
  )
}


export default Switch;
