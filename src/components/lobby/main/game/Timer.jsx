import { useState, useContext, useEffect } from 'react';
import Container from '../../../shared/Container';
import { SocketContext } from '../../../../context/contexts';
import { DEV } from '../../../../util/utils';
import '../../../../styles/timer.scss';
import '../../../../styles/svgs.scss';

const Timer = ({
  settings: {
    on,
    duration
  },
  timerIsRunning
}) => {

  const { socket } = useContext(SocketContext);

  const [tenSec, setTenSec] = useState(duration * 6);

  useEffect(() => {
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
          setTenSec(tenSec);
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
      if (DEV) console.log('timer unmounted');
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
        {/* {formattedTimer()} */}
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

// unused numeric timer:

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