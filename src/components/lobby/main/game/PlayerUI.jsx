// PlayerUI //
// For players other than the Ghost.

import React from 'react';
import { badge, article } from '../../../../util/utils';
import Container from '../../../shared/Container';
import SVGIcon from '../../../ui-elements/SVGIcon';
import ChooseKeyEvUI from './ChooseKeyEvUI';
import Cards from './Cards';

const PlayerUI = ({
  thisPlayer: {
    hand,
    role,
    canAccuse
  },
  stage,
  keyEv
}) => {

  const isKillerChoosingKeyEv = (role === 'killer') && (stage.id === 'setup');

  // `hand` includes two types of card: `means` and `evidence`.
  const types = Object.keys(hand);

  return (
    <Container className={`self player ${isKillerChoosingKeyEv && 'killer-choosing'}`}>
      <li className={`p-info role ${role}`}>
        <div className='wrapper'>
          <SVGIcon
            icon='badge'
            className={`badge ${badge(canAccuse)}`}
          />
          <div className='subtitle'>You are {article(role)}</div>
          <div className={`role ${role}`}>{role.toUpperCase()}</div>
        </div>
      </li>
      {!isKillerChoosingKeyEv &&
      types.map((type) => (<React.Fragment key={type}>
        <div className={`c-group-title ${type}`}>{type}</div>
        <Cards
          myRole={role}
          type='basicUI'
          cardType={type}
          cards={hand[type]}
          keyEv={keyEv}
        />
      </React.Fragment>))}
      {isKillerChoosingKeyEv &&
      <ChooseKeyEvUI
        hand={hand}
        stage={stage}
        keyEv={keyEv}
      />}
    </Container>
  );

};

export default PlayerUI;