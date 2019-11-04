import React, { useEffect, useReducer, useRef } from 'react';
import ReactTouchEvents from 'react-touch-events';
import { useStorage } from '../utils/useStorage';
import { useColor } from '../utils/useColor';
import reducer, { initialState } from './reducer';
import * as types from './actionTypes';
import './style.scss';

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const storage = useStorage();
  const color = useColor();
  const contEl = useRef(null);

  useEffect(() => {
    dispatch({ type: types.START });
    contEl.current.focus();
  }, []);

  function keyDown(e) {
    let direction = '';

    switch (e.keyCode) {
      case 37:
        direction = 'left';
        break;
      case 38:
        direction = 'top';
        break;
      case 39:
        direction = 'right';
        break;
      case 40:
        direction = 'bottom';
        break;
    }

    direction && dispatch({ type: types.ON_MOVE, direction });
  }

  function onSwipe(direction) {
    direction && dispatch({ type: types.ON_MOVE, direction });
  }

  function restart() {
    const score = state.present.score;
    const higestScore = storage.get('HIGHEST_SCORE');

    if (score > higestScore) {
      storage.set('HIGHEST_SCORE', score);
    }
    dispatch({ type: types.START });
  }

  function renderScores() {
    return (
      <div className='score'>
        <div>
          <p>Score</p>
          <p>{state.present.score}</p>
        </div>
        <div>
          <p>Highest Score</p>
          <p>{storage.get('HIGHEST_SCORE') || 0}</p>
        </div>
      </div>
    );
  }

  function renderPlayBoard() {
    return (
      <ReactTouchEvents onSwipe={onSwipe}>
        <ul className='container'>
          {state.present.data.map((d, index) => (
            <li key={index} style={{ backgroundColor: color.get(d) }}>
              {d !== 0 && d}
            </li>
          )
          )}
        </ul>
      </ReactTouchEvents>
    );
  }

  function renderActions() {
    return (
      <div className='actions'>
        <button onClick={restart}>RESTART</button>
        <button onClick={() => dispatch({ type: types.UNDO })} disabled={!state.past}>
          UNDO
        </button>
        <button onClick={() => dispatch({ type: types.REDO })} disabled={!state.future}>
          REDO
        </button>
      </div>
    );
  }

  return (
    <div className='page' onKeyDown={keyDown} tabIndex='1' ref={contEl}>
      {renderScores()}
      {renderPlayBoard()}
      {renderActions()}
    </div>
  );
};
