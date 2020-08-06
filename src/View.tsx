import React from 'react';
import { 
  Route,
  Switch,
  useHistory
} from 'react-router-dom';
import {getRoom} from './Components/api';
import Home from './Components/Home';
import Room from './Components/Room';
import NotFound from './Components/NotFound';

function View() {

  let history = useHistory();

  function loadRoom(roomid: string) {
    getRoom(roomid).then((data: any) => {
      console.log(data.data)
      history.push(`/${roomid}`, data.data)
    })
  }

  return (
    <Switch>
        <Route exact path='/' render={() => <Home loadRoom={loadRoom}/>} />
        <Route path='/:roomid' render={(renderProps)=> <Room {...renderProps} />} />
        <Route path='/404' component={NotFound} />
        <Route path='*' component={NotFound} />
    </Switch>
  );
}

export default View;
