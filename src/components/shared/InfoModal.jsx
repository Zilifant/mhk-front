// Modal Informational Window

import { useState } from 'react';
import { parse, render } from '../../util/smd';
import SVGButton from '../ui-elements/SVGButton';
import '../../styles/infomodals.scss';

const ModalSP = ({
  info,
  className,
  hideHandler,
  titlebarContent
}) => {

  // Check if the element the user clicked on (e.target) === the element that
  // the event listener is attached to (e.currentTarget).
  function clickOutsideToHide(e) {
    if (e.target !== e.currentTarget) return;
    hideHandler(false);
  };

  return (
    <div
      className='infomodal-invis-wrap'
      onClick={(e) => clickOutsideToHide(e)}
    >
      <div className={`infomodal-wrap text-sp ${className}`}>
        <div className='infomodal-titlebar'>
          <div className='infomodal-titlebar-title'>{info.title || titlebarContent}</div>
          <SVGButton
            className='close-btn'
            onClick={() => hideHandler(false)}
            icon='plus'
          />
        </div>
        <div className='infomodal-content'>
          {(typeof info === 'function') ? info() : render.block(parse(info.content))}
        </div>
      </div>
    </div>
  );

};

const ModalMP = ({
  info,
  className,
  hideHandler
}) => {

  const [currentSec, setCurrentSec] = useState(info[0]);

  const isCurrent = (id) => id === currentSec.id ? 'current' : 'notcurrent'

  const parsedContent = parse(currentSec.content);

  return (
    <div className='infomodal-invis-wrap'>
      <div className={`infomodal-wrap text ${className}`}>
        <div className='infomodal-nav'>
          <button
            className={`infomodal-nav-btn close-btn`}
            onClick={() => hideHandler(false)}
          >
            close
          </button>
          {info.map((sec, i) => {
            return (
              <button
                key={i}
                className={`infomodal-nav-btn sec-btn ${sec.id} ${isCurrent(sec.id)}`}
                onClick={() => setCurrentSec(info[i])}
              >
                {sec.title}
              </button>
            )
          })}
        </div>
        <div className='infomodal-content'>
          {render.block(parsedContent)}
        </div>
      </div>
    </div>
  );
};

const InfoModal = ({
  info,
  className,
  btnClassName,
  buttonContent,
  titlebarContent
}) => {

  const [showModal, setShowModal] = useState(false);

  const Modal = Array.isArray(info) ? ModalMP : ModalSP

  return (<>
    <button
      className={`show-infomodal-btn ${btnClassName}`}
      onClick={() => setShowModal(true)}
    >
      {buttonContent}
    </button>
    {showModal && <Modal
      info={info}
      className={className}
      hideHandler={setShowModal}
      titlebarContent={titlebarContent}
    />}
  </>);

};

export default InfoModal;
