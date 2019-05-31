class DynaButton extends React.Component {
	constructor() {
		//console.log('constructor()');
		super(); // Gotta call this first when doing a constructor.

		var things = [
				{
					name: 'First Thing',
					desc: 'This is the description for the first thing and so on and so forth.',
					value: 'thing01'
				},
				{
					name: 'Second Thing',
					desc: 'The second thing has this description.',
					value: 'thing02'
				},
				{
					name: 'Third Thing',
					desc: 'We have another thing here.',
					value: 'thing03'
				}
			],
			stuffs = [
				{
					name: 'Some Stuff',
					desc: 'Stuff happens, and this is some of it.',
					value: 'stuff01'
				},
				{
					name: 'Other Stuff',
					desc: 'Here is the other stuff.',
					value: 'stuff02'
				},
				{
					name: 'Even More Stuff',
					desc: 'Holy cow, we really do have even more stuff.',
					value: 'stuff03'
				}
			],
			doodads = [
				{
					name: 'Doodad One',
					desc: 'Doodads be doodads, yo.',
					value: 'doodad01'
				},
				{
					name: 'Another Doodad',
					desc: 'More description for doodads.',
					value: 'doodad02'
				},
				{
					name: 'A Third Doodad',
					desc: 'This is too much information about doodads.',
					value: 'doodad03'
				}
			],
			dinglehoppers = [
				{
					name: 'Dinglehopper',
					desc: 'This is the description for the first thing.',
					value: 'dinglehopper01'
				},
				{
					name: 'Snarfblat',
					desc: 'This is nothing like a dinglehopper at all.',
					value: 'dinglehopper02'
				},
				{
					name: "Here's another Dinglehopper!",
					desc: 'An actual dinglehopper, which is totally legit.',
					value: 'dinglehopper03'
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

	_updateTopState(obj) {
		this.setState(obj);
	}

	_prevNext(strArrayName, arrayIndex, direction) {

		var limit = this.state.data[strArrayName].length - 1,
			index;

		if (direction === 'next') {
			index = (this.state[arrayIndex] >= limit) ? 0 : (this.state[arrayIndex]) + 1 ;
		} else {
			index = (this.state[arrayIndex] > 0) ? (this.state[arrayIndex]) - 1 : limit;
		}

		var obj = {};
		obj[arrayIndex] = index;

		this.setState(obj);
	}

	render() {
		let markup = null;
		markup = 
			<div id="steps">

				<h4>Navigate through the things:</h4>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a purus orci. Fusce ultricies turpis eu velit faucibus hendrerit. Nulla egestas urna ac sapien varius efficitur.</p>
				<ButtonGroup buttonType="primary" array="things" arrayIndex="thing" current={this.state.data.things[this.state.thing]} prevNext={this._prevNext.bind(this)} />


				<h4>Search through the stuff:</h4>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a purus orci. Fusce ultricies turpis eu velit faucibus hendrerit. Nulla egestas urna ac sapien varius efficitur.</p>
				<ButtonGroup buttonType="danger" array="stuffs" arrayIndex="stuff" current={this.state.data.stuffs[this.state.stuff]} prevNext={this._prevNext.bind(this)} />


				<h4>Find the Doodad:</h4>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a purus orci. Fusce ultricies turpis eu velit faucibus hendrerit. Nulla egestas urna ac sapien varius efficitur.</p>
				<ButtonGroup buttonType="info" array="doodads" arrayIndex="doodad" current={this.state.data.doodads[this.state.doodad]} prevNext={this._prevNext.bind(this)} />


				<h4>Look through the Dinglehoppers</h4>
				<ButtonGroup buttonType="warning" array="dinglehoppers" arrayIndex="dinglehopper" current={this.state.data.dinglehoppers[this.state.dinglehopper]} prevNext={this._prevNext.bind(this)} />

				<h4>The Final Button</h4>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a purus orci. Fusce ultricies turpis eu velit faucibus hendrerit. Nulla egestas urna ac sapien varius efficitur.</p>
				<div className="btn-group btn-group-lg mb-4 center-block" role="group" aria-label="Basic example">
					<SubmitButton
						thing={this.state.data.things[this.state.thing].value} 
						stuff={this.state.data.stuffs[this.state.stuff].value} 
						doodad={this.state.data.doodads[this.state.doodad].value} 
						dinglehopper={this.state.data.dinglehoppers[this.state.dinglehopper].value} />
				</div>
			</div>
		;
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
		return(
				<div className="form-group">
					<div className="btn-group btn-group-lg mb-2" role="group" aria-label="Basic example">
						<button type="button" className={"btn btn-"+this.props.buttonType} onClick={this._goPrev.bind(this)}><i className="fa fa-lg fa-chevron-circle-left" aria-hidden="true"></i></button>
						<button type="button" className={"btn btn-"+this.props.buttonType} onClick={this._goNext.bind(this)}><i className="fa fa-lg fa-chevron-circle-right" aria-hidden="true"></i></button>
					</div>
					<p className="mb-4"><strong>{this.props.current.name}</strong>: {this.props.current.desc}</p>
				</div>
			);
	}
}

class SubmitButton extends React.Component {
	_handleClick() {
		console.log("Clicked the thing!");
	}
	render() {
		return(
				<button onClick={this._handleClick.bind(this)} 
				type="button" 
				className="btn btn-primary"
				data-thing={this.props.thing} 
				data-stuff={this.props.stuff} 
				data-doodad={this.props.doodad} 
				data-dinglehopper={this.props.dinglehopper} 
				>Submit</button>
			);
	}
}


ReactDOM.render(
	<DynaButton />, document.getElementById('dynabutton')
);