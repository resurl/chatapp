import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import View from './Views/AppContainer';
import './App.css';
import './Styles/main.css'

export default function App() {
  return (
    <BrowserRouter>
      <View />
    </BrowserRouter>
  )
}
