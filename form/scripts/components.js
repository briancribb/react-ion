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
				<h2>Form Element</h2>
				<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui.</p>
				<p>
					<label for="text_field">Text Field:</label><br/>
					<input type="text" id="text_field" />
				</p>
				<p>
					<label for="text_area">Text Area:</label><br/>
					<textarea id="text_area"></textarea>
				</p>
				<p>
					<label for="select_element">Select Element:</label><br/>
					<select name="select_element">
						<optgroup label="Option Group 1"><option value="1">Option 1</option><option value="2">Option 2</option><option value="3">Option 3</option></optgroup>
						<optgroup label="Option Group 2"><option value="1">Option 1</option><option value="2">Option 2</option><option value="3">Option 3</option></optgroup>
					</select>
				</p>


				<h3>Checkboxes and Radio Buttons</h3>

				<div className="checkbox">
					<label>
						<input type="checkbox" value="" />
						Option one is this and that&mdash;be sure to include why it&#8217;s great
					</label>
				</div>
				<div className="checkbox disabled">
					<label>
						<input type="checkbox" value="" disabled />
						Option two is disabled
					</label>
				</div>

				<h4>Radio Buttons</h4>
				<div className="radio">
					<label>
						<input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked />
						Option one is this and that&mdash;be sure to include why it&#8217;s great
					</label>
				</div>
				<div className="radio">
					<label>
						<input type="radio" name="optionsRadios" id="optionsRadios2" value="option2" />
						Option two can be something else and selecting it will deselect option one
					</label>
				</div>
				<div className="radio disabled">
					<label>
						<input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled />
						Option three is disabled
					</label>
				</div>



				<h4>Inline Checkboxes</h4>
				<label className="checkbox-inline">
					<input type="checkbox" id="inlineCheckbox1" value="option1" /> 1
				</label>
				<label className="checkbox-inline">
					<input type="checkbox" id="inlineCheckbox2" value="option2" /> 2
				</label>
				<label className="checkbox-inline">
					<input type="checkbox" id="inlineCheckbox3" value="option3" /> 3
				</label>

				<h4>Inline Radio Buttons</h4>
				<label className="radio-inline">
					<input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" /> 1
				</label>
				<label className="radio-inline">
					<input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" /> 2
				</label>
				<label className="radio-inline">
					<input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" /> 3
				</label>

				<p>
					<label for="password">Password:</label>
				</p>
				<p>
					<input type="password" className="password" name="password" />
				</p>
				<p>
					<label for="file">File Input:</label><br/>
					<input type="file" className="file" name="file" />
				</p>
				<p>
					<input className="button" type="reset" value="Clear" /> <input className="button" type="submit" value="Submit" />
				</p>
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