import React from 'react';
import Grid from '../shared/Grid';
import Header from '../shared/Header';
import NewLobby from './NewLobby';
import JoinLobby from './JoinLobby';
import '../../styles/landing.scss';

const Landing = () => {
  // console.log('%cLanding','color:#f579f9');
  return (
    <Grid className='landing'>
      <Header className='landing' />
      <NewLobby />
      <JoinLobby />
    </Grid>
  );
};

export default Landing;
