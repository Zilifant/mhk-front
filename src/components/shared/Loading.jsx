// Loading Overlay //
// Covers the entire viewbox; displays text and a 'spinner' animation.

import '../../styles/loading.scss';

const Loading = ({
  content,
  color,
  overlay,
  spinner,
  suspenseful,
}) => {

  // Adds css class to apply a keyframe animation.
  const spin = spinner || 'falling-dots'

  // `Suspensful` applies fade in/out css animation.
  return (
    <div className={`loading ${overlay && 'overlay'} ${suspenseful && 'suspenseful'}`}>
      <div className={`loading-content ${spin} ${color}`}>{content}</div>
    </div>
  );
};

export default Loading;