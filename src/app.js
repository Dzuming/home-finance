import React from 'react';
import {Component} from 'react';
import Nav from './containers/Navigation'
import './index.scss'
export default class App extends Component {
  render() {
    return (
      <div>
        <Nav/>
      </div>
    );
  }
}