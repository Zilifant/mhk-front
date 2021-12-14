// Announcer //
// Displays system messages along the top of the app both in and out of game.

import { useEffect } from 'react';
import { useChat } from '../../../hooks/chat-hook';
import { parse, render } from '../../../util/smd';
import { buildSMDString } from '../../../util/system-messages';
import Container from '../../shared/Container';
import '../../../styles/announcer.scss';
import '../../../styles/chat.scss';

function msg(type, args, isInGame, senderId = 'app') {
  return {
    time: new Date().toLocaleTimeString().slice(0,-6),
    type,
    isInGame,
    args,
    senderId,
  };
};

// Only used in Announcer.
const Announcement = ({
  message,
}) => {

  if (!message) return null; // TO DO: Test and remove this check.

  const meta = {
    wrapper: `msg-wrapper msg-in-announcer other`,
    parent: 'announcer',
    inlineOnly: true,
    renderTimestamp: false,
  };

  const built = buildSMDString(message, meta);
  const parsed = parse(built, meta);

  return render.inline(parsed, meta);
};

const Announcer = ({
  chat,
  iAmLeader,
  lobby
}) => {

  const {
    subToAnnounce,
    lastAnnouncement,
    lastGameAnnouncement
  } = useChat(chat);

  useEffect(() => { subToAnnounce(); }, [subToAnnounce]);

  // TO DO: This is a confusing, temporary solution; refactor.
  const [type, args] = lobby.startGameText(iAmLeader);

  if (lobby.gameOn) return (
    <Container className='announcer game'>
      <Announcement
        message={lastGameAnnouncement()}
      />
    </Container>
  );

  return (
    <Container className='announcer nogame'>
      <Announcement
        message={msg(type, args, false)}
      />
      <Announcement
        message={lastAnnouncement()}
      />
    </Container>
  );
};

export default Announcer;