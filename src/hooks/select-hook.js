import {
  useState,
  useContext,
  // useEffect
} from 'react';
import { SocketContext } from '../context/contexts';

const reduceSelection = (selCards) => {
  return selCards.reduce((a, card) => {
    if (card.isSelected) a.push(card.id);
    return a;
  }, []);
};

const initSelection = (hand) => {
  return hand.map(card => {
    return {id: card.id, isSelected: false };
  });
};

export const useCardSelector = (hand) => {
  // console.log('Hook: useCardSelector');

  const [twoSelected, setTwoSelected] = useState(false);
  const [selectedCards, setSelectedCards] = useState(initSelection(hand));

  const { socket } = useContext(SocketContext);

  const selectCard = (id) => {
    const upSelection = selectedCards.map(card => {
      if (card.id !== id) return card;
      return {
        id: card.id,
        isSelected: !card.isSelected
      };
    });

    const twoSel = upSelection.filter(card => card.isSelected === true).length === 2

    setSelectedCards(upSelection);
    setTwoSelected(twoSel);
  };

  const confirmKeyEvSelection = (selCards) => {
    const keyEv = reduceSelection(selCards);
    socket.current.emit('keyEvidenceChosen', keyEv);

    setSelectedCards(initSelection(hand));
    setTwoSelected(false);
  };

  const confirmAccusation = (playerId, selCards) => {
    const accEv = reduceSelection(selCards);
    const accusation = {
      accuserSID: socket.current.id,
      accusedId: playerId,
      accusalEv: accEv
    };
    socket.current.emit('accusation', accusation);

    setSelectedCards(initSelection(hand));
    setTwoSelected(false);
  };

  return {
    selectCard,
    twoSelected, selectedCards,
    confirmKeyEvSelection,
    confirmAccusation,
    setSelectedCards, setTwoSelected
  };
};

export const useItemSelector = (items, max = 1) => {
  // console.log('Hook: useItemSelector');

  const { socket } = useContext(SocketContext);

  const [maxSelected, setMaxSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState(initSelection(items))

  const selectItem = (id) => {
    const updSel = selectedItems.map(item => {
      if (item.id !== id) return item;
      return {
        // ...item,
        id: item.id,
        isSelected: !item.isSelected
      };
    });

    const maxSel = updSel.filter(item => item.isSelected === true).length === max;

    setSelectedItems(updSel);
    setMaxSelected(maxSel);
  };

  const confirmSelection = (selItems) => {
    const selection = reduceSelection(selItems);
    socket.current.emit('clueChosen', selection);

    setSelectedItems(initSelection(items));
    setMaxSelected(false);
  };

  return {
    selectItem,
    confirmSelection,
    maxSelected,
    selectedItems,
  };
};