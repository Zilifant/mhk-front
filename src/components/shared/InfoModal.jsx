import React, {
  useState
} from 'react';
import {
  parseSMDLines,
  renderStyledLines
} from '../../util/styled-text';
import '../../styles/infomodals.scss';

const Modal = ({
  info,
  className,
  hideHandler
}) => {

  const [currentSec, setCurrentSec] = useState(info[0]);

  const isCurrent = (id) => id === currentSec.id ? 'current' : 'notcurrent'

  const parsedContent = parseSMDLines({lines: currentSec.content});

  return (
    <div className={`infomodal ${className}`}>
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
      <div className='infomodal-content'>{renderStyledLines(parsedContent)}</div>
    </div>
  );
};

const InfoModal = ({
  info,
  className,
  buttonContent
}) => {

  const [showModal, setShowModal] = useState(false);

  return (<>
    <button
      className={`show-infomodal-btn ${className}`}
      onClick={() => setShowModal(true)}
    >
      {buttonContent}
    </button>
    {showModal && <Modal
      info={info}
      className={className}
      hideHandler={setShowModal}
    />}
  </>);

};

export default InfoModal;
