import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [searchTerm, setSearchTerm] = useState('');
  const onChangeHandler = evt => {
    // this.setState({ searchTerm: evt.target.value });
    //this.setState({ [evt.target.name]: evt.target.value });
    setSearchTerm(evt.target.value);
  };

  const onSubmitHandler = evt => {
    evt.preventDefault();
    if (searchTerm === '') {
      alertContext.setAlert('Please type something', 'light');
    } else {
      githubContext.searchUserHandler(searchTerm);
      setSearchTerm('');
    }
  };
  // const { showClear, onClickClearUsers } = props;
  return (
    <div>
      <form className='form' onSubmit={onSubmitHandler}>
        <input
          type='text'
          name='searchTerm'
          placeholder='search here..'
          value={searchTerm}
          onChange={onChangeHandler}
        />
        <input
          type='submit'
          value='Serach'
          className='btn btn-dark btn-block'
        />
      </form>

      {githubContext.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};
export default Search;
