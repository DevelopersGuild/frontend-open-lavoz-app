import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Listings from './components/Listings';

function App() {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Listings} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
