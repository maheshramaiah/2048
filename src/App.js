import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { game, colorMap } from './4x4_new';
import './style.scss';
import { getIndex, randomIndex } from './utils';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
      ],
      nos: [2, 4],
      score: 0
    };
  }

  componentDidMount() {
    this.start();
    ReactDOM.findDOMNode(this.refs.container).focus();
  }

  start() {
    const { data, nos } = this.state;
    const index = getIndex(data, true);
    const newState = data.map((d, i) => {
      if (i === index) {
        return nos[randomIndex(2)];
      }
      return 0;
    });

    this.setState({ data: newState })
  }

  keyDown(e) {
    let direction = '';

    switch (e.keyCode) {
      case 37: direction = 'left';
        break;
      case 38: direction = 'up';
        break;
      case 39: direction = 'right';
        break;
      case 40: direction = 'bottom';
        break;
    }

    if (direction) {
      const { score, newState } = game(direction, this.state.data);

      if (!newState) {
        alert('Game over');
      }
      else {
        this.setState({ data: newState, score });
      }
    }
  }

  render() {
    const { score, data } = this.state;
    return (
      <div className="page" onKeyDown={(e) => this.keyDown(e)} tabIndex="1" ref="container">
        <div className="score">
          <p>Score</p>
          <p>{score}</p>
        </div>
        <ul className="container">
          {
            data.map((d, index) => {
              return (
                <li key={index} style={{ backgroundColor: colorMap[d] }}>
                  {d !== 0 && d}
                </li>
              );
            })
          }
        </ul>
        <div className="actions">
          <button onClick={() => this.start()}>Restart</button>
        </div>
      </div>
    );
  }
}

export default App;
