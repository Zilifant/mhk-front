// Embedded Video

import React, {
  useState
} from 'react';

const VideoModal = ({
  info: {
    size = [560, 315],
    src,
    title
  },
  className,
  hideHandler,
}) => {
  return (
    <div className='infomodal-invis-wrap'>
      <div className={`infomodal-wrap vid ${className}`}>
        <iframe
          width={size[0]}
          height={size[1]}
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

const Video = ({
  className,
  buttonContent,
  info
}) => {

  const [showModal, setShowModal] = useState(false);

  return (<>
    <button
      className={`show-infomodal-btn ${className}`}
      onClick={() => setShowModal(true)}
    >
      {buttonContent}
    </button>
    {showModal && <VideoModal
      info={info}
      className={className}
      hideHandler={setShowModal}
    />}
  </>);
};

export default Video