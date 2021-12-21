// Announcer //
// Displays system messages along the top of the app both in and out of game.

import { useEffect } from 'react';
import { useChat } from '../../../hooks/chat-hook';
import { parse, render } from '../../../util/styled-markdown';
import { buildSMDString } from '../../../util/system-messages';
import Container from '../../shared/Container';
import '../../../styles/announcer.scss';
import '../../../styles/chat.scss';

// Only used in Announcer.
const Announcement = ({
  message,
}) => {

  if (!message) return null; // TO DO: Test and remove this check.

  const meta = {
    wrapper: `msg-wrapper msg-in-announcer other`,
    inlineOnly: true,
  };

  const built = buildSMDString(message);
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

  // Selects system message data to display before game starts.
  // TO DO: This is a temporary solution; refactor.
  function startGameMsgText() {
    // Structure message data for `buildSMDString` module.
    function msg(type, args, isInGame, senderId='app') {
      return {
        type,
        isInGame,
        args,
        senderId,
      };
    };
    const [type, args] = lobby.startGameText(iAmLeader);
    return msg(type, args, false);
  };

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
        message={startGameMsgText()}
      />
      <Announcement
        message={lastAnnouncement()}
      />
    </Container>
  );
};

export default Announcer;