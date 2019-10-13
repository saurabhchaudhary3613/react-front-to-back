import React, { useContext } from 'react';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import GithunContext from '../../context/github/githubContext';

const Users = () => {
  const githubContext = useContext(GithunContext);
  const { loading, users } = githubContext;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => {
          return <UserItem key={user.id} user={user} />;
        })}
      </div>
    );
  }
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

export default Users;
