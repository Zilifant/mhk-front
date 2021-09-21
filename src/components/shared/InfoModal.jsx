import React, {
  useState
} from 'react';
import { parseSMDLines, renderStyledLines } from '../../util/styled-text';
import '../../styles/infomodals.scss';

const InfoModal = ({
  info,
  className,
  closeHandler
}) => {

  const [currentSec, setCurrentSec] = useState(info[0]);

  const isCurrent = (id) => id === currentSec.id ? 'current' : 'notcurrent'

  const parsedContent = parseSMDLines({lines: currentSec.content});

  return (
    <div className={`infomodal ${className}`}>
      <div className={`infomodal-nav`}>
        <button
          className={`infomodal-nav-btn close-btn`}
          onClick={() => closeHandler(false)}
        >
          close
        </button>
        {info.map((sec, i) => {
          return (
            <button
              key={i}
              className={`infomodal-nav-btn sec-btn ${isCurrent(sec.id)} ${sec.id}`}
              onClick={() => setCurrentSec(info[i])}
            >
              {sec.title}
            </button>
          )
        })}
      </div>
      {renderStyledLines(parsedContent)}
    </div>
  );
};

export default InfoModal;
