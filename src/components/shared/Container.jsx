// container

const Container = ({ className, children }) => {
  return (
    <div className={`container con--${className || 'default'}`}>
      {children}
    </div>
  );
};

export default Container;
