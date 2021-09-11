import React, {
  // useState
} from 'react';
import '../../../../styles/setup.scss';
import '../../../../styles/svgs.scss';
import SVGButton from '../../../ui-elements/SVGButton';

const TimerSetup = ({
  iAmLeader,
  chooseTimerHandler,
  settings: {
    duration,
    minDuration,
    maxDuration
  }
}) => {

  const minReached = duration === minDuration;
  const maxReached = duration === maxDuration;

  const timerLeader = () => (
    <div className={`timer-wrap ${iAmLeader ? 'leader' : 'notleader'}`}>
      <SVGButton
        className='timer dec'
        onClick={() => chooseTimerHandler(--duration)}
        icon='minus'
        disabled={!iAmLeader || minReached}
      />
      {duration !== 0 && <div className={`timer value on`}>{`${duration}:00`}</div>}
      {duration === 0 && <div className={`timer value off`}>{'OFF'}</div>}
      <SVGButton
        className='timer inc'
        onClick={() => chooseTimerHandler(++duration)}
        icon='plus'
        disabled={!iAmLeader || maxReached}
      />
    </div>
  );

  return timerLeader();
};

export default TimerSetup;
