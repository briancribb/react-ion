// https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
let Autocomplete = class extends React.Component {
	/*
	<RC.Autocomplete arrData={myArray} />
	*/
	constructor(props) {
		super(props);
		this.state = {
			minimum: 		3,
			value: 			'',
			placeholder: 	this.props.placeholder || "Type something...",
			isDisabled: 	this.props.isDisabled === false ? false : true// undefined means true
		};
		this._handleClick    = this._handleClick.bind(this);
		this._handleKeyDown  = this._handleKeyDown.bind(this);
		this._handleChange    = this._handleChange.bind(this);
		this._getMatches     = this._getMatches.bind(this);
	}

	_handleClick(evt) {
		//console.log('_handleClick() - ', evt.target.previousSibling.value.length);
		let input = evt.target.previousSibling;
		if (!input.value || input.value.length < this.state.minimum) return;
	}
	_handleKeyDown(evt) {
		/*
		The input will submit like a form when the Enter key is pressed. This happens 
		on the keyDown event, so default behavior must be prevented for that event.
		*/
		if (evt.keyCode === 13) {
			evt.preventDefault();
			this._handleCheck();
		}
	}
	_handleChange(evt) {
		this.setState({value: evt.target.value});
		if (evt.target.value.length < this.state.minimum) return;
		//if (evt.keyCode === 13) {
			this._handleCheck();
		//}
	}

	_handleCheck(str) {
		this._getMatches();
	}

	_getMatches() {
		let value = this.state.value;
		let allKeys = this.props.allKeys ? true : false;
		let arrData = this.props.arrData,
			mainKey = this.props.mainKey,
			objResults = {
			matches: []
		};

		/*
		1. Go through the data array to see if we have objects or strings.
		2. If it's all strings, then the object just gets a key called "matches".
		3. If an object, check all keys for matches.
			A.  If there's a match then put that key into the results object and add the item 
				to its array.
		4. Results markup will end up with headers for the keys and results underneath.
		*/
		arrData.forEach((item)=>{
			// Array or object?
			if (typeof item === 'string') {
				// If it matches, it just goes into matches.
				if (item.toLowerCase().includes(value)) {
					objResults.matches.push(item);
				}
			} else {
				/*
				It's an object. Check all keys and add matches to an array in the results 
				with that key. A chosen key will go into the matches array instead. Keep 
				in mind that this will only go one level deep. 
				*/
				if (item[mainKey] && item[mainKey].toLowerCase().includes(value) ) {
					/*
					If the main key is in there and matches, then we just use that.
					*/
					objResults.matches.push(item[mainKey]);
				} else if (allKeys) {
					/*
					Not a straight match with the main key, so loop through the other keys. 
					But first, remove the main key if it exists because we already checked 
					for that.
					*/
					let arrOtherKeys = Object.keys(item).filter((key)=>{
						return key !== mainKey;
					});
					arrOtherKeys.forEach((key)=>{
						/*
						Most will be strings, but "tags" is an array.
						*/
						if (Array.isArray(item[key])) {
							/*
							Check the array. This is for something like "tags" where there 
							would be an array of values that need to be checked.
							*/
						} else {
							if ( item[key].toLowerCase().includes(value) ) {
								if (!objResults[key]) objResults[key] = [];

								/*
								Push the main key. Need to show somehow that it was matched 
								by some other key, because showing a main key by itself would 
								confuse the user.
								*/
								objResults[key].push(item[mainKey]);
							}
						}
					});
				}

			}
		});
		console.log('_getMatches() End - objResults', objResults);
	}

	render() {
		return (
			<div className="input-group mb-3">
				<input type="text" className="form-control" value={this.state.value} onChange={this._handleChange}  onKeyDown={this._handleKeyDown} placeholder={this.state.placeholder} aria-label={this.state.placeholder} />
				<span className="input-group-text" onClick={this._handleClick}><i className="fa fa-search pe-none"></i></span>
			</div>
		);
	}
}

export default Autocomplete;
