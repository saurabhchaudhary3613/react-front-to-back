import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteTech } from '../../actions/techActions';

const TeachItem = ({ tech, deleteTech }) => {
  const deleteT = () => {
    deleteTech(tech.id);
    M.toast({
      html: `${tech.firstName} ${tech.lastName} has been deleted`
    });
  };
  return (
    <li className='collection-item'>
      <div>
        {tech.firstName} {tech.lastName}
        <a href='#!' className='secondary-content' onClick={deleteT}>
          <i className='material-icons'>delete</i>
        </a>
      </div>
    </li>
  );
};

TeachItem.propTypes = {
  tech: PropTypes.object.isRequired,
  deleteTech: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteTech }
)(TeachItem);
