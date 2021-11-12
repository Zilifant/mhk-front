const Card = ({
  card,
  className,
  id,
  isHighlighted,
  isSelected,
  isEnabled,
  handleClick
}) => {

  const selected = isSelected ? 'selected' : 'default';
  const highlighted = isHighlighted ? 'highlighted' : 'default';

  return (
    <button
      className={`card-wrap--player ${className} ${selected} ${highlighted}`}
      disabled={!isEnabled}
      onClick={() => handleClick(card)}
    >
      {id.split(' ')[0]}<br/>{id.split(' ')[1]}
    </button>
  );
};

export default Card;