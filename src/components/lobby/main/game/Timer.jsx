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
  settings,
  settings: {on}
}) => {

  const { socket } = useContext(SocketContext);

  const inactiveDisplay = 'XX:XX';

  const [timer, setTimer] = useState(inactiveDisplay);

  console.log(settings);

  useEffect(() => {
    const subToTimer = () => {
      socket.current.on('tick', time => setTimer(time));
      socket.current.on('lastTick', time => setTimer(time));
      socket.current.on('clear', setTimer(inactiveDisplay))
    };
  subToTimer();
  }, [socket, setTimer]);

  // const pauseHandler = () => {
  //   return socket.current.emit('pauseTimer');
  // };

  const displayOn = () => (
    <div className='time-wrap'>
      <p className={`time-digits ${timer === '00:00' && 'zero'}`}>{timer}</p>
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
