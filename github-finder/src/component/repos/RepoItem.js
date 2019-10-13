import React from 'react';
import PropTypes from 'prop-types';

const RepoItem = props => {
  const { html_url, name } = props.repo;
  return (
    <div className='card'>
      <h3>
        <a href={html_url}>{name}</a>
      </h3>
    </div>
  );
};
RepoItem.propTypes = {
  repo: PropTypes.object.isRequired
};
export default RepoItem;
