// import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// import Predict from './pages/Predict';
import Home from './pages/Home';
import Predict_Classification from './pages/Predict_Classification';
import Predict_Regression from './pages/Predict_Regression';
import Table from './pages/Table';
import React from 'react';
import Head_classification from './components/Head_classification';
import Menu_classification from './components/Menu_classification';
import Footer_classification from './components/Footer_classification';
import Head_regression from './components/Head_regression';
import Menu_regression from './components/Menu_regression';
import Footer_regression from './components/Footer_regression';

class App extends React.Component {

  render(){
    return(
        <Router>
            <Head_classification />
            <Menu_classification />
            <Switch>
              <Route path="/Predict_Classification">
                <Predict_Classification />
              </Route>
              <Route path="/Predict_Regression">
                {/* <Head_regression />
                <Menu_regression /> */}
                <Predict_Regression />
                {/* <Footer_regression /> */}
              </Route>
              <Route path="/Table">
                <Table />
              </Route>
              <Route path="/">
                  <Home />
              </Route>
              {/* <Route path="/">
                  <Table />
              </Route> */}
            </Switch>
            <Footer_classification />
        </Router>
    )
  }

}

export default App;
