// Timer Setup //

import SVGButton from '../../../ui-elements/SVGButton';
import SVGIcon from '../../../ui-elements/SVGIcon';
import '../../../../styles/setup.scss';
import '../../../../styles/svgs.scss';

const TimerSetup = ({
  iAmLeader,
  chooseTimerHandler,
  settings: {
    duration, // minutes
    minDuration, // TO DO: remove minDuration, as it is always zero.
    maxDuration
  }
}) => {

  // Min/max duration are server presets.
  const minReached = duration === minDuration;
  const maxReached = duration === maxDuration;

  // If leader reduces value to zero, timer is considered 'off'.
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
