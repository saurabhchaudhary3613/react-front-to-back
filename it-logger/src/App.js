import React, { useEffect, Fragment } from 'react';
import SearchBar from './component/layout/SearchBar';
import Logs from './component/logs/Logs';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Provider } from 'react-redux';
import store from './store';
import AddBtn from './component/layout/AddBtn';
import AddLogModal from './component/logs/AddLogModal';
import EditLogModal from './component/logs/EditLogModal';
import AddTechModal from './component/tech/AddTechModal';
import TeachListModal from './component/tech/TeachListModal';
import './App.css';

const App = () => {
  //Init Materialize JS
  useEffect(() => {
    M.AutoInit();
  });

  return (
    <Provider store={store}>
      <Fragment>
        <SearchBar />
        <div className='container'>
          <Logs />
          <AddLogModal />
          <EditLogModal />
          <AddTechModal />
          <TeachListModal />
          <AddBtn />
        </div>
      </Fragment>
    </Provider>
  );
};

export default App;
