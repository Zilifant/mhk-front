// grid

const Grid = props => {
  return (
    <div className={`grid grid--${props.className}`}>
      {props.children}
    </div>
  );
};

export default Grid
