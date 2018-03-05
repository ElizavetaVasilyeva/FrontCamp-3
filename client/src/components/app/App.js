import React from 'react';
import Header from '../header/header';
import AppRoutes from '../routes'

const App = () =>
  <div>
    <Header />
    <div className="mainDiv">
      <AppRoutes />
    </div>
  </div>

export default App;
