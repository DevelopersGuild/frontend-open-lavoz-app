import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Listings from './components/Listings';
import Story from './components/Story';

function App() {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Listings} />
        <Route exact path="/story" component={Story} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
