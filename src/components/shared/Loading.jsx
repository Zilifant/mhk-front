import React from 'react';

const Loading = props => {
  console.log(props.text);
  return (
    <div className={`loading ${props.asOverlay && 'overlay'}`}>
      {/* <div className={`lds-dual-ring ${props.color}`}></div> */}
      <div className={`loading-text ${props.color}`}>{props.text}</div>
    </div>
  );
};

export default Loading;