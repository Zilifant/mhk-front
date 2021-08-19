import React from 'react';

const Loading = props => {
  console.log(props.color);
  return (
    <div className={`loading ${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className={`lds-dual-ring ${props.color}`}></div>
    </div>
  );
};

export default Loading;