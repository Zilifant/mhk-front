import React from 'react';

const Container = ({ className, parentGrid, children }) => {
  return (
    <div className={`container pg--${parentGrid} con--${className || 'default'}`}>
      {children}
    </div>
  );
};

export default Container;
