import React, {
  useState
} from 'react';
import '../../../../styles/setup.css';
import '../../../../styles/svgs.css';
import SVGButton from '../../../ui-elements/SVGButton';

const TimerSetup = ({
  iAmLeader,
  gameSettings,
  chooseTimerHandler
}) => {

  const [timer, setTimer] = useState({
    minReached: true,
    maxReached: false,
    min: 0,
    max: 5,
    val: gameSettings.timer.duration
  });

  function inc() {
    if (timer.val < timer.max) setTimer({
      ...timer,
      ...{
        val: ++timer.val,
        minReached: false,
      }});

    if (timer.val === timer.max) setTimer({...timer, ...{maxReached: true}});
    return chooseTimerHandler(timer.val);
  };

  function dec() {
    if (timer.val > timer.min) setTimer({...timer, ...{val: --timer.val, maxReached: false}});
    if (timer.val === timer.min) setTimer({...timer, ...{minReached: true}});
    return chooseTimerHandler(timer.val);
  };

  const timerLeader = () => (
    <div className={`timer-wrap ${iAmLeader ? 'leader' : 'notleader'}`}>
      <SVGButton
        className='timer dec'
        onClick={dec}
        icon='minus'
        disabled={!iAmLeader || timer.minReached}
      />
      {timer.val !== 0 && <div className={`timer value on`}>{`${timer.val}:00`}</div>}
      {timer.val === 0 && <div className={`timer value off`}>{'OFF'}</div>}
      <SVGButton
        className='timer inc'
        onClick={inc}
        icon='plus'
        disabled={!iAmLeader || timer.maxReached}
      />
    </div>
  );

  return timerLeader();
};

export default TimerSetup;
