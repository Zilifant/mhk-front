// View of Embedded MHK Website

import { useState, useRef } from 'react';

const big = 'big', small = 'small', shrinking = 'shrinking';

const View = ({ id }) => {

  const [size, setSize] = useState(small);

  const iFrameRef = useRef(null);

  // function sendMsg() {
  //   if (!iFrameRef.current) return;

  //   iFrameRef.current.contentWindow.postMessage(demoLobbyId, 'http://localhost:3000/demo');
  // }

  function resize() {
    function shrink() {
      setSize(shrinking);
      setTimeout(() => setSize(small), 500);
    };

    size === small ? setSize(big) : shrink();
  };

  return (
    <div
      className={`embed-wrap embed-cell-${id}`}
      id={`wrap-${id}`}
      data-size={size}
    >
      <div className='titlebar'>
        <div className='title'>
          Cell ID: {id}
        </div>
        <button
          className='resize'
          id={`btn-${id}`}
          onClick={resize}
        ></button>
      </div>

      <iframe
        ref={iFrameRef}
        src={`http://localhost:3000/demo/lobby`}
        title={id}
      />
    </div>
  );
};

export default View;
