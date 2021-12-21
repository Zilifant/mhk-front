// Modal Video Element //
// A floating element containing an iframe that takes up most of the viewbox.

import { useState } from 'react';
import SVGButton from '../shared/SVGButton';

const Modal = ({
  info: {
    src,
    title
  },
  className,
  hideHandler,
}) => {

  // Check if the element the user clicked on (e.target) is the element that
  // the event listener is attached to (e.currentTarget). (Prevents backdrop
  // element behind floating element from receiving the click event.)
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
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
        <SVGButton
          className='infomodal-vid-close-btn'
          onClick={() => hideHandler(false)}
          icon='plus'
        />
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
      className={btnClassName}
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