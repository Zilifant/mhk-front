// Backdrop //
// Used with ErrorModal. (Not InfoModal or VideoModal.)

import ReactDOM from 'react-dom';

const Backdrop = props => {
  return ReactDOM.createPortal(
    <div className='backdrop' onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
