class DynaButton extends React.Component {
	constructor() {
		//console.log('constructor()');
		super(); // Gotta call this first when doing a constructor.

		var things = [
				{
					name: 'First Thing',
					desc: 'This is the description for the first thing and so on and so forth.',
					value: 'test'
				},
				{
					name: 'Second Thing',
					desc: 'The second thing has this description.',
					value: 'test'
				},
				{
					name: 'Third Thing',
					desc: 'We have another thing here.',
					value: 'test'
				}
			],
			stuffs = [
				{
					name: 'Some Stuff',
					desc: 'Stuff happens, and this is some of it.',
					value: 'test'
				},
				{
					name: 'Other Stuff',
					desc: 'Here is the other stuff.',
					value: 'test'
				}
			],
			doodads = [
				{
					name: 'Doodad One',
					desc: 'Doodads be doodads, yo.',
					value: 'test'
				},
				{
					name: 'Another Doodad',
					desc: 'More description for doodads.',
					value: 'test'
				}
			],
			dinglehoppers = [
				{
					name: 'Dinglehopper',
					desc: 'This is the description for the first thing.',
					value: 'test'
				},
				{
					name: 'Snarfblat',
					desc: 'This is nothing like a dinglehopper at all.',
					value: 'test'
				}
			];

		this.state = {
			place: 'default',
			data: {
				things:things,
				stuffs:stuffs,
				doodads:doodads,
				dinglehoppers:dinglehoppers
			},
			thing:0,
			stuff:0,
			doodad:0,
			dinglehopper:0
		}

	}
	componentDidMount() {
		this._getData();
	}
	_getData() {
		console.log('_getData()');

		var obj = {
			initialized:true
		}
		this.setState(obj);

	}
	_updateTopState(obj) {
		this.setState(obj);
	}
	_prevNext(strArrayName, arrayIndex, direction) {
		console.log('_prevNext()');

		var limit = this.state.data[strArrayName].length - 1,
			index;

		console.log([this.state[arrayIndex], limit]);

		if (direction === 'next') {
			index = (this.state[arrayIndex] >= limit) ? 0 : (this.state[arrayIndex]) + 1 ;
		} else {
			index = (this.state[arrayIndex] > 0) ? (this.state[arrayIndex]) - 1 : limit;
		}

		var obj = {};
		obj[arrayIndex] = index;





		//console.log(obj);
		this.setState(obj);

		console.log([strArrayName, arrayIndex, direction, this.state[arrayIndex] ]);
		console.log(' ===== ');
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
		if (this.state.initialized) {
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





					<ButtonGroup array="things" arrayIndex="thing" current={this.state.data.things[this.state.thing]} prevNext={this._prevNext.bind(this)} />





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
		}
		return(
			markup
		); 
	}
}


class ButtonGroup extends React.Component {

	_goPrev() {
		this.props.prevNext(this.props.array, this.props.arrayIndex, 'prev');
	}
	_goNext() {
		this.props.prevNext(this.props.array, this.props.arrayIndex, 'next');
	}

	render() {
		//console.log('this.props');
		//console.log(this.props);
		return(
				<div className="form-group">
					<div className="btn-group btn-group-lg mb-2" role="group" aria-label="Basic example">
						<button type="button" className="btn btn-secondary" onClick={this._goPrev.bind(this)}><i className="fa fa-lg fa-chevron-circle-left" aria-hidden="true"></i></button>
						<button type="button" className="btn btn-secondary" onClick={this._goNext.bind(this)}><i className="fa fa-lg fa-chevron-circle-right" aria-hidden="true"></i></button>
					</div>
					<p className="mb-4"><strong>{this.props.current.name}</strong>: {this.props.current.desc}</p>
				</div>
			);
	}
}
/*
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
*/

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