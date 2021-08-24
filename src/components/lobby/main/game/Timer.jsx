import React, {
  useState,
  useContext,
  useEffect
} from 'react';
import Container from '../../../shared/Container';
import '../../../../styles/timer.css';
import { SocketContext } from '../../../../context/contexts';
// import Button from '../../../ui-elements/Button';

const Timer = ({
  settings: {on}
}) => {

  const { socket } = useContext(SocketContext);

  const inactiveDisplay = 'XX:XX';

  const [timer, setTimer] = useState(inactiveDisplay);

  // console.log(settings);

  useEffect(() => {
    // const s = socket.current;
    let mounted = true;
    console.log('mounted');
    const subToTimer = (mounted) => {
      if (mounted) {
        socket.current.on('tick', (time) => {
          setTimer(time)
          console.log(time);
        });
        socket.current.on('clear', () => setTimer(inactiveDisplay));
      }
    };
  subToTimer(mounted);
  return () => mounted = false;
  }, [socket, setTimer]);

  // const pauseHandler = () => {
  //   return socket.current.emit('pauseTimer');
  // };

  const formattedTimer = () => (
    <p className={`time-digits ${timer === '00:00' && 'zero'}`}>
      <span className='digits'>{timer.substr(0,2)}</span>
      <span className='colon'>:</span>
      <span className='digits'>{timer.substr(3,2)}</span>
    </p>
  )

  const displayOn = () => (
    <div className='time-wrap'>
      {formattedTimer()}
      {/* <div className='timer-pause-button'>
        <Button
          onClick={pauseHandler}
        >PAUSE</Button>
      </div> */}
    </div>
  );

  const displayOff = () => (
    <div className='time-wrap'></div>
  );

  return (
    <Container className='timer'>
      {on ? displayOn() : displayOff()}
    </Container>
  )
}

export default Timer
