import React, {
  useState,
  useContext,
  useEffect
} from 'react';
import Container from '../../../shared/Container';
import { SocketContext } from '../../../../context/contexts';
import '../../../../styles/timer.css';
import '../../../../styles/svgs.css';
// import SVGIcon from '../../../ui-elements/SVGIcon';

const Timer = ({
  settings: {
    on,
    duration
  },
  timerIsRunning
}) => {

  const { socket } = useContext(SocketContext);

  const inactiveDisplay = 'XX:XX';

  // const [timer, setTimer] = useState(inactiveDisplay);
  const [tenSec, setTenSec] = useState(duration * 6);

  // console.log(settings);

  useEffect(() => {
    let mounted = true;
    console.log('timer mounted');
    const subToTimer = (mounted) => {
      if (mounted) {
        socket.current.on('tenSec', (tenSec) => {
          setTenSec(tenSec);
        });
        // socket.current.on('tick', (time) => {
        //   setTimer(time)
        //   console.log(time);
        // });
        socket.current.on('clear', () => setTenSec(inactiveDisplay));
      }
    };
  subToTimer(mounted);
  return () => mounted = false;
  }, [socket, setTenSec]);

  // const formattedTimer = () => (
  //   <p className={`time-digits ${timer === '00:00' && 'zero'}`}>
  //     <span className='digits'>{timer.substr(0,2)}</span>
  //     <span className='colon'>:</span>
  //     <span className='digits'>{timer.substr(3,2)}</span>
  //   </p>
  // );

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
      {on ? displayOn() : <div className='time-wrap'/>}
    </Container>
  );
};

export default Timer;
