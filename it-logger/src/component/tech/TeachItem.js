import React from 'react';
import PropTypes from 'prop-types';

const TeachItem = ({ tech }) => {
  return (
    <li className='collection-item'>
      <div>
        {tech.firstName} {tech.lastName}
        <a href='#!' className='secondary-content'>
          <i className='material-icons'>delete</i>
        </a>
      </div>
    </li>
  );
};

TeachItem.propTypes = {
  tech: PropTypes.object.isRequired
};

export default TeachItem;
