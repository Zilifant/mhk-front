// Game Timer //
// Currently only discussion rounds are timed.
// TO DO: Add additional timers of different lengths for other game stages.

import { useState, useContext, useEffect } from 'react';
import Container from '../../../shared/Container';
import { SocketContext } from '../../../../context/contexts';
import { isDevEnv } from '../../../../util/utils';
import '../../../../styles/timer.scss';
import '../../../../styles/svgs.scss';

const Timer = ({
  settings: {
    on,
    duration // minutes
  },
  timerIsRunning
}) => {

  const { socket } = useContext(SocketContext);

  // Track remaining number of ticks.
  // Timer ticks every 10 seconds; duration unit is minutes.
  // Note: Init value not strictly necessary.
  const [tenSec, setTenSec] = useState(duration * 6);

  useEffect(() => {
    // Extra-careful tracking of component mounting.
    let mounted = true;
    const s = socket.current;

    const subToTimer = (mounted) => {
      if (mounted) {
        s.on('timerStarted', () => {
          setTenSec(duration * 6);
        });
        s.on('tenSec', (tenSec) => {
          setTenSec(tenSec);
        });
        s.on('timeUp', (tenSec) => {
          setTenSec(tenSec); // TO DO: Add new behavior for last tick.
        });
        s.on('clear', () => {
          setTenSec(0);
        });
      }
    };

    subToTimer(mounted);

    return () => {
      mounted = false;
      s.off('timerStarted');
      s.off('tenSec');
      s.off('timeUp');
      s.off('clear');
    };

  }, [socket, setTenSec, duration]);

  const barsTimer = () => {
    const num = duration * 6;

    return [...Array(num)].map((v, i) => {
      const ind = num - i;
      const style = ind > tenSec ? 'hide' : 'show'
      return <div
        className={`timebar-${ind} ${style}`}
        key={i}
      ></div>
    });

  };

  const displayOn = () => {
    const style = timerIsRunning ? 'running' : 'notrunning'
    return (
      <div className={`time-wrap ${style}`}>
        {barsTimer()}
      </div>
    );
  };

  return (
    <Container className='timer'>
      {on ? displayOn() : <div className='time-wrap-off'/>}
    </Container>
  );
};

export default Timer;

// Alternative Numeric Timer //

// const inactiveDisplay = 'XX:XX';
// const [timer, setTimer] = useState(inactiveDisplay);

// useEffect(() => {
//   let mounted = true;
//   console.log('timer mounted');
//   const subToTimer = (mounted) => {
//     if (mounted) {
//       socket.current.on('tick', (time) => {
//         setTimer(time)
//         console.log(time);
//       });
//       socket.current.on('clear', () => setTimer(inactiveDisplay));
//     }
//   };
// subToTimer(mounted);
// return () => {
//   mounted = false;
//   socket.current.off('tick');
//   socket.current.off('clear');
//   console.log('timer unmounted');
// }
// }, [socket, setTimer]);

// const formattedTimer = () => (
//   <p className={`time-digits ${timer === '00:00' && 'zero'}`}>
//     <span className='digits'>{timer.substr(0,2)}</span>
//     <span className='colon'>:</span>
//     <span className='digits'>{timer.substr(3,2)}</span>
//   </p>
// );