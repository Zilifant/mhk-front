// Modal //
// Flexible component for floating messages and alerts.

import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Backdrop from './Backdrop';
import '../../styles/modal.scss';

const ModalOverlay = ({
  className,
  style,
  header,
  headerClass,
  children,
  contentClass,
  footer,
  onSubmit,
}) => {

  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal-header ${headerClass}`}>
        <h2>{header}</h2>
        <div>{footer}</div>
      </header>
      <form
        onSubmit={
          onSubmit ? onSubmit : event => event.preventDefault()
        }
      >
        <div className={`modal-content ${contentClass}`}>
          {children}
        </div>
      </form>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('modal-hook')
  );

};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames='modal'
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;