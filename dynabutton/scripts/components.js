class DynaButton extends React.Component {
	constructor() {
		//console.log('constructor()');
		super(); // Gotta call this first when doing a constructor.
		this.state = {
			place: 'default'
		}

		//let that = this;
		//window.getState = function() {
		//	return that.state;
		//}
	}

	_updateTopState(obj) {
		this.setState(obj);
	}

	/*
	componentDidMount() {
		console.log('componentDidMount()');
	}
	*/

	/*
	componentDidUpdate() {
		console.log('componentDidUpdate()');
	}
	*/


	render() {
		let markup = null;
		markup = 
			<form>
				<ButtonGroup type="primary" updateTopState={this._updateTopState.bind(this)} />
				<div className="form-group">
					<button type="submit" className="btn btn-primary"
						data-place={this.state.place} 
					>{this.state.place}</button>
				</div>
			</form>
		; 
		return(
			markup
		); 
	}
}


class ButtonGroup extends React.Component {
	render() {
		return(
				<div className="form-group">
					<div className="btn-group" role="group" aria-label="Placement">
						<PlaceButton type="secondary" place="first" updateTopState={this.props.updateTopState} />
						<PlaceButton type="secondary" place="second" updateTopState={this.props.updateTopState} />
						<PlaceButton type="secondary" place="third" updateTopState={this.props.updateTopState} />
					</div>
				</div>
			);
	}
}

class PlaceButton extends React.Component {
	_handleClick() {
		this.props.updateTopState({place:this.props.place});
	}
	render() {
		return(
				<button onClick={this._handleClick.bind(this)} type="button" className={"btn btn-" + this.props.type}>{this.props.place}</button>
			);
	}
}


ReactDOM.render(
	<DynaButton />, document.getElementById('dynabutton')
);