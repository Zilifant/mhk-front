// Embedded Video

import { useState } from 'react';

const Modal = ({
  info: {
    src,
    title
  },
  className,
  hideHandler,
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
      <div className={`infomodal-wrap vid ${className}`}>
        <iframe
          src={src}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen/>
        <button
          className={`infomodal-vid-close-btn`}
          onClick={() => hideHandler(false)}
        >
          close
        </button>
      </div>
    </div>
  );
}

const VideoModal = ({
  className,
  btnClassName,
  buttonContent,
  info
}) => {

  const [showModal, setShowModal] = useState(false);

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
    />}
  </>);
};

export default VideoModal