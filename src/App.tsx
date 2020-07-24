import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from './Components/Home';
import Room from './Components/Room';
import NotFound from './Components/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Home} />
        <Route path='/:roomid' component={Room} />
        <Route path='*' component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
