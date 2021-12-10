// Cards //
// Displays means and evidence cards in Player and PlayerUI components.
// Each card is a button, which can be in a combination of states:
// highlighted (or not), selected (or not), and disabled (or not).
// TO DO: This is overly complex; refactor.

import Card from './Card';

const Cards = ({
  myRole,
  type, // basicUI, killerUI, or otherPlayer
  cardType,
  stage,
  cards,
  keyEv,
  canIAccuse,
  selectedId,
  selectCardHandler
}) => {

  // Roles that never interact with their own cards.
  const rolesWithSimpleHand = ['hunter', 'witness', 'accomplice'];
  const hasSimpleHand = rolesWithSimpleHand.includes(myRole) && (type === 'basicUI');

  if (hasSimpleHand) {
    return (
      <ul className={`c-group ${cardType}`}>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          className={card.type}
          isHighlighted={false} // Never highlighted.
          isSelected={false} // Never selected.
          isEnabled={false} // Never enabled.
          handleClick={null} // No functionality.
        />
      ))}
    </ul>
    );
  };

  // Determine if card is enabled (click-able).
  const isEnabled = () => {
    switch (type) {
      case `basicUI`: // TO DO: Should be redundant; verify and remove.
        return false;
      case `killerUI`:
        // Killer only interacts with their own cards during setup.
        if (stage.id !== `setup`) return false;
        return true;
      case `otherPlayer`:
        // Roles that never interact with other players' cards.
        if (myRole === 'ghost' || myRole === 'spectator') return false;
        // Other cases where a player cannot interact with anothers' cards.
        if (stage.type !== `round` || !canIAccuse) return false;
        return true;
      default:
        return false;
    };
  };

  // Determine if card is highlighted.
  const isHighlighted = (cardId) => {
    // Roles that never see highlighted cards.
    if (myRole === 'hunter' || myRole === 'witness') return false;
    // For other roles, highlight the (2) cards that match key evidence.
    if (keyEv) return keyEv.includes(cardId);
  };

  return (
    <ul className={`c-group ${cardType}`}>
    {cards.map((card) => (
      <Card
        key={card.id}
        id={card.id}
        card={card}
        className={card.type}
        isHighlighted={isHighlighted(card.id)}
        isEnabled={isEnabled(card.id)}
        isSelected={selectedId === card.id} // Parallel-selector hook tracks.
        handleClick={selectCardHandler}
      />
    ))}
  </ul>
  );
};

export default Cards;
