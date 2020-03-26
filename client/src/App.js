import React from 'react';
import { createBrowserHistory as createHistory } from "history";
import './App.css';
import ResultsPage from "./Result.js"; 
import { Router, Route} from "react-router-dom";
const history = createHistory();


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router history={history}> 
          <Route path="/" exact component={ResultsPage} />
        </Router>
      
      </header>
      
       
    </div>
  );
}

export default App;
