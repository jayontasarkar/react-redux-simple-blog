import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import Navigation from './components/navigation';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container">
        <Routes />
      </div>
    </Router>
  );
}

export default App;
