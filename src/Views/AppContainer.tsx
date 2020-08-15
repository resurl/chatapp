import React from 'react';
import { 
  Route,
  Switch,
  useHistory
} from 'react-router-dom';
import Home from './HomePage/Home';
import Room from './Room/Room';
import NotFound from './NotFound';

function View() {

  let history = useHistory();

  function loadRoom(roomid: string) {
    history.push(`/${roomid}`)
  }

  return (
    <Switch>
        <Route exact path='/' render={() => <Home loadRoom={loadRoom}/>} />
        <Route path='/404' component={NotFound} />
        <Route path='/:roomid' render={(renderProps)=> <Room {...renderProps} />} />
        <Route path='*' component={NotFound} />
    </Switch>
  );
}

export default View;
