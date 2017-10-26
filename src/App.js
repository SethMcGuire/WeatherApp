import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

//components
import Footer from './components/footerComponent/footer';
import Homepage from './components/pages/homePage';
import Products from './components/pages/products';



class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">


          <Route exact path='/' component={Homepage} />
          <Route exact path='/Products' component={Products} />

        <Footer />

      </div>
      </Router>
    );
  }
}


export default App;
