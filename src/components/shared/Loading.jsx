import React from 'react';

const Loading = props => {
  console.log('%cLoading','color:#f35252');
  return (
    <div className={`loading ${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Loading;