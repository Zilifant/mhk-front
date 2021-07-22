import React, {
  // useState
} from 'react';
import Container from '../../../shared/Container';
import Button from '../../../ui-elements/Button';

const Setup = ({ className, readyHandler }) => {

  return (
    <Container className={className + 'controls'} parentGrid='main'>
      <Button onClick={readyHandler} disabled={false}>
        READY
      </Button>
    </Container>
  );
};

export default Setup;
