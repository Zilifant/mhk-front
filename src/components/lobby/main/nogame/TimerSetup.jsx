import React, {
  // useState
} from 'react';
import '../../../../styles/setup.scss';
import '../../../../styles/svgs.scss';
import SVGButton from '../../../ui-elements/SVGButton';
import SVGIcon from '../../../ui-elements/SVGIcon';

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

  const timerVal = () => (<>
    {duration !== 0 &&
      <div className={`timer value on`}>
        {`${duration}:00`}
      </div>
    }
    {duration === 0 &&
      <div className={`timer value off`}>
        {'OFF'}
      </div>
    }
  </>);

  const timerLeader = () => (
    <div className={`timer-wrap leader`}>
      <SVGButton
        className='timer dec'
        onClick={() => chooseTimerHandler(--duration)}
        icon='minus'
        disabled={minReached}
      />
        {timerVal()}
      <SVGButton
        className='timer inc'
        onClick={() => chooseTimerHandler(++duration)}
        icon='plus'
        disabled={maxReached}
      />
    </div>
  );

  const timerNotLeader = () => (
    <div className={'timer-wrap notleader'}>
      <SVGIcon
        className='timer dec'
        icon='minus'
      />
        {timerVal()}
      <SVGIcon
        className='timer inc'
        icon='plus'
      />
    </div>
  );

  return iAmLeader ? timerLeader() : timerNotLeader();
};

export default TimerSetup;
