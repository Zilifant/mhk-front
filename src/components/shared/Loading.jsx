// loading overlay

const Loading = ({
  content,
  color,
  overlay,
  spinner,
  suspenseful,
}) => {

  const spin = spinner || 'falling-dots'

  return (
    <div className={`loading ${overlay && 'overlay'} ${suspenseful && 'suspenseful'}`}>
      <div className={`loading-content ${spin} ${color}`}>{content}</div>
    </div>
  );
};

export default Loading;