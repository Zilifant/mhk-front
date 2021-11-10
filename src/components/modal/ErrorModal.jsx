import React from 'react';

import Modal from './Modal';
import SVGButton from '../ui-elements/SVGButton';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Operation Failed Successfully"
      show={!!props.error}
      footer={
        <SVGButton
          className='close-btn'
          onClick={props.onClear}
          icon='plus'
        />
        // <Button onClick={props.onClear}>Close</Button>
      }
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;