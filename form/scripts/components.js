class Thing extends React.Component {
	// In case we need initial states, which we will because we're waiting for data.
	constructor() {
		//console.log('constructor()');
		super(); // Gotta call this first when doing a constructor.
		this.state = {
			test: false
		}
		//this._getData();
		console.log('this.state');
		console.log(this.state);
	}

	/*
	Showing a download icon while the assets load, and then a round arrow spinner while the data loads. When the "loading" 
	class is removed, the initial loader container is hidden and the Timeline app container is shown. 
	*/
	componentDidMount() {
		$('body').removeClass('loading');
		console.log('componentDidMount()');
	}

	/*
	After the app updates, we run some jQuery to put every other entry on the right side. This could have been done by 
	looping through the entries array and checking to see who's visible, but we're already paying for jQuery in our page 
	load so we should just go ahead and use it where appropriate.
	*/
	componentDidUpdate() {
		if (this.state.initialized) {
			//this._alternateFloats();
		}
		console.log('componentDidUpdate()');
	}



	render() {
		let markup = null;
		/*
		if (this.state.initialized) {
			const entries = this._getEntries();
			markup = 
				<div id="timeline">
					<TLToggles sources={this.state.sources} updateSource={this._updateSource.bind(this)} />
					<ul id="tl-list" className={"tl-list " + this.state.parentClasses}>
						{entries}
					</ul>
				</div>
		} else {
			markup = 
				<div className="page-load text-center">
					<div id="page-load-spinner" className="page-load-spinner"><span className="glyphicon glyphicon-repeat trans-spin" aria-hidden="true"></span></div>
					<p>Loading Timeline Events...</p>
				</div>
		}
		*/
		markup = 
			<form>
				<div className="form-group">
					<label for="exampleInputEmail1">Email address</label>
					<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
					<small id="emailHelp" className="form-text text-muted">We&rsquo;ll never share your email with anyone else.</small>
				</div>
				<div className="form-group">
					<label for="exampleInputPassword1">Password</label>
					<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
				</div>
				<div className="form-group">
					<label for="exampleSelect1">Example select</label>
					<select className="form-control" id="exampleSelect1">
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
					</select>
				</div>
				<div className="form-group">
					<label for="exampleSelect2">Example multiple select</label>
					<select multiple className="form-control" id="exampleSelect2">
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
					</select>
				</div>
				<div className="form-group">
					<label for="exampleTextarea">Example textarea</label>
					<textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
				</div>
				<div className="form-group">
					<label for="exampleInputFile">File input</label>
					<input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" />
					<small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text for the above input. It&rsquo;s a bit lighter and easily wraps to a new line.</small>
				</div>
				<fieldset className="form-group">
					<legend>Radio buttons</legend>
					<div className="form-check">
						<label className="form-check-label">
							<input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" checked />
							<span>Option one is this and that &mdash; be sure to include why it&rsquo;s great</span>
						</label>
					</div>
					<div className="form-check">
					<label className="form-check-label">
							<input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2" />
							<span>Option two can be something else and selecting it will deselect option one</span>
						</label>
					</div>
					<div className="form-check disabled">
					<label className="form-check-label">
							<input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios3" value="option3" disabled />
							<span>Option three is disabled</span>
						</label>
					</div>
				</fieldset>
				<div className="form-check">
					<label className="form-check-label">
						<input type="checkbox" className="form-check-input" />
						<span>Check me out</span>
					</label>
				</div>
				<div className="form-group">
					<button type="submit" className="btn btn-primary">Submit</button>
				</div>
			</form>
		; 
		return(
			markup
		); 
	}
}

ReactDOM.render(
	<Thing />, document.getElementById('test-app')
);