
export const useTextParser = () => {
  // console.log('Hook: useTextParser');

  const parseGameResult = ({
    killerWin, accuserId, killerId, keyEv
  }) => {
    const killerWinText = `${killerId.slice(0,-5)} evaded the hunters. Key evidence: ${keyEv[0]} and ${keyEv[1]}.`;

    const hunterWinText = `${accuserId.slice(0,-5)} identified ${killerId.slice(0,-5)} as the killer. Key evidence: ${keyEv[0]} and ${keyEv[1]}.`;

    return killerWin ? killerWinText : hunterWinText;
  };

  return {
    parseGameResult
  };
};