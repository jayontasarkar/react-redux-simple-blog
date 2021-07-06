import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import Navigation from './components/navigation';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <div className="container">
          <Routes />
        </div>
      </Router>
    </div>
  );
}

export default App;
