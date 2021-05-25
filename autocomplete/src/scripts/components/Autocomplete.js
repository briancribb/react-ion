// https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
let Autocomplete = class extends React.Component {
	/*
	If an array of objects is passed in for data, then a main key is required.
	PROPS:
		parent 			: OPTIONAL - parent object that contains other components.
		arrData 		: REQUIRED - And array of strings or objects. 
		mainKey 		: OPTIONAL - The key in an array item to match. If not included, all keys will be checked and the first one will be displayed.
		minimum 		: OPTIONAL - Defaults to 3. Number of characters in the input before a search is done.
		width 	 		: OPTIONAL - If included, will add an inline style to the input's container.
		placeholder     : OPTIONAL - Placeholder text for the input.
		iconClass 		: OPTIONAL - If you include this, the input will paired with an icon button. This assumes that you've included the appropriate CSS. 
		inputClasses 	: OPTIONAL - Any classes you want on the input. Bootstrap classes, for example.

	ReactDOM.render(
		<RC.Autocomplete 
			prop={value} 
		/>, document.getElementById('my-element')
	);
	*/
	constructor(props) {
		super(props);
		this.state = {
			value: 			'',
			placeholder: 	this.props.placeholder || "Type something...",
			matches: 		[],
			isDisabled: 	this.props.isDisabled === false ? false : true// undefined means true
		};
		this._handleChange   = this._handleChange.bind(this);
		this._getMatches     = this._getMatches.bind(this);
		this._getMatchMarkup = this._getMatchMarkup.bind(this);
	}

	_handleChange(evt) {
		let minimum = this.props.minimum || 3;
		let objNew = {value: evt.target.value};
		if (evt.target.value && evt.target.value.length >= minimum) {
			objNew.matches = this._getMatches(evt.target.value);
		} else {
			objNew.matches = [];
		}
		this.setState(objNew);
	}

	_getMatches(str) {
		let value 		= str; // Not case sensitive.
		let arrData 	= this.props.arrData,
			mainKey 	= this.props.mainKey,
			arrMatches 	= [];

		/*
		If there's no main key, then all keys will be checked.
		*/
		arrData.forEach((item)=>{
			if (mainKey) {
				if (item[mainKey] && item[mainKey].toLowerCase().includes(value) ) {
					arrMatches.push(item);
				}
			} else {
				/*
				There's no main key, so we check all the keys.
				*/
				if (Array.isArray(item[key])) {
					/*
					Check the array. This is for something like "tags" where there 
					would be an array of values that need to be checked. A match anywhere 
					will pass. Gonna write this bit later.
					*/
				} else {
					if ( item[key] && item[key].toLowerCase().includes(value) ) {
						arrMatches.push(item);
					}
				}
			}
		});
		return arrMatches;
	}

	_getMatchMarkup() {
		let markup = null;

		if (this.state.matches && this.state.matches.length) {			
			let matches = this.state.matches.map((match, index)=>{
				return (
					<div key={index}>{match.label}</div>
				);
			});

			if (matches.length) {
				markup = <div>{matches}</div>;
			}
		}
		return markup;
	}

	render() {
		// TEMP STUFF =============================
		let state = this.state;
		window.getState = function(){return state};
		// ========================================
		let markup = null,
			inputClasses = this.props.inputClasses || '',
			matches = this._getMatchMarkup();
		return (
			<span>
			<input type="text" className={inputClasses} value={this.state.value} onChange={this._handleChange}  onKeyDown={this._handleKeyDown} placeholder={this.state.placeholder} aria-label={this.state.placeholder} />
			{matches}
			</span>
		);
	}
}

export default Autocomplete;
