import React from 'react';

const Loading = ({
  content,
  color,
  overlay,
  suspenseful,
}) => {
  console.log(content);
  return (
    <div className={`loading ${overlay && 'overlay'} ${suspenseful && 'suspenseful'}`}>
      <div className={`loading-content falling-bars ${color}`}>{content}</div>
    </div>
  );
};

export default Loading;