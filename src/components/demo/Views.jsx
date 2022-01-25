// Views

import View from './View';

const Views = () => {
  return (
    <div className=' views-grid'>
      {[...Array(1)].map((x, i) => <View key={i} id={i+1}/>)}
    </div>
  );
};

export default Views;
