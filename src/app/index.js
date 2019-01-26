import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from './actionCreators';
import './style.scss';
import { colorMap } from './color';
import Storage from '../storage';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.start();
    ReactDOM.findDOMNode(this.refs.container).focus();
  }

  keyDown(e) {
    let direction = '';

    switch (e.keyCode) {
      case 37: direction = 'left';
        break;
      case 38: direction = 'top';
        break;
      case 39: direction = 'right';
        break;
      case 40: direction = 'bottom';
        break;
    }

    if (direction) {
      this.props.actions.onMove(direction);
    }
  }

  restart() {
    const { app: { present: { score } }, actions } = this.props;
    const higestScore = Storage.get('HIGHEST_SCORE');

    if (score > higestScore) {
      Storage.set('HIGHEST_SCORE', score);
    }
    actions.start();
  }

  render() {
    const { app, actions } = this.props;
    const { score, data, finish } = app.present;

    if (finish) {
      alert('Game over');
    }

    return (
      <div className="page" onKeyDown={(e) => this.keyDown(e)} tabIndex="1" ref="container">
        <div className="score clearfix">
          <div>
            <p>Score</p>
            <p>{score}</p>
          </div>
          <div className="highestScore">
            <p>Highest Score</p>
            <p>{app.higestScore}</p>
          </div>
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
          <button onClick={() => this.restart()}>RESTART</button>
          <button onClick={() => actions.undo()} disabled={!app.past}>UNDO</button>
          <button onClick={() => actions.redo()} disabled={!app.future}>REDO</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);