import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Middle from "./components/Middle";
import Footer from "./components/Footer";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Header />
        <Middle />
        <Footer />
      </div>
    );
  }
}

export default App;