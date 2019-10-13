import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
  state = {
    searchTerm: ''
  };
  onChangeHandler = evt => {
    // this.setState({ searchTerm: evt.target.value });
    this.setState({ [evt.target.name]: evt.target.value });
  };
  static propTypes = {
    searchUser: PropTypes.func.isRequired,
    onClickClearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  };
  onSubmitHandler = evt => {
    evt.preventDefault();
    if (this.state.searchTerm === '') {
      this.props.setAlert('Please type something', 'light');
    } else {
      this.props.searchUser(this.state.searchTerm);
      this.setState({ searchTerm: '' });
    }
  };
  render() {
    const { showClear, onClickClearUsers } = this.props;
    return (
      <div>
        <form className='form' onSubmit={this.onSubmitHandler}>
          <input
            type='text'
            name='searchTerm'
            placeholder='search here..'
            value={this.state.searchTerm}
            onChange={this.onChangeHandler}
          />
          <input
            type='submit'
            value='Serach'
            className='btn btn-dark btn-block'
          />
        </form>
        {/* {this.props.showClear ? (
          <button
            className='btn btn-light btn-block'
            onClick={this.props.onClickClearUsers}
          >
            Clear
          </button>
        ) : null} */}
        {showClear && (
          <button
            className='btn btn-light btn-block'
            onClick={onClickClearUsers}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
