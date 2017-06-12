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
			/*
			<form>
				<ButtonGroup type="primary" updateTopState={this._updateTopState.bind(this)} />
				<div className="form-group">
					<button type="submit" className="btn btn-primary"
						data-place={this.state.place} 
					>{this.state.place}</button>
				</div>
			</form>
			*/
			<div id="steps">
				<h4>Navigate through the things:</h4>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a purus orci. Fusce ultricies turpis eu velit faucibus hendrerit. Nulla egestas urna ac sapien varius efficitur.</p>
				<div className="btn-group btn-group-lg mb-2" role="group" aria-label="Basic example">
					<button type="button" className="btn btn-secondary"><i className="fa fa-lg fa-chevron-circle-left" aria-hidden="true"></i></button>
					<button type="button" className="btn btn-secondary"><i className="fa fa-lg fa-chevron-circle-right" aria-hidden="true"></i></button>
				</div>
				<p className="mb-4"><strong>Thing 1</strong>: It&#39;s a thing.</p>

				<h4>Search through the stuff:</h4>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a purus orci. Fusce ultricies turpis eu velit faucibus hendrerit. Nulla egestas urna ac sapien varius efficitur.</p>
				<div className="btn-group btn-group-lg mb-2" role="group" aria-label="Basic example">
					<button type="button" className="btn btn-secondary"><i className="fa fa-lg fa-chevron-circle-left" aria-hidden="true"></i></button>
					<button type="button" className="btn btn-secondary"><i className="fa fa-lg fa-chevron-circle-right" aria-hidden="true"></i></button>
				</div>
				<p className="mb-4"><strong>Item 1</strong>: This is serious stuff</p>

				<h4>Find the Doodad:</h4>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a purus orci. Fusce ultricies turpis eu velit faucibus hendrerit. Nulla egestas urna ac sapien varius efficitur.</p>
				<div className="btn-group btn-group-lg mb-2" role="group" aria-label="Basic example">
					<button type="button" className="btn btn-secondary"><i className="fa fa-lg fa-chevron-circle-left" aria-hidden="true"></i></button>
					<button type="button" className="btn btn-secondary"><i className="fa fa-lg fa-chevron-circle-right" aria-hidden="true"></i></button>
				</div>
				<p className="mb-4"><strong>Doodad 1</strong>: basically a thingamajig</p>
				
				<h4>Look through the Dinglehoppers</h4>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a purus orci. Fusce ultricies turpis eu velit faucibus hendrerit. Nulla egestas urna ac sapien varius efficitur.</p>
				<div className="btn-group btn-group-lg mb-2" role="group" aria-label="Basic example">
					<button type="button" className="btn btn-secondary"><i className="fa fa-lg fa-chevron-circle-left" aria-hidden="true"></i></button>
					<button type="button" className="btn btn-secondary"><i className="fa fa-lg fa-chevron-circle-right" aria-hidden="true"></i></button>
				</div>
				<p className="mb-4"><strong>Dinglehopper 1</strong>: Nothing like a snarfblat at all.</p>



				<h4>The Final Button</h4>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a purus orci. Fusce ultricies turpis eu velit faucibus hendrerit. Nulla egestas urna ac sapien varius efficitur.</p>
				<div className="btn-group btn-group-lg mb-4 center-block" role="group" aria-label="Basic example">
					<button type="button" className="btn btn-primary">Submit</button>
				</div>
			</div>
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