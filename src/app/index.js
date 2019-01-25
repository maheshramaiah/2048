import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from './actionCreators';
import './style.scss';
import { colorMap } from './color';

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

	render() {
		const { app, actions } = this.props;
		const { score, data, finish } = app;

		if (finish) {
			alert('Game over');
		}

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
					<button onClick={() => actions.start()}>Restart</button>
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