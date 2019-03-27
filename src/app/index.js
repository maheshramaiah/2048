import React, { useEffect, useReducer, useRef } from 'react';
import reducer from './hooks/reducer';
import Storage from '../storage';
import * as types from './actionTypes';
import './style.scss';
import { colorMap } from './color';

const initialState = {
  past: null,
  present: {
    data: [
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0
    ],
    score: 0,
    finish: false
  },
  future: null,
  insertion: [2, 4],
  higestScore: Storage.get('HIGHEST_SCORE') || 0
};

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contEl = useRef(null);

  useEffect(() => {
    dispatch({ type: types.START });
    contEl.current.focus();
  }, [])

  function keyDown(e) {
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

    direction && dispatch({ type: types.ON_MOVE, direction });
  }

  function restart() {
    const score = state.present.score;
    const higestScore = Storage.get('HIGHEST_SCORE');

    if (score > higestScore) {
      Storage.set('HIGHEST_SCORE', score);
    }
    dispatch({ type: types.START });
  }

  function renderScores() {
    return (
      <div className="score clearfix">
        <div>
          <p>Score</p>
          <p>{state.present.score}</p>
        </div>
        <div className="highestScore">
          <p>Highest Score</p>
          <p>{state.higestScore}</p>
        </div>
      </div>
    );
  }

  function renderPlayBoard() {
    return (
      <ul className="container">
        {
          state.present.data.map((d, index) => {
            return (
              <li key={index} style={{ backgroundColor: colorMap[d] }}>
                {d !== 0 && d}
              </li>
            );
          })
        }
      </ul>
    );
  }

  function renderActions() {
    return (
      <div className="actions">
        <button onClick={restart}>RESTART</button>
        <button onClick={() => dispatch({ type: types.UNDO })} disabled={!state.past}>UNDO</button>
        <button onClick={() => dispatch({ type: types.REDO })} disabled={!state.future}>REDO</button>
      </div>
    );
  }

  return (
    <div className="page" onKeyDown={keyDown} tabIndex="1" ref={contEl}>
      {renderScores()}
      {renderPlayBoard()}
      {renderActions()}
    </div>
  );
} 