import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import TechSelectOptions from '../../component/tech/TechSelectOptions';
import { updateLog } from '../../actions/logActions';

const EditLogModal = props => {
  console.log('edit', props);
  const { current, updateLog } = props;
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      console.log('current.tech', current.tech);
      setTech(current.tech);
    }
  }, [current]);

  const onSubmit = () => {
    if (message === '' || tech === '') {
      M.toast({
        html: 'Please Enter a message and tech'
      });
    } else {
      console.log(message, attention, tech);
      const updtLog = {
        id: current.id,
        message,
        attention,
        tech,
        date: new Date()
      };
      updateLog(updtLog);
      M.toast({ html: `Log updated by ${tech}` });
      setMessage('');
      setAttention(false);
      ///setTech('');
    }
  };

  const modalStyle = {
    width: '75%',
    height: '75%'
  };
  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            {/* <label htmlFor='message' className='active'>
              Log Message
            </label> */}
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <select
              name='tech'
              value={tech}
              className='browser-default'
              onChange={e => setTech(e.target.value)}
            >
              <option value='Select' disabled>
                Select Technician
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  checked={attention}
                  value={attention}
                  className='filled-in'
                  onChange={e => setAttention(!attention)}
                />
                <span>Need Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          className='modal-close waves-effect waves-light btn blue'
          onClick={onSubmit}
        >
          Enter
        </a>
      </div>
    </div>
  );
};
EditLogModal.propTypes = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  current: state.log.current
});
export default connect(
  mapStateToProps,
  { updateLog }
)(EditLogModal);
