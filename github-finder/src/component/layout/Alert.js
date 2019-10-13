import React from 'react';

export default function Alert(props) {
  return (
    props.alert && (
      <div className={`alert alert-${props.alert.type}`}>
        <i className='fas fa-info-circle'></i>
        {props.alert.msg}
      </div>
    )
  );
}
