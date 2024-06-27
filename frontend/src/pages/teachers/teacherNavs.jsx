import React from 'react';
import Navigation from '../../navbar/subHeader';

function App() {
  const userRole = 'teacher';

  return (
    <>
      <Navigation role={userRole} />
    </>
  );
}

export default App;
