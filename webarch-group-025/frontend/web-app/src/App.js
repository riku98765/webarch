import React, { Component } from 'react'
import axios from 'axios';

class App extends Component {
    render() {
        return (
          <div className="App">
            <h1>Hello, React!</h1>
            <button onClick={() => axios.get('http://localhost:8080/v1/order/6')}>nappi</button>
          </div>
      )
  }
}

export default App